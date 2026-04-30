import { NextRequest, NextResponse } from "next/server";
import { razorpayApiClient } from "@/lib/razorpayApiClient";
import { getMembershipPlanById } from "@/config/membershipPlans";
import { jwtService } from "@/lib/jwtService";
import {
  getMembershipTermsAcceptanceById,
  insertOrder,
  linkMembershipTermsAcceptanceToOrder,
  generateInvoiceNumber,
  OrderStatus,
} from "@/lib/paymentDatabase";

export async function POST(request: NextRequest) {
  console.log("🎯 Create Order API endpoint called");

  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" },
        { status: 401 }
      );
    }

    const decoded = jwtService.verifyToken(authHeader.substring(7));
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const {
      amount,
      currency = "INR",
      receipt,
      membership_type,
      user_id,
      plan_id,
      terms_acceptance_id,
    } = await request.json();

    console.log("📝 Request body parsed:", {
      amount,
      currency,
      receipt,
      membership_type,
      user_id,
      plan_id,
      terms_acceptance_id,
    });

    if (
      !amount ||
      membership_type === undefined ||
      membership_type === null ||
      !user_id ||
      !plan_id ||
      !terms_acceptance_id
    ) {
      console.error("❌ Validation failed - missing required fields");
      return NextResponse.json(
        {
          error:
            "Amount, membership type, user_id, plan_id, and terms_acceptance_id are required",
        },
        { status: 400 }
      );
    }

    if (decoded.user_id !== Number(user_id)) {
      return NextResponse.json(
        { error: "Authenticated user does not match order user" },
        { status: 403 }
      );
    }

    const selectedPlan = getMembershipPlanById(plan_id);
    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Invalid membership plan" },
        { status: 400 }
      );
    }

    if (
      selectedPlan.membershipType !== Number(membership_type) ||
      selectedPlan.pricing.total !== Number(amount)
    ) {
      return NextResponse.json(
        { error: "Selected plan does not match requested payment details" },
        { status: 400 }
      );
    }

    const termsAcceptance = await getMembershipTermsAcceptanceById(
      Number(terms_acceptance_id)
    );
    if (
      !termsAcceptance ||
      termsAcceptance.user_id !== Number(user_id) ||
      termsAcceptance.plan_id !== selectedPlan.id ||
      termsAcceptance.membership_type !== selectedPlan.membershipType ||
      Number(termsAcceptance.total_amount) !== selectedPlan.pricing.total
    ) {
      return NextResponse.json(
        { error: "Invalid terms acceptance for selected plan" },
        { status: 400 }
      );
    }

    console.log("✅ Order creation request received:", {
      amount,
      membership_type,
      currency,
      user_id,
      plan_id,
      terms_acceptance_id,
    });

    // Create order using Razorpay API client
    const orderResponse = await razorpayApiClient.createOrder({
      amount: amount,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        membership_type,
        user_id,
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

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber();
    console.log("Generated invoice number:", invoiceNumber);

    // Save order to database
    let internalOrderId: number = 0;
    try {
      internalOrderId = await insertOrder({
        razorpay_order_id: order.id,
        user_id: user_id,
        membership_type: membership_type,
        amount: amount, // Keep original amount in rupees for database
        currency: order.currency,
        receipt: order.receipt,
        invoice_number: invoiceNumber,
        status: OrderStatus.CREATED,
        notes: {
          plan_id,
          plan_display_name: selectedPlan.displayName,
          terms_acceptance_id,
          terms_accepted_at: termsAcceptance.accepted_at,
          terms_version: termsAcceptance.terms_version,
          terms_hash: termsAcceptance.terms_hash,
        },
        razorpay_create_order_response: order,
      });
      console.log("Order saved to database successfully:", internalOrderId);
      if (internalOrderId > 0) {
        await linkMembershipTermsAcceptanceToOrder(
          Number(terms_acceptance_id),
          internalOrderId,
          order.id
        );
      }
    } catch (dbError) {
      console.error("Failed to save order to database:", dbError);
      // Don't fail the request if database save fails, as the order was created in Razorpay
    }

    return NextResponse.json({
      orderId: order.id, // Return Razorpay order ID for frontend compatibility
      internalOrderId: internalOrderId, // Return internal auto-increment ID
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      invoiceNumber: invoiceNumber,
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
