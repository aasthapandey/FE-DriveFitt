import Link from "next/link";

const navLinks = [
  { href: "/cricket", label: "Cricket" },
  { href: "/fitness", label: "Fitness" },
  { href: "/recovery", label: "Recovery" },
  { href: "/running", label: "Running" },
];

export default function Navbar() {
  return (
    <nav>
      {navLinks.map(link => (
        <Link key={link.href} href={link.href}>{link.label}</Link>
      ))}
    </nav>
  );
} 