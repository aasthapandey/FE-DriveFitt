import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import type { TrialPassBooking } from "@/config/trialPass";
import { getRazorpayInstance, verifyPaymentSignature } from "@/lib/razorpay";
import { deliverTrialPassReceipt } from "@/lib/trialPassReceiptEmail";
import {
  createTrialBooking,
  getTrialBookingStatus,
  getTrialOrderId,
  inputText,
  readBookingId,
  TrialPassError,
} from "@/lib/trialPass";

export const runtime = "nodejs";
export const maxDuration = 30;

function respondWithBooking(booking: TrialPassBooking) {
  if (booking.state === "paid" && booking.paymentId) {
    waitUntil(deliverTrialPassReceipt(booking.paymentId).catch(() => {
      console.error("Trial pass receipt delivery failed after checkout confirmation");
    }));
  }
  return NextResponse.json(booking);
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  try {
    const id = readBookingId(input);
    switch (input.action) {
      case "create":
        return respondWithBooking(await createTrialBooking(id, input));
      case "status":
        return respondWithBooking(await getTrialBookingStatus(id));
      case "verify": {
        const paymentId = inputText(input, "paymentId");
        const signature = inputText(input, "signature");
        const orderId = await getTrialOrderId(id);
        if (
          !orderId || !/^pay_[a-zA-Z0-9]+$/.test(paymentId) ||
          !/^[a-f0-9]{64}$/.test(signature) ||
          !verifyPaymentSignature(orderId, paymentId, signature)
        ) {
          throw new TrialPassError("Payment could not be verified.");
        }
        const payment = await getRazorpayInstance().payments.fetch(paymentId);
        return respondWithBooking(await getTrialBookingStatus(id, payment));
      }
      default:
        throw new TrialPassError("Invalid request.");
    }
  } catch (error) {
    if (error instanceof TrialPassError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("Trial pass request failed", { action: input.action === "create" ? "create" : "payment" });
    return NextResponse.json(
      { message: "The booking service is unavailable. Please try again." },
      { status: 503 },
    );
  }
}
