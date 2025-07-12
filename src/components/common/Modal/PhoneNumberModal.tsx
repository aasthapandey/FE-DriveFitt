"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type ModalState = "phone" | "otp";

interface PhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

interface PhoneStepProps {
  phoneNumber: string;
  isFocused: boolean;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onContinue: () => void;
}

interface OTPStepProps {
  phoneNumber: string;
  otpValues: string[];
  onOTPChange: (index: number, value: string) => void;
  onVerify: () => void;
  onChangePhone: () => void;
  timeLeft: number;
  onResendOTP: () => void;
}

// Phone Number Step Component
const PhoneStep = ({
  phoneNumber,
  isFocused,
  onPhoneChange,
  onFocus,
  onBlur,
  onContinue,
}: PhoneStepProps) => (
  <>
    {/* Logo */}
    <div className="mb-8 md:mb-[48px] md:px-[64px]">
      <Image
        src="https://da8nru77lsio9.cloudfront.net/images/logo.svg"
        alt="DRIVEFITT"
        width={212}
        height={36}
        className="w-auto h-auto"
      />
    </div>

    {/* Phone Input */}
    <div className="w-full mb-6 md:mb-[24px]">
      <input
        type="tel"
        placeholder={isFocused ? "" : "Enter your phone number"}
        value={phoneNumber}
        onChange={onPhoneChange}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={10}
        className="w-full bg-transparent border-b-2 border-[#333333] pl-4 pr-4 py-3 md:py-4 text-[#00DBDC] placeholder-[#8A8A8A] focus:outline-none transition-colors duration-200 font-light text-base md:text-2xl md:leading-7 caret-[#00DBDC] text-center"
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      />
    </div>

    {/* Continue Button */}
    <button
      onClick={onContinue}
      disabled={phoneNumber.length !== 10}
      className="w-full bg-[#00DBDC] border border-transparent rounded-lg py-3 md:py-3 text-[#0D0D0D] font-medium text-base md:text-lg mb-6 md:mb-[48px] hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00DBDC] disabled:hover:text-[#0D0D0D] disabled:hover:border-transparent"
    >
      Continue
    </button>

    {/* Terms and Privacy */}
    <div className="font-light md:text-base leading-5 tracking-[-0.02em] text-center text-[#6A6A6A] md:max-w-[291px]">
      <span className="md:mx-3">* By Continuing you agree to the </span>
      <br className="md:hidden" />
      <a
        href="/terms"
        className="text-white hover:text-[#00DBDC] transition-colors underline"
      >
        Terms & Conditions
      </a>
      <span> and </span>
      <a
        href="/privacy"
        className="text-white hover:text-[#00DBDC] transition-colors underline"
      >
        Privacy Policy
      </a>
      <span>.</span>
    </div>
  </>
);

// OTP Verification Step Component
const OTPStep = ({
  phoneNumber,
  otpValues,
  onOTPChange,
  onVerify,
  onChangePhone,
  timeLeft,
  onResendOTP,
}: OTPStepProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Auto-focus first input when component mounts
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
      setFocusedIndex(0);
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleInputBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <>
      {/* Title */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-white font-semibold text-[32px] leading-[36px] tracking-[0%] text-center">
          Enter Code
        </h2>
      </div>

      {/* Description */}
      <div className="mb-8 md:mb-10 text-center">
        <p className="text-[#8A8A8A] font-light text-[20px] leading-[28px] tracking-[0%]">
          We&apos;ve sent an SMS with an
        </p>
        <p className="text-[#8A8A8A] font-light text-[20px] leading-[28px] tracking-[0%]">
          activation code to your phone
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-white font-light text-[20px] leading-[28px] tracking-[0%] break-all">
            +91 {phoneNumber}
          </span>
          <button
            onClick={onChangePhone}
            className="text-[#00DBDC] font-light text-[20px] leading-[28px] tracking-[0%] whitespace-nowrap"
          >
            Change
          </button>
        </div>
      </div>

      {/* OTP Input Boxes */}
      <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-10">
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={index === 0 ? firstInputRef : null}
            type="text"
            value={value}
            onChange={(e) => onOTPChange(index, e.target.value)}
            onFocus={() => handleInputFocus(index)}
            onBlur={handleInputBlur}
            data-index={index}
            maxLength={1}
            className={`w-12 h-12 md:w-16 md:h-16 bg-transparent border-2 rounded-lg text-center text-white text-lg md:text-xl font-medium focus:outline-none transition-colors duration-200 ${
              value || focusedIndex === index
                ? "border-[#00DBDC]"
                : "border-[#333333]"
            }`}
            style={{
              fontFamily: "Inter, sans-serif",
            }}
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        onClick={onVerify}
        disabled={otpValues.some((val) => val === "")}
        className="w-full bg-[#00DBDC] border border-transparent rounded-lg py-3 md:py-3 text-[#0D0D0D] font-medium text-base md:text-lg mb-6 md:mb-8 hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00DBDC] disabled:hover:text-[#0D0D0D] disabled:hover:border-transparent"
      >
        Verify
      </button>

      {/* Resend OTP */}
      <div className="text-center">
        <span className="text-[#8A8A8A] font-medium text-base leading-[20px] tracking-[-0.02em]">
          Didn&apos;t receive OTP?{" "}
        </span>
        {timeLeft > 0 ? (
          <span className="text-[#00DBDC] font-medium text-base leading-[20px] tracking-[-0.02em]">
            {formatTime(timeLeft)}
          </span>
        ) : (
          <button
            onClick={onResendOTP}
            className="text-[#00DBDC] font-medium text-base leading-[20px] tracking-[-0.02em]"
          >
            Resend
          </button>
        )}
      </div>
    </>
  );
};

