import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, PaymentStatus } from "@/lib/razorpay";
import { updatePaymentOrder } from "@/lib/paymentDatabase";
import { validateWebhookEvent } from "@/lib/razorpayUtils";

// Handle payment captured event
const handlePaymentCaptured = async (payment: any) => {
  try {
    console.log("Payment captured webhook received:", payment.id);

    // Update payment status in database
    await updatePaymentOrder(payment.order_id, {
      payment_id: payment.id,
      status: PaymentStatus.COMPLETED,
      completed_at: new Date(),
    });

    console.log("Payment status updated successfully via webhook");
  } catch (error) {
    console.error("Error handling payment captured:", error);
  }
};

// Handle payment failed event
const handlePaymentFailed = async (payment: any) => {
  try {
    console.log("Payment failed webhook received:", payment.id);

    // Update payment status in database
    await updatePaymentOrder(payment.order_id, {
      payment_id: payment.id,
      status: PaymentStatus.FAILED,
      completed_at: new Date(),
    });

    console.log("Payment failure recorded successfully via webhook");
  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("X-Razorpay-Signature");

    if (!signature) {
      console.error("Missing webhook signature");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature);

    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    console.log("Webhook event received:", event.event);

    // Validate webhook event with Razorpay API
    const validation = await validateWebhookEvent(event);
    if (!validation.isValid) {
      console.error("Webhook event validation failed:", validation.error);
      return NextResponse.json(
        { error: "Invalid webhook event" },
        { status: 400 }
      );
    }

    // Handle different webhook events
    switch (event.event) {
      case "payment.captured":
        await handlePaymentCaptured(event.payload.payment.entity);
        break;
      case "payment.failed":
        await handlePaymentFailed(event.payload.payment.entity);
        break;
      case "order.paid":
        console.log(
          "Order paid event received:",
          event.payload.order.entity.id
        );
        break;
      default:
        console.log("Unhandled webhook event:", event.event);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
