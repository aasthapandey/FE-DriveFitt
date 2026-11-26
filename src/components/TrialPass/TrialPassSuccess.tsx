"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentResultCard } from "@/components/common/PaymentResultModal";
import { formatTrialDate, formatTrialPrice, TRIAL_PASS_PATH, type TrialPassBooking } from "@/config/trialPass";
import { bookingRequest, storedBooking } from "@/lib/trialPassClient";

export default function TrialPassSuccess() {
  const router = useRouter();
  const [booking, setBooking] = useState<TrialPassBooking | null>(null);
  const [state, setState] = useState<"loading" | "unconfirmed" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const id = storedBooking();
    if (!id) {
      setState("unconfirmed");
      return;
    }

    let active = true;
    bookingRequest({ action: "status", id })
      .then((result) => {
        if (!active) return;
        if (result?.state === "paid" && result.paymentId) setBooking(result);
        else setState("unconfirmed");
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => { active = false; };
  }, [attempt]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#0D0D0D] px-5 py-10 text-white">
      {booking?.paymentId ? (
        <>
          <PaymentResultCard
            heading="h1"
            type="success"
            transactionId={booking.paymentId}
            successMessage="Your one-day trial pass is confirmed. Keep your booking reference to show at reception."
            details={[
              { label: "Amount paid", value: formatTrialPrice(booking.amountPaise) },
              { label: "Trial date", value: formatTrialDate(booking.trialDate) },
              { label: "Booking reference", value: booking.id },
            ]}
            onGoHome={() => router.push("/")}
          />
          <button
            type="button"
            className="text-sm text-[#00DBDC] underline"
            onClick={() => {
              storedBooking("");
              router.replace(TRIAL_PASS_PATH);
            }}
          >
            Book another visit
          </button>
        </>
      ) : (
        <section className="w-full max-w-md rounded-3xl border border-white/15 p-6 text-center">
          <h1 className="text-2xl font-semibold">Trial pass payment</h1>
          <p role="status" className="mt-3 text-sm text-white/75">
            {state === "loading"
              ? "Checking your payment…"
              : state === "error"
                ? "We couldn’t load your payment details. Please try again."
                : "A confirmed payment couldn’t be found for this session."}
          </p>
          {state !== "loading" && (
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm text-[#00DBDC] underline">
              {state === "error" && (
                <button type="button" onClick={() => { setState("loading"); setAttempt((value) => value + 1); }}>
                  Check again
                </button>
              )}
              <Link href={TRIAL_PASS_PATH}>Back to trial pass</Link>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
