"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { EnquiryGender, EnquirySource, EnquiryType } from "@/types/enquiry";

type Step = "phone" | "otp" | "details" | "success";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

const inputClass =
  "w-full rounded-lg border border-[#333333] bg-white px-4 py-2.5 text-sm text-[#0D0D0D] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#00DBDC]";

const FieldError = ({ children }: { children?: string }) =>
  children ? <p className="mt-1 text-xs text-red-400">{children}</p> : null;

export default function EnquiryForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [consentToken, setConsentToken] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [sources, setSources] = useState<EnquirySource[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<EnquiryGender | "">("");
  const [enquiryType, setEnquiryType] = useState<EnquiryType | "">("");
  const [sourceId, setSourceId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [idempotencyKey, setIdempotencyKey] = useState("");

  useEffect(() => {
    fetch("/api/enquiries/sources", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: ApiResponse<EnquirySource[]>) => {
        if (result.success && result.data) setSources(result.data);
      })
      .catch(() => setError("Unable to load the form. Please refresh the page."));
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  const sendOtp = async () => {
    setError("");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!consentAccepted) {
      setError("Accept the Terms & Conditions to continue.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/enquiries/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, consentAccepted }),
      });
      const result = (await response.json()) as ApiResponse<{ consentToken: string }>;
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Unable to send OTP.");
      }
      setConsentToken(result.data.consentToken);
      setOtp("");
      setSecondsLeft(60);
      setStep("otp");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!/^\d{4}$/.test(otp)) {
      setError("Enter the 4-digit OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/enquiries/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consentToken, phone, otp }),
      });
      const result = (await response.json()) as ApiResponse<{
        verificationToken: string;
        profile: {
          name: string;
          email: string;
          gender?: EnquiryGender;
        } | null;
      }>;
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Unable to verify OTP.");
      }
      setVerificationToken(result.data.verificationToken);
      if (result.data.profile) {
        setName(result.data.profile.name || "");
        setEmail(result.data.profile.email || "");
        setGender(result.data.profile.gender || "");
      }
      setIdempotencyKey(crypto.randomUUID());
      setStep("details");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to verify OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
    if (!gender) return setError("Select your gender.");
    if (!enquiryType) return setError("Select an enquiry type.");
    if (!sourceId) return setError("Select how you heard about Drive FITT.");

    setIsLoading(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          gender,
          enquiryType,
          sourceId: Number(sourceId),
          verificationToken,
          idempotencyKey,
        }),
      });
      const result = (await response.json()) as ApiResponse<{
        enquiryId: string;
        submittedAt: string;
      }>;
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Unable to submit your enquiry.");
      }
      setStep("success");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to submit your enquiry.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClass =
    "w-full rounded-lg border border-transparent bg-[#00DBDC] py-2.5 text-sm font-medium text-black transition-all hover:border-[#00DBDC] hover:bg-transparent hover:text-[#00DBDC] disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <main className="min-h-screen bg-[#0D0D0D] px-6 py-8 text-white md:px-[120px] md:py-10">
      <div className="mx-auto max-w-[1120px]">
        <header className="mb-8 flex items-center justify-center md:mb-12 md:justify-start">
          <Link href="/" aria-label="Drive FITT home">
            <Image src="/images/logo.svg" alt="Drive FITT" width={338} height={36} className="h-auto w-[220px] md:w-[270px]" priority />
          </Link>
        </header>

        <div className="mx-auto max-w-[760px] rounded-[20px] bg-gradient-to-b from-[#333333] to-[#00DBDC] p-[2px] md:rounded-[40px]">
          <section className="rounded-[20px] bg-[#0D0D0D] p-5 md:rounded-[40px] md:p-12">
            {step !== "success" && (
              <div className="mb-7 md:mb-10">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#00DBDC]">
                  {step === "details" ? "Step 2 of 2" : "Step 1 of 2"}
                </p>
                <h1 className="text-2xl font-semibold leading-7 tracking-[-1px] md:text-[40px] md:leading-[48px] md:tracking-[-2px]">
                  {step === "phone" && "Enquire with Drive FITT"}
                  {step === "otp" && "Verify your mobile"}
                  {step === "details" && "Tell us about yourself"}
                </h1>
                <p className="mt-2 text-xs leading-4 text-[#8A8A8A] md:text-base md:leading-5">
                  {step === "phone" && "Enter your mobile number to get started."}
                  {step === "otp" && `We sent a 4-digit code on WhatsApp to +91 ${phone}.`}
                  {step === "details" && "Complete the form and our team will contact you shortly."}
                </p>
              </div>
            )}

            {step === "phone" && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="enquiry-phone" className="mb-1.5 block text-sm text-[#8A8A8A]">Contact number</label>
                  <div className="flex overflow-hidden rounded-lg border border-[#333333] bg-white focus-within:border-[#00DBDC]">
                    <span className="border-r border-[#D5D5D5] px-4 py-2.5 text-sm font-medium text-[#0D0D0D]">+91</span>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      className="min-w-0 flex-1 bg-white px-4 py-2.5 text-sm text-[#0D0D0D] outline-none placeholder:text-[#8A8A8A]"
                    />
                  </div>
                </div>
                <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#8A8A8A] md:text-sm">
                  <input
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(event) => setConsentAccepted(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#00DBDC]"
                  />
                  <span>
                    By continuing, you agree to the <Link href="/terms" target="_blank" className="text-white underline hover:text-[#00DBDC]">Terms &amp; Conditions</Link> and <Link href="/privacy" target="_blank" className="text-white underline hover:text-[#00DBDC]">Privacy Policy</Link>.
                  </span>
                </label>
                <FieldError>{error}</FieldError>
                <button type="button" onClick={sendOtp} disabled={isLoading} className={buttonClass}>
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            )}

            {step === "otp" && (
              <form onSubmit={verifyOtp} className="space-y-5">
                <div>
                  <label htmlFor="enquiry-otp" className="mb-1.5 block text-sm text-[#8A8A8A]">OTP</label>
                  <input
                    id="enquiry-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="Enter 4-digit OTP"
                    className={`${inputClass} text-center text-lg tracking-[0.5em]`}
                    autoFocus
                  />
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <button type="button" onClick={() => { setStep("phone"); setError(""); }} className="text-[#8A8A8A] hover:text-white">Change number</button>
                  {secondsLeft > 0 ? (
                    <span className="text-[#8A8A8A]">Resend in {secondsLeft}s</span>
                  ) : (
                    <button type="button" onClick={sendOtp} disabled={isLoading} className="text-[#00DBDC]">Resend OTP</button>
                  )}
                </div>
                <FieldError>{error}</FieldError>
                <button type="submit" disabled={isLoading} className={buttonClass}>
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}

            {step === "details" && (
              <form onSubmit={submitForm} className="space-y-5">
                <div className="rounded-lg border border-[#00DBDC]/40 bg-[#00DBDC]/10 px-4 py-3 text-sm text-[#00DBDC]">
                  +91 {phone} verified
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="enquiry-name" className="mb-1.5 block text-sm text-[#8A8A8A]">Name</label>
                    <input id="enquiry-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Enter your full name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="enquiry-email" className="mb-1.5 block text-sm text-[#8A8A8A]">Email</label>
                    <input id="enquiry-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="Enter your email address" className={inputClass} />
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm text-[#8A8A8A]">Gender</legend>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {([['male', 'Male'], ['female', 'Female'], ['prefer_not_to_say', 'Prefer not to say']] as const).map(([value, label]) => (
                      <label key={value} className={`cursor-pointer rounded-lg border px-4 py-2.5 text-center text-sm transition-colors ${gender === value ? 'border-[#00DBDC] bg-[#00DBDC]/10 text-[#00DBDC]' : 'border-[#333333] bg-[#1D1D1D] text-[#8A8A8A]'}`}>
                        <input type="radio" name="gender" value={value} checked={gender === value} onChange={() => setGender(value)} className="sr-only" />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-2 text-sm text-[#8A8A8A]">Enquiry type</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {([['walk_in', 'Walk-in'], ['appointment', 'Appointment']] as const).map(([value, label]) => (
                      <label key={value} className={`cursor-pointer rounded-lg border px-4 py-2.5 text-center text-sm transition-colors ${enquiryType === value ? 'border-[#00DBDC] bg-[#00DBDC]/10 text-[#00DBDC]' : 'border-[#333333] bg-[#1D1D1D] text-[#8A8A8A]'}`}>
                        <input type="radio" name="enquiryType" value={value} checked={enquiryType === value} onChange={() => setEnquiryType(value)} className="sr-only" />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="enquiry-source" className="mb-1.5 block text-sm text-[#8A8A8A]">How did you come to know about Drive FITT?</label>
                  <select id="enquiry-source" value={sourceId} onChange={(event) => setSourceId(event.target.value)} className={inputClass}>
                    <option value="">Select a source</option>
                    {sources.map((source) => <option key={source.id} value={source.id}>{source.label}</option>)}
                  </select>
                </div>

                <FieldError>{error}</FieldError>
                <button type="submit" disabled={isLoading || sources.length === 0} className={buttonClass}>
                  {isLoading ? "Submitting..." : "Submit enquiry"}
                </button>
              </form>
            )}

            {step === "success" && (
              <div className="py-6 text-center md:py-10">
                <Image src="/images/success-tick.svg" alt="" width={56} height={56} className="mx-auto mb-5" />
                <h1 className="text-2xl font-semibold md:text-[40px] md:leading-[48px]">Enquiry submitted</h1>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#8A8A8A] md:text-base">Thank you for your interest in Drive FITT. We&apos;re excited to be part of your fitness journey and look forward to helping you get started.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
