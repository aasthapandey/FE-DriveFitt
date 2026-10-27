"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

interface Admin {
  id: number;
  name: string;
  phone: string;
}

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: string;
  enquiryType: string;
  source: string;
  submittedAt: string;
  crmStatus: string;
}

interface DashboardData {
  leads: Lead[];
  pagination: { page: number; pageSize: number; total: number };
  summary: { total: number; today: number; needsSync: number };
}

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

const readApiResponse = async <T,>(response: Response): Promise<ApiResponse<T>> => {
  const text = await response.text();
  if (!text) {
    return {
      success: false,
      message:
        response.status === 504
          ? "The request timed out. Please try again."
          : "The server did not return a response. Please try again.",
    };
  }
  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    return { success: false, message: "Unable to complete the request. Please try again." };
  }
};

type Screen = "checking" | "phone" | "otp" | "dashboard";

const inputClass =
  "w-full rounded-lg border border-[#333333] bg-white px-4 py-2.5 text-sm text-[#0D0D0D] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#00DBDC]";
const buttonClass =
  "rounded-lg border border-transparent bg-[#00DBDC] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-[#00DBDC] hover:bg-transparent hover:text-[#00DBDC] disabled:cursor-not-allowed disabled:opacity-50";

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return digits.length === 10
    ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
    : phone;
};

const formatLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatSubmittedAt = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
};

const statusStyle = (status: string) => {
  if (status === "synced") return "bg-emerald-400/10 text-emerald-300";
  if (status === "failed") return "bg-red-400/10 text-red-300";
  if (status === "review") return "bg-amber-400/10 text-amber-300";
  return "bg-white/10 text-[#B6B6B6]";
};

