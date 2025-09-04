"use client";
import Image from "next/image";

export type PaymentResultType = "success" | "failure";

interface PaymentResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PaymentResultType;
  transactionId: string;
  planName?: string;
  discountAmount?: number;
  onRetryPayment?: () => void;
  onGoHome?: () => void;
}

export default function PaymentResultModal({
  isOpen,
  onClose,
  type,
  transactionId,
  planName,
  discountAmount,
  onRetryPayment,
  onGoHome,
}: PaymentResultModalProps) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  const handlePrimaryAction = () => {
    if (isSuccess) {
      onGoHome?.();
    } else {
      onRetryPayment?.();
    }
  };

  const handleSecondaryAction = () => {
    onGoHome?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-black rounded-[40px] p-10 flex flex-col items-center gap-10 relative"
        style={{
          width: "541px",
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
            className="opacity-100"
          />
        </div>

        {/* Heading */}
        <h2 className="text-white text-center font-inter font-semibold text-[32px] leading-[36px]">
          {isSuccess ? "Payment Successful!" : "Payment Failed"}
        </h2>

        {/* Sub-heading */}
        <p className="text-white text-center font-inter font-light text-base leading-6">
          {isSuccess
            ? "Welcome to DriveFitt – Your membership is now active."
            : "Unfortunately, your payment could not be processed."}
        </p>

        {/* Payment Details Container */}
        <div className="w-full border border-[#333333] rounded-lg p-4 flex flex-col gap-2.5">
          <div className="text-white text-sm">
            <span className="text-white">•</span> Transaction ID:{" "}
            {transactionId}
          </div>
          {isSuccess && planName && discountAmount && (
            <div className="text-white text-sm">
              <span className="text-white">•</span> Plan: {planName} (₹
              {discountAmount.toLocaleString()} – Locked at ₹999)
            </div>
          )}
        </div>

        {/* Info Container - Only for failure */}
        {!isSuccess && (
          <div className="w-full flex gap-5 items-start">
            <Image
              src="/images/information-circle-contained.svg"
              alt="Information"
              width={20}
              height={20}
              className="opacity-100 flex-shrink-0 mt-0.5"
            />
            <p className="text-white font-inter font-light text-sm leading-5">
              If any amount was deducted, it will be refunded to your account
              within 24–72 hours.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="w-full flex flex-col gap-5">
          {/* Primary Button */}
          <button
            onClick={handlePrimaryAction}
            className="w-full bg-[#00DBDC] text-black font-inter font-medium text-base leading-5 rounded-lg py-3 px-12 shadow-[0px_9px_12px_0px_rgba(0,219,220,0.1)] hover:bg-[#00C4C5] transition-colors"
            style={{ width: "416px", margin: "0 auto" }}
          >
            {isSuccess ? "Go to home" : "Retry payment"}
          </button>

          {/* Secondary Button - Only for failure */}
          {!isSuccess && (
            <button
              onClick={handleSecondaryAction}
              className="text-[#00DBDC] font-inter font-medium text-base leading-5 hover:text-[#00C4C5] transition-colors"
            >
              Go back to home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
