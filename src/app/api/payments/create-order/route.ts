import { NextRequest, NextResponse } from "next/server";
import { razorpayInstance, PaymentStatus } from "@/lib/razorpay";
import { insertPaymentOrder } from "@/lib/paymentDatabase";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const razorpay = new Razorpay({
        key_id:  "rzp_live_RB2d3kXODuUvYi",
        key_secret:  "Id53VaAT0290MOxXhzXxZk1o",
      });
    const {
      amount,
      currency = "INR",
      receipt,
      membership_type,
    } = await request.json();

    if (!amount || !membership_type) {
      return NextResponse.json(
        { error: "Amount and membership type are required" },
        { status: 400 }
      );
    }
    console.log("Order RECEIVED successfully:", amount, membership_type);

    // Create order in Razorpay
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise and ensure integer
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        membership_type,
        created_at: new Date().toISOString(),
      },
    });
    console.log("Order RECEIVED2 successfully:", amount, membership_type);


    // Save order to database
    await insertPaymentOrder({
      id: order.id,
      amount: amount,
      currency,
      status: PaymentStatus.CREATED,
      membership_type,
      created_at: new Date(),
    });

    console.log("Order created successfully:", order.id);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      {
        error: "Order creation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