export default function EnquiryAdminDashboard() {
  const [screen, setScreen] = useState<Screen>("checking");
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [data, setData] = useState<DashboardData | null>(null);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ search: "", from: "", to: "" });
  const [page, setPage] = useState(1);
  const verificationInFlight = useRef(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ view: "list", page: String(page), pageSize: "25" });
    if (appliedFilters.search) params.set("search", appliedFilters.search);
    if (appliedFilters.from) params.set("from", appliedFilters.from);
    if (appliedFilters.to) params.set("to", appliedFilters.to);
    try {
      const response = await fetch(`/api/enquiry-admin?${params}`, { cache: "no-store" });
      const result = await readApiResponse<DashboardData>(response);
      if (response.status === 401) {
        setAdmin(null);
        setScreen("phone");
        throw new Error("Your session expired. Please sign in again.");
      }
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Unable to load enquiries.");
      }
      setData(result.data);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to load enquiries.",
      );
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, page]);

  useEffect(() => {
    fetch("/api/enquiry-admin?view=session", { cache: "no-store" })
      .then(async (response) => {
        const result = await readApiResponse<{ admin: Admin }>(response);
        if (!response.ok || !result.success || !result.data) {
          setScreen("phone");
          return;
        }
        setAdmin(result.data.admin);
        setScreen("dashboard");
      })
      .catch(() => setScreen("phone"));
  }, []);

  useEffect(() => {
    if (screen === "dashboard") void loadLeads();
  }, [screen, loadLeads]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  const sendOtp = async (resend: boolean) => {
    setError("");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/enquiry-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_otp", phone, resend }),
      });
      const result = await readApiResponse(response);
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send OTP.");
      }
      setOtp("");
      setSecondsLeft(60);
      setScreen("otp");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    if (verificationInFlight.current || !/^\d{4}$/.test(code)) return;
    verificationInFlight.current = true;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/enquiry-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_otp", phone, otp: code }),
      });
      const result = await readApiResponse<{ admin: Admin }>(response);
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Unable to verify OTP.");
      }
      setAdmin(result.data.admin);
      setScreen("dashboard");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to verify OTP.");
    } finally {
      verificationInFlight.current = false;
      setLoading(false);
    }
  };

  const applyFilters = (event: FormEvent) => {
    event.preventDefault();
    setPage(1);
    setAppliedFilters({ search: search.trim(), from, to });
  };

  const clearFilters = () => {
    setSearch("");
    setFrom("");
    setTo("");
    setPage(1);
    setAppliedFilters({ search: "", from: "", to: "" });
  };

  const exportUrl = () => {
    const params = new URLSearchParams({ view: "export" });
    if (appliedFilters.search) params.set("search", appliedFilters.search);
    if (appliedFilters.from) params.set("from", appliedFilters.from);
    if (appliedFilters.to) params.set("to", appliedFilters.to);
    return `/api/enquiry-admin?${params}`;
  };

  const logout = async () => {
    await fetch("/api/enquiry-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    }).catch(() => undefined);
    setAdmin(null);
    setData(null);
    setOtp("");
    setPhone("");
    setScreen("phone");
  };

  if (screen === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0D0D0D] text-white">
        <p className="text-sm text-[#8A8A8A]">Loading dashboard...</p>
      </main>
    );
  }

  if (screen === "phone" || screen === "otp") {
    return (
      <main className="min-h-screen bg-[#0D0D0D] px-6 py-8 text-white md:px-[120px] md:py-10">
        <header className="mx-auto mb-10 flex max-w-[1120px] justify-center md:justify-start">
          <Link href="/" aria-label="Drive FITT home">
            <Image
              src="/images/logo.svg"
              alt="Drive FITT"
              width={338}
              height={36}
              className="h-auto w-[220px] md:w-[270px]"
              priority
            />
          </Link>
        </header>
        <section className="mx-auto max-w-[520px] rounded-[20px] bg-gradient-to-b from-[#333333] to-[#00DBDC] p-[2px] md:rounded-[32px]">
          <div className="rounded-[20px] bg-[#0D0D0D] p-6 md:rounded-[32px] md:p-10">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#00DBDC]">
              Enquiry dashboard
            </p>
            <h1 className="text-2xl font-semibold tracking-[-1px] md:text-3xl">
              {screen === "phone" ? "Admin sign in" : "Verify your mobile"}
            </h1>
            <p className="mt-2 text-sm leading-5 text-[#8A8A8A]">
              {screen === "phone"
                ? "Use an authorized mobile number to view enquiry leads."
                : `We sent a 4-digit code on WhatsApp to +91 ${phone}.`}
            </p>

            {screen === "phone" ? (
              <div className="mt-7 space-y-5">
                <div>
                  <label htmlFor="admin-phone" className="mb-1.5 block text-sm text-[#8A8A8A]">
                    Mobile number
                  </label>
                  <div className="flex overflow-hidden rounded-lg border border-[#333333] bg-white focus-within:border-[#00DBDC]">
                    <span className="border-r border-[#D5D5D5] px-4 py-2.5 text-sm font-medium text-black">
                      +91
                    </span>
                    <input
                      id="admin-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="Enter 10-digit mobile number"
                      className="min-w-0 flex-1 px-4 py-2.5 text-sm text-black outline-none"
                    />
                  </div>
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button
                  type="button"
                  onClick={() => void sendOtp(false)}
                  disabled={loading}
                  className={`${buttonClass} w-full`}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            ) : (
              <form
                className="mt-7 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  void verifyOtp(otp);
                }}
              >
                <div>
                  <label htmlFor="admin-otp" className="mb-1.5 block text-sm text-[#8A8A8A]">
                    OTP
                  </label>
                  <input
                    id="admin-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={(event) => {
                      const nextOtp = event.target.value.replace(/\D/g, "").slice(0, 4);
                      setOtp(nextOtp);
                      if (nextOtp.length === 4) void verifyOtp(nextOtp);
                    }}
                    className={`${inputClass} text-center text-lg tracking-[0.5em]`}
                    placeholder="Enter 4-digit OTP"
                    disabled={loading}
                    autoFocus
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setScreen("phone");
                      setError("");
                    }}
                    className="text-[#8A8A8A] hover:text-white"
                  >
                    Change number
                  </button>
                  {secondsLeft > 0 ? (
                    <span className="text-[#8A8A8A]">Resend in {secondsLeft}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void sendOtp(true)}
                      disabled={loading}
                      className="text-[#00DBDC] hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button type="submit" disabled={loading || otp.length !== 4} className={`${buttonClass} w-full`}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(
      (data?.pagination.total || 0) / (data?.pagination.pageSize || 1000),
    ),
  );

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <header className="border-b border-white/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <Link href="/" aria-label="Drive FITT home">
            <Image src="/images/logo.svg" alt="Drive FITT" width={338} height={36} className="h-auto w-[175px] md:w-[220px]" priority />
          </Link>
          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{admin?.name}</p>
              <p className="text-xs text-[#8A8A8A]">{admin ? formatPhone(admin.phone) : ""}</p>
            </div>
            <button type="button" onClick={() => void logout()} className="rounded-lg border border-white/20 px-4 py-2 text-xs hover:border-[#00DBDC] hover:text-[#00DBDC]">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#00DBDC]">Admin</p>
            <h1 className="text-3xl font-semibold tracking-[-1.5px] md:text-[40px]">Enquiry leads</h1>
            <p className="mt-2 text-sm text-[#8A8A8A]">Read-only view of enquiries submitted through the website.</p>
          </div>
          <a href={exportUrl()} className={`${buttonClass} text-center`}>Export CSV</a>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Total enquiries", data?.summary.total ?? "—"],
            ["Submitted today", data?.summary.today ?? "—"],
            ["Awaiting CRM sync", data?.summary.needsSync ?? "—"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-[#151515] p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[#8A8A8A]">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </section>

        <form onSubmit={applyFilters} className="mb-5 grid gap-3 rounded-xl border border-white/10 bg-[#151515] p-4 md:grid-cols-[minmax(220px,1fr)_170px_170px_auto_auto] md:items-end">
          <div>
            <label htmlFor="lead-search" className="mb-1.5 block text-xs text-[#8A8A8A]">Search</label>
            <input id="lead-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, phone or email" className={inputClass} />
          </div>
          <div>
            <label htmlFor="lead-from" className="mb-1.5 block text-xs text-[#8A8A8A]">From date</label>
            <input id="lead-from" type="date" value={from} onChange={(event) => setFrom(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="lead-to" className="mb-1.5 block text-xs text-[#8A8A8A]">To date</label>
            <input id="lead-to" type="date" value={to} onChange={(event) => setTo(event.target.value)} className={inputClass} />
          </div>
          <button type="submit" disabled={loading} className={buttonClass}>Apply</button>
          <button type="button" onClick={clearFilters} className="rounded-lg border border-white/20 px-5 py-2.5 text-sm hover:border-white/40">Clear</button>
        </form>

        {error && <div className="mb-5 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</div>}

        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#151515]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.06em] text-[#8A8A8A]">
                <tr>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Prospect</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Gender</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">YoActiv</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading && !data ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-[#8A8A8A]">Loading enquiries...</td></tr>
                ) : data?.leads.length ? (
                  data.leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.025]">
                      <td className="whitespace-nowrap px-4 py-4 text-xs text-[#B6B6B6]">{formatSubmittedAt(lead.submittedAt)}</td>
                      <td className="px-4 py-4"><p className="font-medium">{lead.name}</p><p className="mt-1 text-xs text-[#8A8A8A]">{lead.email}</p></td>
                      <td className="whitespace-nowrap px-4 py-4">{formatPhone(lead.phone)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-[#B6B6B6]">{formatLabel(lead.gender)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-[#B6B6B6]">{formatLabel(lead.enquiryType)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-[#B6B6B6]">{lead.source}</td>
                      <td className="whitespace-nowrap px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs ${statusStyle(lead.crmStatus)}`}>{formatLabel(lead.crmStatus)}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-[#8A8A8A]">No enquiries found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-[#8A8A8A]">
            <span>{data ? `${data.pagination.total} result${data.pagination.total === 1 ? "" : "s"}` : ""}</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page <= 1 || loading} className="rounded border border-white/20 px-3 py-1.5 disabled:opacity-40">Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page >= totalPages || loading} className="rounded border border-white/20 px-3 py-1.5 disabled:opacity-40">Next</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