const PhoneNumberModal = ({ isOpen, onClose }: PhoneNumberModalProps) => {
  const [modalState, setModalState] = useState<ModalState>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(59);
  const [isMounted, setIsMounted] = useState(false);

  // Check if component is mounted (client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Disable/enable body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setModalState("phone");
      setPhoneNumber("");
      setIsFocused(false);
      setOtpValues(["", "", "", ""]);
      setTimeLeft(59);
    }
  }, [isOpen]);

  // OTP Timer
  useEffect(() => {
    if (modalState === "otp" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [modalState, timeLeft]);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 10) {
        setPhoneNumber(value);
      }
    },
    []
  );

  const handleContinue = useCallback(() => {
    if (phoneNumber.length === 10) {
      setModalState("otp");
      // Here you would typically send OTP request
      console.log("Sending OTP to:", phoneNumber);
    }
  }, [phoneNumber]);

  const handleOTPChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return; // Only allow digits

      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(
          `input[data-index="${index + 1}"]`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    },
    [otpValues]
  );

  const handleVerify = useCallback(() => {
    const otp = otpValues.join("");

    // Validate that all 4 digits are entered
    if (otp.length === 4 && otpValues.every((val) => val !== "")) {
      console.log("Verifying OTP:", otp, "for phone:", phoneNumber);
      // Handle OTP verification logic here
      // Close the modal after successful validation
      onClose();
    }
  }, [otpValues, phoneNumber, onClose]);

  const handleChangePhone = useCallback(() => {
    setModalState("phone");
    setTimeLeft(59); // Reset timer when going back to phone input
  }, []);

  const handleResendOTP = useCallback(() => {
    setTimeLeft(59);
    setOtpValues(["", "", "", ""]);
    console.log("Resending OTP to:", phoneNumber);
  }, [phoneNumber]);

  if (!isOpen || !isMounted) return null;

  const modalContent = (
    <div
      className="z-[10000] p-4"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Modal Content */}
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 md:mb-[22px]"
        >
          <Image
            src="https://da8nru77lsio9.cloudfront.net/images/otp-modal-close-icon.svg"
            alt="Close"
            width={16}
            height={16}
            className="w-[48px] h-[48px]"
          />
        </button>

        <div
          className={`rounded-[20px] md:rounded-[40px] p-[2px] w-full w-[340px] md:w-[420px]`}
          style={{
            background:
              "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
          }}
        >
          <div className="bg-[#0D0D0D] rounded-[20px] md:rounded-[40px] flex flex-col items-center px-6 py-8 md:px-[40px] md:py-[48px]">
            {modalState === "phone" ? (
              <PhoneStep
                phoneNumber={phoneNumber}
                isFocused={isFocused}
                onPhoneChange={handlePhoneChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onContinue={handleContinue}
              />
            ) : (
              <OTPStep
                phoneNumber={phoneNumber}
                otpValues={otpValues}
                onOTPChange={handleOTPChange}
                onVerify={handleVerify}
                onChangePhone={handleChangePhone}
                timeLeft={timeLeft}
                onResendOTP={handleResendOTP}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default PhoneNumberModal;
