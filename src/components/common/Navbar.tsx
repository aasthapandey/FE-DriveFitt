"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  isMobile?: boolean;
}

const navLinks = [
  { title: "Cricket", href: "/cricket" },
  { title: "Fitness", href: "/fitness" },
  { title: "Recovery", href: "/recovery" },
  { title: "Running", href: "/running" },
  { title: "Personal Training", href: "/personal-training" },
  { title: "Membership", href: "/membership" },
];

export default function Navbar({ isMobile }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <nav className="flex justify-between items-center py-5 px-6 md:py-6 md:px-4 bg-transparent w-full">
        <button
          className="relative z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            src="https://da8nru77lsio9.cloudfront.net/raw-images/images/hamburger.svg"
            alt="menu"
            width={24}
            height={24}
          />
        </button>
        <Link href="/">
          <Image src="https://da8nru77lsio9.cloudfront.net/raw-images/images/logo.svg" alt="logo" width={141} height={24} />
        </Link>
        <div className="flex items-center gap-4">
          <button className="bg-[#00DBDC] rounded-lg px-3 md:px-6 py-2 text-[#0D0D0D] font-medium text-xs md:text-sm">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#1A1A1A] z-10">
            <div className="flex flex-col items-center justify-center pt-24">
              {navLinks.map((link, idx) => (
                <div className="p-4 text-center w-full" key={idx}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-[#00DBDC] transition-colors text-lg"
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
    <nav className="flex justify-between items-center py-8 pr-[100px] pl-[120px] gap-4 bg-transparent">
      <Link href="/">
        <Image src="https://da8nru77lsio9.cloudfront.net/raw-images/images/logo.svg" alt="logo" width={212} height={36} />
      </Link>
      <div className="flex gap-10 px-2">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="text-white hover:text-[#00DBDC] transition-colors"
          >
            {link.title}
          </Link>
        ))}
      </div>
      <button className="bg-[#00DBDC] rounded-lg px-10 py-3 text-[#0D0D0D] font-medium text-base">
        Sign In
      </button>
    </nav>
  );
}
