import { NextRequest, NextResponse } from "next/server";
import { razorpayApiClient } from "@/lib/razorpayApiClient";
import { insertPaymentOrder } from "@/lib/paymentDatabase";
import { PaymentStatus } from "@/lib/razorpay";
import { getMembershipTypeFromName } from "@/lib/membershipTypes";

export async function POST(request: NextRequest) {
  console.log("🎯 Create Order API endpoint called");

  try {
    const {
      amount,
      currency = "INR",
      receipt,
      membership_type,
    } = await request.json();

    console.log("📝 Request body parsed:", {
      amount,
      currency,
      receipt,
      membership_type,
    });

    if (!amount || membership_type === undefined) {
      console.error("❌ Validation failed - missing required fields");
      return NextResponse.json(
        { error: "Amount and membership type are required" },
        { status: 400 }
      );
    }

    // Convert membership_type to integer if it's a string
    const membershipTypeInt = typeof membership_type === 'string' 
      ? getMembershipTypeFromName(membership_type)
      : membership_type;

    console.log("✅ Order creation request received:", {
      amount,
      membership_type: membershipTypeInt,
      currency,
    });

    // Create order using Razorpay API client
    const orderResponse = await razorpayApiClient.createOrder({
      amount: amount*100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        membership_type: membershipTypeInt.toString(),
        created_at: new Date().toISOString(),
      },
    });

    if (!orderResponse.success) {
      console.error("Razorpay order creation failed:", orderResponse.error);
      return NextResponse.json(
        {
          error: "Order creation failed",
          details: orderResponse.error || "Unknown error from Razorpay",
        },
        { status: 500 }
      );
    }

    const order = orderResponse.data!;
    console.log("Razorpay order created successfully:", order.id);

    // Save order to database
    try {
      await insertPaymentOrder({
        id: order.id,
        amount: amount, // Keep original amount in rupees for database
        currency: order.currency,
        status: PaymentStatus.CREATED,
        membership_type: membershipTypeInt,
        created_at: new Date(),
      });
      console.log("Order saved to database successfully:", order.id);
    } catch (dbError) {
      console.error("Failed to save order to database:", dbError);
      // Don't fail the request if database save fails, as the order was created in Razorpay
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
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
