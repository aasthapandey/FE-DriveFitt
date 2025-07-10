"use client";
import { useState } from "react";
import Image from "next/image";

interface PhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const PhoneNumberModal = ({
  isOpen,
  onClose,
  isMobile,
}: PhoneNumberModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

  const handleContinue = () => {
    // Handle continue logic here
    console.log("Phone number:", phoneNumber);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="relative items-center justify-center flex flex-col">
        {/* Close button - positioned relative to the gradient border */}
        <button
          onClick={onClose}
          className=" z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all duration-200 md:mb-[22px]"
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
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#333333] pl-4 pr-4 py-3 md:py-4 text-[#00DBDC] placeholder-[#8A8A8A] focus:outline-none transition-colors duration-200 font-light text-base md:text-2xl md:leading-7 caret-[#00DBDC]"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              />
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-[#00DBDC] rounded-lg py-3 md:py-3 text-[#0D0D0D] font-medium text-base md:text-lg mb-6 md:mb-[48px] hover:bg-[#00c5c6] transition-colors duration-200"
            >
              Continue
            </button>

            {/* Terms and Privacy */}
            <div className="font-light md:text-base leading-5 tracking-[-0.02em] text-center text-[#6A6A6A] md:max-w-[291px]">
              <span className="md:mx-3">
                {" "}
                * By Continuing you agree to the{" "}
              </span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberModal;
