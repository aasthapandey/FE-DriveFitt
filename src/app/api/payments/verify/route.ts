import { NextRequest, NextResponse } from "next/server";
import {
  OrderStatus,
  PaymentStatus,
  MembershipStatus,
} from "@/lib/paymentDatabase";
import {
  getOrderByRazorpayId,
  updateOrder,
  insertPayment,
  insertMembership,
  calculateExpiryDate,
  mapPaymentMethod,
} from "@/lib/paymentDatabase";
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

    // Get order by razorpay_order_id to get internal order.id
    const order = await getOrderByRazorpayId(orderId);
    if (!order) {
      console.error("Order not found in database:", orderId);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Create payment record in payments table
    const paymentRecordId = await insertPayment({
      razorpay_payment_id: paymentId,
      order_id: order.id!,
      user_id: order.user_id,
      amount: paymentDetails.amount / 100, // Convert from paise
      currency: paymentDetails.currency,
      method: mapPaymentMethod(paymentDetails.method || "card"),
      bank: (paymentDetails as unknown as { bank?: string }).bank || null,
      card_id:
        (paymentDetails as unknown as { card_id?: string }).card_id || null,
      wallet: (paymentDetails as unknown as { wallet?: string }).wallet || null,
      vpa: (paymentDetails as unknown as { vpa?: string }).vpa || null,
      email: paymentDetails.email || null,
      contact: paymentDetails.contact || null,
      status: PaymentStatus.CAPTURED,
      captured_at: new Date(),
      razorpay_payment_response: paymentDetails,
      razorpay_capture_response: paymentDetails,
    });

    console.log("Payment record created with ID:", paymentRecordId);

    // Update order status
    try {
      await updateOrder(order.id!, {
        status: OrderStatus.PAID,
        razorpay_order_status_response: paymentDetails,
      });
      console.log("Order status updated to paid");
    } catch (dbError) {
      console.error("Failed to update order status:", dbError);
      // Don't fail the entire request if order update fails
    }

    // Create membership record
    try {
      await insertMembership({
        user_id: order.user_id,
        order_id: order.id!,
        payment_id: paymentRecordId,
        membership_type: order.membership_type,
        status: MembershipStatus.ACTIVE,
        end_date: calculateExpiryDate(),
      });
      console.log(
        "Membership record created for user_id:",
        order.user_id,
        "with membership_type:",
        order.membership_type
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
      internalOrderId: order.id,
      internalPaymentId: paymentRecordId,
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
