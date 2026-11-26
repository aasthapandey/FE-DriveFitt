import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import AdminTabs from "@/components/EnquiryAdminDashboard/AdminTabs";
import { executeQuery } from "@/lib/database";
import { ENQUIRY_ADMIN_COOKIE, getEnquiryAdminSession } from "@/lib/enquiryAdminService";
import { formatTrialDate, formatTrialPrice } from "@/config/trialPass";

export const metadata: Metadata = {
  title: "Trial Buyers | Drive FITT",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 25;
const PATH = "/admin/trial-buyers";
const inputClass = "w-full rounded-lg border border-[#333333] bg-white px-4 py-2.5 text-sm text-[#0D0D0D] outline-none focus:border-[#00DBDC] [&::-webkit-calendar-picker-indicator]:!block";
const dateTime = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

interface Buyer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  trialDate: string;
  paidAt: string;
  amountPaise: number;
  paymentId: string;
}

const dateFilter = (value: string | string[] | undefined) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : "";
};

export default async function TrialBuyersPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const admin = await getEnquiryAdminSession(cookies().get(ENQUIRY_ADMIN_COOKIE)?.value);
  if (!admin) redirect("/admin/enquiries");

  const from = dateFilter(searchParams.from);
  const to = dateFilter(searchParams.to);
  const requestedPage = Number(searchParams.page);
  const clauses = ["paid_at IS NOT NULL", "razorpay_payment_id IS NOT NULL"];
  const params: string[] = [];
  if (from) {
    clauses.push("trial_date >= ?");
    params.push(from);
  }
  if (to) {
    clauses.push("trial_date <= ?");
    params.push(to);
  }

  const where = clauses.join(" AND ");
  let buyers: Buyer[] = [];
  let total = 0;
  let page = 1;
  let pageCount = 1;
  let failed = false;

  try {
    const [count] = await executeQuery<Array<{ total: number }>>(
      `SELECT COUNT(*) AS total FROM trial_pass_bookings WHERE ${where}`,
      params,
    );
    total = Number(count.total);
    pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (Number.isSafeInteger(requestedPage) && requestedPage > 1) {
      page = Math.min(requestedPage, pageCount);
    }
    buyers = await executeQuery<Buyer[]>(
      `SELECT id, first_name AS firstName, last_name AS lastName, email, phone,
              DATE_FORMAT(trial_date, '%Y-%m-%d') AS trialDate,
              DATE_FORMAT(paid_at, '%Y-%m-%dT%H:%i:%sZ') AS paidAt,
              amount_paise AS amountPaise, razorpay_payment_id AS paymentId
       FROM trial_pass_bookings WHERE ${where}
       ORDER BY paid_at DESC, id DESC LIMIT ? OFFSET ?`,
      [...params, PAGE_SIZE, (page - 1) * PAGE_SIZE],
    );
  } catch {
    failed = true;
    console.error("Unable to load trial pass buyers");
  }

  const pageUrl = (number: number) => {
    const query = new URLSearchParams({ page: String(number) });
    if (from) query.set("from", from);
    if (to) query.set("to", to);
    return `${PATH}?${query}`;
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <header className="border-b border-white/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <Link href="/admin/enquiries" aria-label="Drive FITT admin">
            <Image src="/images/logo.svg" alt="Drive FITT" width={338} height={36} className="h-auto w-[175px] md:w-[220px]" />
          </Link>
          <p className="text-sm font-medium">{admin.name}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-10">
        <AdminTabs active="/admin/trial-buyers" />
        <h1 className="text-3xl font-semibold tracking-[-1.5px] md:text-[40px]">Trial buyers</h1>
        <p className="mt-2 text-sm text-[#8A8A8A]">Paid trial pass bookings and buyer contact details.</p>

        <form action={PATH} className="my-6 grid gap-3 rounded-xl border border-white/10 bg-[#151515] p-4 sm:grid-cols-[minmax(0,170px)_minmax(0,170px)_auto_auto] sm:items-end sm:justify-start">
          <label className="grid gap-1.5 text-xs text-[#8A8A8A]">
            Trial date from
            <input type="date" name="from" defaultValue={from} className={inputClass} />
          </label>
          <label className="grid gap-1.5 text-xs text-[#8A8A8A]">
            Trial date to
            <input type="date" name="to" defaultValue={to} className={inputClass} />
          </label>
          <button type="submit" className="rounded-lg bg-[#00DBDC] px-5 py-2.5 text-sm font-semibold text-black">Apply</button>
          <Link href={PATH} className="rounded-lg border border-white/20 px-5 py-2.5 text-center text-sm">Clear</Link>
        </form>

        {failed ? (
          <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            Unable to load trial buyers. Please refresh the page.
          </p>
        ) : (
          <section className="overflow-hidden rounded-xl border border-white/10 bg-[#151515]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-[#8A8A8A]">
                  <tr>
                    {["Buyer", "Contact", "Trial date", "Paid at (IST)", "Amount paid", "References"].map((label) => (
                      <th key={label} scope="col" className="px-4 py-3 font-medium">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {buyers.length ? buyers.map((buyer) => (
                    <tr key={buyer.id}>
                      <td className="px-4 py-4 font-medium">{buyer.firstName} {buyer.lastName}</td>
                      <td className="px-4 py-4">
                        <a href={`tel:${buyer.phone}`} className="text-[#00DBDC] hover:underline">{buyer.phone}</a>
                        <p className="mt-1 break-all text-xs text-white/70">{buyer.email}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">{formatTrialDate(buyer.trialDate)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-white/70">{dateTime.format(new Date(buyer.paidAt))}</td>
                      <td className="whitespace-nowrap px-4 py-4">{formatTrialPrice(buyer.amountPaise)}</td>
                      <td className="px-4 py-4 text-xs text-white/70">
                        <p className="break-all">Booking {buyer.id}</p>
                        <p className="mt-1 break-all">Payment {buyer.paymentId}</p>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-[#8A8A8A]">No paid trial bookings found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-white/65">
              <span>{total} {total === 1 ? "booking" : "bookings"}</span>
              <div className="flex items-center gap-3">
                {page > 1 && <Link href={pageUrl(page - 1)} className="rounded border border-white/20 px-3 py-1.5">Previous</Link>}
                <span>Page {page} of {pageCount}</span>
                {page < pageCount && <Link href={pageUrl(page + 1)} className="rounded border border-white/20 px-3 py-1.5">Next</Link>}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
