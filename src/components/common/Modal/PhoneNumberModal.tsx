"use client";
import { useState, useEffect, useCallback } from "react";
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
  isMobile?: boolean;
}

interface OTPStepProps {
  phoneNumber: string;
  otpValues: string[];
  onOTPChange: (index: number, value: string) => void;
  onVerify: () => void;
  onChangePhone: () => void;
  timeLeft: number;
  onResendOTP: () => void;
  isMobile?: boolean;
}

// Phone Number Step Component
const PhoneStep = ({
  phoneNumber,
  isFocused,
  onPhoneChange,
  onFocus,
  onBlur,
  onContinue,
  isMobile,
}: PhoneStepProps) => (
  <>
    {/* Logo */}
    <div className="mb-8 md:mb-[48px] md:px-[64px]">
      <Image
        src="https://da8nru77lsio9.cloudfront.net/images/logo.svg"
        alt="DRIVEFITT"
        width={isMobile ? 180 : 212}
        height={isMobile ? 30 : 36}
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
      className="w-full bg-[#00DBDC] rounded-lg py-3 md:py-3 text-[#0D0D0D] font-medium text-base md:text-lg mb-6 md:mb-[48px] hover:bg-[#00c5c6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
  isMobile,
}: OTPStepProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
          We've sent an SMS with an
        </p>
        <p className="text-[#8A8A8A] font-light text-[20px] leading-[28px] tracking-[0%]">
          activation code to your phone
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-white font-light text-[20px] leading-[28px] tracking-[0%]">
            +91 {phoneNumber}
          </span>
          <button
            onClick={onChangePhone}
            className="text-[#00DBDC] font-light text-[20px] leading-[28px] tracking-[0%]"
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
            type="text"
            value={value}
            onChange={(e) => onOTPChange(index, e.target.value)}
            data-index={index}
            maxLength={1}
            className={`w-12 h-12 md:w-16 md:h-16 bg-transparent border-2 rounded-lg text-center text-white text-lg md:text-xl font-medium focus:outline-none transition-colors duration-200 ${
              index === 0
                ? "border-[#00DBDC] bg-[#00DBDC]/10"
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
        className="w-full bg-[#00DBDC] rounded-lg py-3 md:py-3 text-[#0D0D0D] font-medium text-base md:text-lg mb-6 md:mb-8 hover:bg-[#00c5c6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Verify
      </button>

      {/* Resend OTP */}
      <div className="text-center">
        <span className="text-[#8A8A8A] font-medium text-base leading-[20px] tracking-[-0.02em]">
          Didn't receive OTP?{" "}
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

const PhoneNumberModal = ({
  isOpen,
  onClose,
  isMobile,
}: PhoneNumberModalProps) => {
  const [modalState, setModalState] = useState<ModalState>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(59);

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
    console.log("Verifying OTP:", otp, "for phone:", phoneNumber);
    // Handle OTP verification logic here
  }, [otpValues, phoneNumber]);

  const handleChangePhone = useCallback(() => {
    setModalState("phone");
  }, []);

  const handleResendOTP = useCallback(() => {
    setTimeLeft(59);
    setOtpValues(["", "", "", ""]);
    console.log("Resending OTP to:", phoneNumber);
  }, [phoneNumber]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="relative items-center justify-center flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 md:mb-[22px]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className={`rounded-[20px] md:rounded-[40px] p-[2px] w-full max-w-[340px] md:max-w-[420px]`}
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
                isMobile={isMobile}
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
                isMobile={isMobile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberModal;
