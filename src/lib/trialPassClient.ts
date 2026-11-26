import type { TrialPassBooking } from "@/config/trialPass";

const STORAGE_KEY = "drivefitt_trial_pass_booking";

export class BookingRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export async function bookingRequest(body: Record<string, unknown>): Promise<TrialPassBooking | null> {
  const response = await fetch("/api/trial-pass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => null);
  if (response.status === 404) return null;
  if (!response.ok || !result) {
    throw new BookingRequestError(
      result?.message || "Could not reach the booking service. Please try again.",
      response.status,
    );
  }
  return result;
}

export function storedBooking(id?: string) {
  try {
    if (id === "") sessionStorage.removeItem(STORAGE_KEY);
    else if (id) sessionStorage.setItem(STORAGE_KEY, id);
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
