import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { recordTrialPayment } from "@/lib/trialPass";
import { deliverTrialPassReceipt } from "@/lib/trialPassReceiptEmail";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  if (!signature || !verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ message: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    const event = JSON.parse(body);
    if (event.event === "payment.captured") {
      const payment = event.payload?.payment?.entity;
      if (!payment?.id || !payment.order_id) {
        return NextResponse.json({ message: "Invalid payment event." }, { status: 400 });
      }
      if (payment.status === "captured" && payment.currency === "INR") {
        await recordTrialPayment(payment);
        const sent = await deliverTrialPassReceipt(payment.order_id, payment.id, Number(payment.amount));
        if (!sent) return NextResponse.json({ message: "Receipt delivery is in progress." }, { status: 503 });
      }
    }
    return NextResponse.json({ received: true });
  } catch {
    console.error("Trial pass webhook processing failed");
    return NextResponse.json({ message: "Webhook processing failed." }, { status: 500 });
  }
}
