"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavbarProps, LoginModalType } from "@/types/staticPages";
import { PhoneNumberModal, EmailModal } from "./Modal";

interface Props {
  data: NavbarProps;
  isMobile?: boolean;
}

export default function Navbar({ data, isMobile }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { logo, navLinks, signInButton, loginModalType } = data;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href;
  };

  if (isMobile) {
    return (
      <nav
        className={`sticky top-0 z-50 flex justify-between items-center py-5 px-6 md:py-6 md:px-4 w-full transition-all duration-300 ${
          isScrolled ? "bg-[#0D0D0D]/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <button
          className="relative z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            src="https://da8nru77lsio9.cloudfront.net/images/hamburger.svg"
            alt="menu"
            width={24}
            height={24}
          />
        </button>
        <Link href="/">
          <Image src={logo} alt="logo" width={141} height={24} />
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-[#00DBDC] border border-transparent rounded-lg px-3 md:px-6 py-2 text-[#0D0D0D] font-medium text-xs md:text-sm hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC] transition-all duration-200"
          >
            {signInButton.text}
          </button>
        </div>

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

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#1A1A1A] z-[9999]">
            <div className="flex flex-col items-center justify-center pt-24">
              {navLinks.map((link, idx) => (
                <div className="p-4 text-center w-full" key={idx}>
                  <Link
                    href={link.href}
                    className={`text-lg transition-colors ${
                      isActiveLink(link.href)
                        ? "text-[#00DBDC]"
                        : "text-white hover:text-[#00DBDC]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between items-center py-8 pr-[100px] pl-[120px] gap-4 transition-all duration-300 ${
        isScrolled ? "bg-[#0D0D0D]/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Link href="/">
        <Image src={logo} alt="logo" width={212} height={36} />
      </Link>
      <div className="flex gap-10 px-2">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`transition-colors ${
              isActiveLink(link.href)
                ? "text-[#00DBDC]"
                : "text-white hover:text-[#00DBDC]"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="bg-[#00DBDC] border border-transparent rounded-lg px-10 md:px-[48px] md:h-[50px] text-[#0D0D0D] font-medium text-base hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC] transition-all duration-200"
      >
        {signInButton.text}
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
    </nav>
  );
}
