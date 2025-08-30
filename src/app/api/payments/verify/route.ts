import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature, PaymentStatus } from "@/lib/razorpay";
import { updatePaymentOrder, insertMembership } from "@/lib/paymentDatabase";
import { razorpayApiClient } from "@/lib/razorpayApiClient";

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, userDetails } = await request.json();

    if (!orderId || !paymentId || !signature || !userDetails) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    console.log("Payment verification request received:", {
      orderId,
      paymentId,
    });

    // Verify signature first
    // const isValid = verifyPaymentSignature(orderId, paymentId, signature);

    // if (!isValid) {
    //   console.error("Invalid payment signature");
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    // }

    // Additional verification: Fetch payment details from Razorpay API
    const paymentResponse = await razorpayApiClient.getPayment(paymentId);

    if (!paymentResponse.success) {
      console.error(
        "Failed to fetch payment details from Razorpay:",
        paymentResponse.error
      );
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 500 }
      );
    }

    const paymentDetails = paymentResponse.data!;

    // Verify payment status and order ID match
    if (
      paymentDetails.status !== "captured" &&
      paymentDetails.status !== "authorized"
    ) {
      console.error("Payment not in valid state:", paymentDetails.status);
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    if (paymentDetails.order_id !== orderId) {
      console.error("Order ID mismatch:", {
        expected: orderId,
        actual: paymentDetails.order_id,
      });
      return NextResponse.json({ error: "Order ID mismatch" }, { status: 400 });
    }

    console.log("Payment details verified:", {
      paymentId,
      status: paymentDetails.status,
      amount: paymentDetails.amount,
      orderId: paymentDetails.order_id,
    });

    // Update payment status in database
    try {
      await updatePaymentOrder(orderId, {
        payment_id: paymentId,
        signature: signature,
        status: PaymentStatus.COMPLETED,
        user_details: userDetails,
        completed_at: new Date(),
      });
      console.log("Payment order updated in database");
    } catch (dbError) {
      console.error("Failed to update payment order:", dbError);
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      );
    }

    // Create membership record
    try {
      await insertMembership({
        user_id: userDetails.user_id || userDetails.id,
        order_id: orderId,
        payment_id: paymentId,
        membership_type: userDetails.membership_type || null,
        status: "active",
        created_at: new Date(),
      });
      console.log(
        "Membership record created for user_id:",
        userDetails.user_id || userDetails.id
      );
    } catch (dbError) {
      console.error("Failed to create membership record:", dbError);
      // Don't fail the entire request if membership creation fails
    }

    console.log("Payment verified successfully:", paymentId);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: paymentId,
      orderId: orderId,
      paymentStatus: paymentDetails.status,
      amount: paymentDetails.amount,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      {
        error: "Verification failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
