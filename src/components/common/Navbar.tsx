import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/cricket", label: "Cricket" },
  { href: "/fitness", label: "Fitness" },
  { href: "/recovery", label: "Recovery" },
  { href: "/running", label: "Running" },
];

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-8 pr-[100px] pl-[120px] gap-4 bg-transparent">
      <Link href="/">
        <Image src="/images/logo.svg" alt="logo" width={212} height={36} />
      </Link>
      <div className="flex gap-10 px-2">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <button className="bg-[#00DBDC] rounded-lg px-10 py-3 text-[#0D0D0D] font-medium text-base">
        Sign In
      </button>
    </nav>
  );
}
