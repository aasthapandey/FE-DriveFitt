"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatTrialDate, formatTrialPrice, TRIAL_PASS_SUCCESS_PATH, type TrialPassBooking } from "@/config/trialPass";
import { RazorpayHostedCheckout } from "@/lib/razorpayHostedCheckout";
import { BookingRequestError, bookingRequest, storedBooking } from "@/lib/trialPassClient";

const labelClass = "flex min-w-0 flex-col gap-1.5 text-xs text-[#8A8A8A] md:text-sm";
const fieldClass =
  "min-h-10 w-full min-w-0 rounded-lg border border-[#333333] bg-white px-4 py-1.5 text-base text-[#0D0D0D] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#00DBDC] focus:ring-1 focus:ring-[#00DBDC] md:py-2";
const buttonClass =
  "w-full rounded-lg border border-transparent bg-[#00DBDC] px-5 py-[10px] text-sm font-medium text-black transition-all duration-200 enabled:hover:border-[#00DBDC] enabled:hover:bg-transparent enabled:hover:text-[#00DBDC] disabled:cursor-not-allowed disabled:opacity-50";

function RequiredLabel({ text }: { text: string }) {
  return (
    <span>
      {text}
      <span aria-hidden="true" className="ml-1 font-semibold text-[#D1D5DB]/70">*</span>
    </span>
  );
}

