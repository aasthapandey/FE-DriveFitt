import Link from "next/link";

const tabs = [
  { href: "/admin/enquiries", label: "Enquiry leads" },
  { href: "/admin/trial-buyers", label: "Trial buyers" },
] as const;

export default function AdminTabs({ active }: { active: (typeof tabs)[number]["href"] }) {
  return (
    <nav aria-label="Admin views" className="mb-6 flex flex-wrap gap-3">
      {tabs.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={active === href ? "page" : undefined}
          className={`rounded-lg border px-4 py-2 text-sm font-medium ${
            active === href
              ? "border-[#00DBDC]/50 bg-[#00DBDC]/10 text-[#00DBDC]"
              : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
