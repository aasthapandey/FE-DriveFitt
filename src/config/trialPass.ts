export const TRIAL_PASS_PATH = "/trial-pass";
export const TRIAL_PASS_SUCCESS_PATH = "/trial-pass/success";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatTrialPrice = (amountPaise: number) => inr.format(amountPaise / 100);
export const formatTrialDate = (date: string) => date.split("-").reverse().join("/");

export function getTrialDateWindow(now = new Date()) {
  const indiaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(indiaDate.map(({ type, value }) => [type, value]));
  const today = `${values.year}-${values.month}-${values.day}`;
  const dateAfter = (days: number) =>
    new Date(Date.parse(today) + days * 86_400_000).toISOString().slice(0, 10);

  return { today, yesterday: dateAfter(-1), first: dateAfter(1), last: dateAfter(7) };
}

export interface TrialPassBooking {
  id: string;
  trialDate: string;
  amountPaise: number;
  state: "unpaid" | "processing" | "paid";
  paymentId?: string;
  checkout?: {
    key: string;
    orderId: string;
    amount: number;
  };
}
