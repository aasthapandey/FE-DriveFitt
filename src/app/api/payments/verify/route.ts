import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature, PaymentStatus } from "@/lib/razorpay";
import { updatePaymentOrder, insertMembership } from "@/lib/paymentDatabase";

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, userDetails } = await request.json();

    if (!orderId || !paymentId || !signature || !userDetails) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = verifyPaymentSignature(orderId, paymentId, signature);

    if (!isValid) {
      console.error("Invalid payment signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Update payment status in database
    await updatePaymentOrder(orderId, {
      payment_id: paymentId,
      signature: signature,
      status: PaymentStatus.COMPLETED,
      user_details: userDetails,
      completed_at: new Date(),
    });

    // Create membership record
    await insertMembership({
      user_email: userDetails.email,
      order_id: orderId,
      payment_id: paymentId,
      membership_type: userDetails.membership_type,
      status: "active",
      created_at: new Date(),
    });

    console.log("Payment verified successfully:", paymentId);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: paymentId,
      orderId: orderId,
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
