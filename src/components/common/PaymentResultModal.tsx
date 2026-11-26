"use client";
import Image from "next/image";

export type PaymentResultType = "success" | "failure";

interface PaymentResultCardProps {
  type: PaymentResultType;
  transactionId: string;
  heading?: "h1" | "h2";
  successMessage?: string;
  details?: Array<{ label: string; value: string }>;
  planName?: string;
  discountAmount?: number;
  onRetryPayment?: () => void;
  onGoHome?: () => void;
}

interface PaymentResultModalProps extends PaymentResultCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentResultModal({
  isOpen,
  onClose,
  ...cardProps
}: PaymentResultModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = onClose; // Suppress unused variable warning
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(4px)",
      }}
    >
      <PaymentResultCard {...cardProps} />
    </div>
  );
}

export function PaymentResultCard({
  type,
  transactionId,
  heading: Heading = "h2",
  successMessage = "Welcome to Drive FITT - Your membership is now active. Voucher Receipt will be sent on your email.",
  details,
  planName,
  discountAmount,
  onRetryPayment,
  onGoHome,
}: PaymentResultCardProps) {
  const isSuccess = type === "success";

  return (
    <div
      className="bg-black rounded-[40px] p-6 md:p-10 flex flex-col items-center gap-6 md:gap-10 relative w-full max-w-[541px] mx-4"
      style={{
        border: "4px solid transparent",
        background:
          "linear-gradient(black, black) padding-box, linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%) border-box",
      }}
    >
      {/* Icon */}
      <div className="flex justify-center">
        <Image
          src={
            isSuccess
              ? "/images/payment-success.svg"
              : "/images/payment-failure.svg"
          }
          alt={isSuccess ? "Payment Success" : "Payment Failed"}
          width={84}
          height={84}
          className="opacity-100 w-16 h-16 md:w-[84px] md:h-[84px]"
        />
      </div>

      {/* Heading */}
      <Heading className="text-white text-center font-inter font-semibold text-2xl md:text-[32px] leading-7 md:leading-[36px]">
        {isSuccess ? "Payment Successful!" : "Payment Failed"}
      </Heading>

      {/* Sub-heading */}
      <p className="text-white text-center font-inter font-light text-sm md:text-base leading-5 md:leading-6">
        {isSuccess
          ? successMessage
          : "Unfortunately, your payment could not be processed."}
      </p>

      {/* Payment Details Container */}
      <div className="w-full border border-[#333333] rounded-lg p-3 md:p-4 flex flex-col gap-2 md:gap-2.5">
        {details?.map(({ label, value }) => (
          <div key={label} className="break-words text-white text-xs md:text-sm">
            <span>•</span> {label}: {value}
          </div>
        ))}
        <div className="text-white text-xs md:text-sm">
          <span className="text-white">•</span>{" "}
          {transactionId.includes("Payment")
            ? transactionId
            : `Transaction ID: ${transactionId}`}
        </div>
        {isSuccess && planName && discountAmount && (
          <div className="text-white text-xs md:text-sm">
            <span className="text-white">•</span> Plan: {planName} (₹
            {discountAmount.toLocaleString()} – Locked at ₹999)
          </div>
        )}
      </div>

      {/* Info Container - Only for failure */}
      {!isSuccess && (
        <div className="w-full flex gap-3 md:gap-5 items-start">
          <Image
            src="/images/information-circle-contained.svg"
            alt="Information"
            width={20}
            height={20}
            className="opacity-100 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5"
          />
          <p className="text-white font-inter font-light text-xs md:text-sm leading-4 md:leading-5">
            If any amount was deducted, it will be refunded to your account
            within 24–72 hours.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="w-full flex flex-col gap-4 md:gap-5">
        {/* Primary Button */}
        <button
          onClick={isSuccess ? onGoHome : onRetryPayment}
          className="w-full bg-[#00DBDC] text-black font-inter font-medium text-sm md:text-base leading-5 rounded-lg py-3 px-8 md:px-12 shadow-[0px_9px_12px_0px_rgba(0,219,220,0.1)] hover:bg-[#00C4C5] transition-colors max-w-[416px] mx-auto"
        >
          {isSuccess ? "Go to home" : "Retry payment"}
        </button>

        {/* Secondary Button - Only for failure */}
        {!isSuccess && (
          <button
            onClick={onGoHome}
            className="text-[#00DBDC] font-inter font-medium text-sm md:text-base leading-5 hover:text-[#00C4C5] transition-colors"
          >
            Go back to home
          </button>
        )}
      </div>
    </div>
  );
}
