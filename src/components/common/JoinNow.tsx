"use client";
import { useState } from "react";
import { LoginModalType } from "@/types/staticPages";
import { PhoneNumberModal, EmailModal } from "./Modal";

interface JoinNowProps {
  isMobile?: boolean;
  loginModalType?: LoginModalType;
}

export default function JoinNow({
  isMobile,
  loginModalType = LoginModalType.PHONE,
}: JoinNowProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <section className="md:px-[120px] px-6 flex justify-center md:-my-[120px]">
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className={`bg-[#00DBDC] border border-transparent rounded-lg px-10 py-3 text-[#0D0D0D] font-medium text-base ${
          isMobile
            ? ""
            : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
        } transition-all duration-200 md:px-[48px] md:h-[50px]`}
      >
        Join Now
      </button>

      {/* Login Modals */}
      {loginModalType === LoginModalType.PHONE ? (
        <PhoneNumberModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          isMobile={isMobile}
        />
      ) : (
        <EmailModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          isMobile={isMobile}
        />
      )}
    </section>
  );
}
