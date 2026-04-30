"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PaymentModal from "@/components/common/PaymentModal";
import PaymentLoader from "@/components/common/PaymentLoader";
import PaymentResultModal, {
  PaymentResultType,
} from "@/components/common/PaymentResultModal";
import { navbarData } from "@/data/navbar";
import { plansData } from "@/data/plans";
import { MembershipPlanCatalogItem } from "@/config/membershipPlans";
import { useAuth } from "@/hooks/useAuth";

interface MembershipReviewPageProps {
  plan: MembershipPlanCatalogItem;
  isMobile?: boolean;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function MembershipReviewPage({
  plan,
  isMobile,
}: MembershipReviewPageProps) {
  const router = useRouter();
  const { isAuthenticated, user, loading, updateUserData, fetchProfile } =
    useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAcceptanceId, setTermsAcceptanceId] = useState<number | null>(
    null
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isRecordingAcceptance, setIsRecordingAcceptance] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [error, setError] = useState("");
  const [paymentResultType, setPaymentResultType] =
    useState<PaymentResultType>("success");
  const [paymentResultData, setPaymentResultData] = useState<{
    transactionId: string;
    planName?: string;
  } | null>(null);

  const footerData = plansData.footerSection;
  const summaryRows = useMemo(
    () => [
      { label: plan.displayName, value: formatCurrency(plan.pricing.base) },
      { label: "GST @ 5%", value: formatCurrency(plan.pricing.gst) },
    ],
    [plan]
  );

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/membership");
    }
  }, [isAuthenticated, loading, router]);

  const recordTermsAcceptance = async () => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) {
      throw new Error("Please sign in before proceeding to payment.");
    }

    const response = await fetch("/api/membership/terms-acceptance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ planId: plan.id }),
    });

    const data = await response.json();
    if (!response.ok || !data.success || !data.data?.acceptanceId) {
      throw new Error(data.message || "Failed to record terms acceptance.");
    }

    return Number(data.data.acceptanceId);
  };

  const handleProceedToPayment = async () => {
    if (!termsAccepted || isRecordingAcceptance) return;

    setError("");
    setIsRecordingAcceptance(true);

    try {
      const acceptanceId = await recordTermsAcceptance();
      setTermsAcceptanceId(acceptanceId);
      setShowPaymentModal(true);
    } catch (acceptanceError) {
      setError(
        acceptanceError instanceof Error
          ? acceptanceError.message
          : "Failed to proceed to payment."
      );
    } finally {
      setIsRecordingAcceptance(false);
    }
  };

  const handlePaymentSuccess = async (
    paymentId: string,
    membershipData?: {
      id: number;
      membershipType: number;
      status: number;
      startDate: string;
      expiresAt: string;
      invoiceNumber?: string;
      orderId: number;
      paymentId: number;
    } | null
  ) => {
    setIsPaymentProcessing(true);
    setShowPaymentModal(false);

    try {
      if (membershipData) {
        updateUserData({
          hasMembership: true,
          membershipInfo: membershipData,
        });
      } else {
        await fetchProfile();
      }

      setPaymentResultType("success");
      setPaymentResultData({
        transactionId: paymentId,
        planName: plan.displayName,
      });
    } catch (paymentSuccessError) {
      console.error("Error after payment success:", paymentSuccessError);
      setPaymentResultType("success");
      setPaymentResultData({
        transactionId: paymentId,
        planName: plan.displayName,
      });
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const handlePaymentError = (paymentError: string) => {
    setShowPaymentModal(false);
    setIsPaymentProcessing(false);
    setPaymentResultType("failure");
    setPaymentResultData({
      transactionId: paymentError.includes("cancelled")
        ? "Payment Cancelled"
        : "Payment Failed",
      planName: plan.displayName,
    });
  };

  const handlePaymentResultClose = () => {
    setPaymentResultData(null);
  };

  const handleRetryPayment = () => {
    setPaymentResultData(null);
    setTermsAcceptanceId(null);
  };

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <PaymentLoader isVisible message="Loading membership review..." />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <Navbar data={navbarData} isMobile={isMobile} />

      <section
        className="relative overflow-hidden px-6 pt-[88px] md:px-[120px] md:pt-[150px] pb-12 md:pb-16 -mt-[60px] md:-mt-[105px]"
        style={{
          backgroundImage: `url(${
            isMobile
              ? plansData.aboutUsHeroSection?.mobileImage
              : plansData.aboutUsHeroSection?.desktopImage
          })`,
          backgroundPosition: "top center",
          backgroundSize: isMobile ? "100% auto" : "cover",
          backgroundRepeat: "no-repeat",
          minHeight: isMobile ? "auto" : "641px",
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,13,0) 0%, #0D0D0D 72%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px] pt-16 md:pt-20">
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-[32px] leading-[36px] tracking-[-1px] md:text-[48px] md:leading-[56px] md:tracking-[-2px] font-semibold">
              Review Your Membership
            </h1>
            <p className="mx-auto mt-3 max-w-[420px] text-xs md:text-base leading-5 text-white">
              Please Confirm Your Plan Details Before Proceeding To Payment
            </p>
          </div>

          <div className="mb-5 text-[11px] uppercase tracking-[4px] text-[#A7A7A7]">
            Selected Plan
          </div>
          <div
            className="rounded-[20px] md:rounded-[40px] p-[2px]"
            style={{
              background:
                "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
            }}
          >
            <div
              className="rounded-[20px] md:rounded-[40px] p-6 md:p-10"
              style={{
                background:
                  "linear-gradient(180deg, #111111 36.81%, #001011 94.04%)",
              }}
            >
            <div className="mb-6 md:mb-8 border-b border-[#333333] pb-6">
              <p className="text-sm md:text-base text-[#CFCFCF]">
                {plan.displayName}
              </p>
              <p className="mt-2 text-[40px] leading-[100%] md:text-[60px] font-semibold text-[#00DBDC]">
                {formatCurrency(plan.pricing.base)}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 md:gap-x-12">
              {plan.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="mt-[3px] flex size-4 shrink-0 items-center justify-center rounded-full bg-[#00DBDC]">
                    <span className="size-1.5 rounded-full bg-[#0D0D0D]" />
                  </span>
                  <span className="text-sm md:text-base leading-5 text-white">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
            </div>
          </div>

          <div className="mt-8 mb-5 text-[11px] uppercase tracking-[4px] text-[#A7A7A7]">
            Payment Summary
          </div>
          <div
            className="rounded-[20px] md:rounded-[30px] p-[2px]"
            style={{
              background:
                "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
            }}
          >
            <div
              className="rounded-[20px] md:rounded-[30px] p-6 md:p-8"
              style={{
                background:
                  "linear-gradient(180deg, #111111 36.81%, #001011 94.04%)",
              }}
            >
            {summaryRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-[#333333] py-4 first:pt-0"
              >
                <span className="text-sm md:text-base text-white">
                  {row.label}
                </span>
                <span className="text-sm md:text-base text-white">
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-5 font-semibold">
              <span className="text-base md:text-lg">Total</span>
              <span className="text-base md:text-lg">
                {formatCurrency(plan.pricing.total)}
              </span>
            </div>
            </div>
          </div>

          <label className="mt-5 flex items-start gap-3 text-xs md:text-sm text-[#A7A7A7]">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              className="mt-1 size-4 accent-[#00DBDC]"
            />
            <span>
              I have read and agree to the{" "}
              <Link
                href="/api/download/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00DBDC] underline"
              >
                Terms & Conditions
              </Link>
            </span>
          </label>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-8 flex flex-col-reverse gap-4 md:flex-row md:justify-end">
            <button
              type="button"
              onClick={() => router.push("/membership")}
              className="h-12 rounded-lg border border-[#00DBDC] px-10 text-sm font-medium text-[#00DBDC] transition-colors md:hover:bg-[#00DBDC] md:hover:text-[#0D0D0D]"
            >
              Change Plan
            </button>
            <button
              type="button"
              onClick={handleProceedToPayment}
              disabled={!termsAccepted || isRecordingAcceptance}
              className="h-12 rounded-lg bg-[#00DBDC] px-10 text-sm font-medium text-[#0D0D0D] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRecordingAcceptance ? "Preparing Payment..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </section>

      {footerData && <Footer data={footerData} isMobile={isMobile} />}

      {termsAcceptanceId && showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          planId={plan.id}
          membershipType={plan.membershipType}
          amount={plan.pricing.total}
          termsAcceptanceId={termsAcceptanceId}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}

      {paymentResultData && (
        <PaymentResultModal
          isOpen={!!paymentResultData}
          onClose={handlePaymentResultClose}
          type={paymentResultType}
          transactionId={paymentResultData.transactionId}
          planName={paymentResultData.planName}
          onRetryPayment={handleRetryPayment}
          onGoHome={() => router.push("/")}
        />
      )}

      <PaymentLoader
        isVisible={isPaymentProcessing}
        message="Processing your payment..."
      />
    </main>
  );
}