function TrialDateField({
  label,
  name,
  min,
  max,
  autoComplete,
}: {
  label: string;
  name: string;
  min?: string;
  max: string;
  autoComplete?: string;
}) {
  const [value, setValue] = useState("");

  return (
    <label className={labelClass}>
      <RequiredLabel text={label} />
      <span className={`${fieldClass} relative flex items-center justify-between gap-2 focus-within:border-[#00DBDC] focus-within:ring-1 focus-within:ring-[#00DBDC]`}>
        <span aria-hidden="true" className={value ? "" : "text-[#8A8A8A]"}>
          {value ? formatTrialDate(value) : "DD/MM/YYYY"}
        </span>
        <Image src="/images/calendar-event.svg" alt="" width={18} height={18} />
        <input
          type="date"
          name={name}
          min={min}
          max={max}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onClick={(event) => {
            try {
              event.currentTarget.showPicker?.();
            } catch {
              // The native input still handles the click where showPicker is unavailable.
            }
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 [&::-webkit-calendar-picker-indicator]:!block [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full"
        />
      </span>
    </label>
  );
}

export default function TrialPassForm({
  latestBirthDate,
  firstDate,
  lastDate,
  offer,
}: {
  latestBirthDate: string;
  firstDate: string;
  lastDate: string;
  offer: { name: string; amountPaise: number } | null;
}) {
  const router = useRouter();
  const [booking, setBooking] = useState<TrialPassBooking | null>(null);
  const [restoreId, setRestoreId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const requestInFlight = useRef(false);
  const bookingId = useRef("");

  useEffect(() => {
    const id = storedBooking();
    if (!id) return;
    let active = true;
    requestInFlight.current = true;
    setBusy(true);
    setRestoreId(id);
    bookingRequest({ action: "status", id })
      .then((result) => {
        if (!active) return;
        setBooking(result);
        setRestoreId("");
        if (!result) storedBooking("");
      })
      .catch(() => {
        if (active) setMessage("We couldn’t check your previous booking. Try checking again.");
      })
      .finally(() => {
        if (active) {
          requestInFlight.current = false;
          setBusy(false);
        }
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (booking?.state === "paid" && storedBooking(booking.id) === booking.id) {
      router.replace(TRIAL_PASS_SUCCESS_PATH);
    }
  }, [booking, router]);

  async function openCheckout(
    current: TrialPassBooking,
    prefill = { name: "", email: "", contact: "" },
  ) {
    if (!current.checkout) return;
    const Razorpay = await RazorpayHostedCheckout.loadScript();
    const { key, amount, orderId } = current.checkout;
    let returnedPayment = false;
    const checkout = new Razorpay({
      key,
      amount,
      currency: "INR",
      name: "Drive FITT",
      description: offer?.name || "Drive FITT trial pass",
      order_id: orderId,
      prefill,
      theme: { color: "#00DBDC" },
      handler: async (details) => {
        returnedPayment = true;
        setBooking({ ...current, state: "processing", checkout: undefined });
        try {
          const result = await bookingRequest({
            action: "verify",
            id: current.id,
            paymentId: details.razorpay_payment_id,
            signature: details.razorpay_signature,
          });
          if (result?.state === "paid") setBooking(result);
        } catch {
          setMessage("Payment confirmation is taking longer than expected. Check payment status below.");
        } finally {
          requestInFlight.current = false;
          setBusy(false);
        }
      },
      modal: {
        ondismiss: () => {
          if (returnedPayment) return;
          requestInFlight.current = false;
          setBusy(false);
          setMessage("Checkout closed. You can resume with the same booking.");
        },
      },
    });
    checkout.open();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestInFlight.current || !offer) return;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    requestInFlight.current = true;
    setBusy(true);
    setMessage("");
    try {
      bookingId.current ||= crypto.randomUUID();
      const result = await bookingRequest({
        action: "create",
        id: bookingId.current,
        quotedAmountPaise: offer.amountPaise,
        ...fields,
      });
      if (!result) throw new Error("Booking could not be saved. Please try again.");
      setBooking(result);
      storedBooking(result.id);
      if (result.checkout && result.amountPaise === offer.amountPaise) {
        await openCheckout(result, {
          name: `${fields.firstName} ${fields.lastName}`,
          email: String(fields.email),
          contact: `+91${fields.phone}`,
        });
        return;
      }
    } catch (error) {
      if (error instanceof BookingRequestError && error.status === 409) {
        bookingId.current = "";
        router.refresh();
      }
      setMessage(error instanceof BookingRequestError ? error.message : "Could not open checkout. Please try again.");
    }
    requestInFlight.current = false;
    setBusy(false);
  }

  async function checkStatus(resume = false) {
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setBusy(true);
    setMessage("");
    try {
      const result = await bookingRequest({ action: "status", id: booking?.id || restoreId });
      setRestoreId("");
      setBooking(result);
      if (!result) storedBooking("");
      if (resume && result?.checkout) {
        await openCheckout(result);
        return;
      }
    } catch (error) {
      setMessage(
        error instanceof BookingRequestError
          ? error.message
          : resume ? "Could not open checkout. Please try again." : "Could not check payment status.",
      );
    }
    requestInFlight.current = false;
    setBusy(false);
  }

  function startNewBooking() {
    storedBooking("");
    bookingId.current = "";
    setBooking(null);
    setMessage("");
  }

  return (
    <section
      className="rounded-[20px] border-2 border-transparent p-5 md:rounded-[40px] md:p-12"
      style={{
        background:
          "linear-gradient(#0D0D0D, #0D0D0D) padding-box, linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%) border-box",
      }}
    >
      <h1 className="mb-2 text-2xl font-semibold leading-7 tracking-[-1px] md:text-[40px] md:leading-[48px] md:tracking-[-2px]">
        {booking?.state === "paid" ? "Your trial pass is confirmed" : "Book your one-day trial pass"}
      </h1>
      {message && (
        <p role="status" className="mt-4 rounded-lg border border-white/15 px-4 py-3 text-sm text-white/85">
          {message}
        </p>
      )}

      {booking ? (
        <div className="mt-5 space-y-5">
          <dl className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <div>
              <dt className="text-sm text-white/65">Trial date</dt>
              <dd className="mt-1 font-medium">{formatTrialDate(booking.trialDate)}</dd>
            </div>
            {booking.state === "paid" && (
              <div>
                <dt className="text-sm text-white/65">Booking reference</dt>
                <dd className="mt-1 break-all font-mono text-sm">{booking.id}</dd>
              </div>
            )}
          </dl>
          {booking.state === "paid" ? (
            <p className="text-base text-white/80">{formatTrialPrice(booking.amountPaise)} paid. Keep this reference to show at reception.</p>
          ) : booking.checkout ? (
            <button type="button" className={buttonClass} disabled={busy} onClick={() => void checkStatus(true)}>
              {busy ? "Opening checkout…" : `Continue to payment · ${formatTrialPrice(booking.amountPaise)}`}
            </button>
          ) : (
            <>
              <p role="status" className="text-base text-white/80">
                {booking.state === "processing"
                  ? "We’re confirming your Razorpay payment."
                  : "Checkout is unavailable for this booking."}
              </p>
              <button type="button" className={buttonClass} disabled={busy} onClick={() => void checkStatus()}>
                {busy ? "Checking…" : "Check payment status"}
              </button>
            </>
          )}
          {!busy && (booking.state === "paid" || (booking.state === "unpaid" && !booking.checkout)) && (
            <button type="button" onClick={startNewBooking} className="block text-sm text-[#00DBDC] underline">
              Book another visit
            </button>
          )}
          <Link href="/contact-us" className="inline-block text-sm text-[#00DBDC] underline">Contact the club</Link>
        </div>
      ) : restoreId ? (
        <button type="button" className={`mt-5 ${buttonClass}`} disabled={busy} onClick={() => void checkStatus()}>
          {busy ? "Checking your booking…" : "Check booking status"}
        </button>
      ) : (
        <>
          <form onSubmit={submit} onChange={() => { bookingId.current = ""; }} className="mt-5 flex flex-col gap-4 md:mt-7 md:gap-6">
            <fieldset disabled={busy} className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-6">
              <label className={labelClass}>
                <RequiredLabel text="First name" />
                <input name="firstName" autoComplete="given-name" placeholder="Enter your first name" maxLength={80} required className={fieldClass} />
              </label>
              <label className={labelClass}>
                <RequiredLabel text="Last name" />
                <input name="lastName" autoComplete="family-name" placeholder="Enter your last name" maxLength={80} required className={fieldClass} />
              </label>
              <label className={labelClass}>
                <RequiredLabel text="Phone number" />
                <span className="flex min-h-10 min-w-0 items-center overflow-hidden rounded-lg border border-[#333333] bg-white text-base text-[#0D0D0D] transition-colors focus-within:border-[#00DBDC] focus-within:ring-1 focus-within:ring-[#00DBDC]">
                  <span className="shrink-0 px-4 font-medium">+91</span>
                  <input type="tel" name="phone" inputMode="numeric" autoComplete="tel-national" placeholder="Enter phone number" pattern="[6-9][0-9]{9}" maxLength={10} required className="min-w-0 flex-1 bg-transparent py-1.5 pr-4 outline-none placeholder:text-[#8A8A8A] md:py-2" />
                </span>
              </label>
              <label className={labelClass}>
                <RequiredLabel text="Email address" />
                <input type="email" name="email" autoComplete="email" placeholder="Enter your email" maxLength={254} required className={fieldClass} />
              </label>
              <TrialDateField label="Date of birth" name="dateOfBirth" max={latestBirthDate} autoComplete="bday" />
              <TrialDateField label="Preferred trial date" name="trialDate" min={firstDate} max={lastDate} />
            </fieldset>
            <p className="text-sm text-white/65">
              * By continuing you agree to the{" "}
              <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-white underline">Terms &amp; Conditions</Link>
              {" "}and{" "}
              <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline">Privacy Policy</Link>.
            </p>
            {!offer && (
              <p role="status" className="text-sm text-white/80">
                The trial pass is temporarily unavailable. <button type="button" onClick={() => router.refresh()} className="text-[#00DBDC] underline">Check again</button>
              </p>
            )}
            <button type="submit" disabled={busy || !offer} className={buttonClass}>
              {busy ? "Preparing checkout…" : "Confirm & Pay"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
