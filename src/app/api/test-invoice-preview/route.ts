import { NextRequest, NextResponse } from "next/server";
import { generateInvoiceBuffer } from "@/utils/invoiceGenerator";
import { MEMBERSHIP_PRICING } from "@/config/membershipPricing";

/**
 * TEST ENDPOINT - Generate a preview invoice PDF
 * Usage:
 *   Individual plan: GET /api/test-invoice-preview?type=individual
 *   Family plan:     GET /api/test-invoice-preview?type=family
 *
 * Remove this file before final production deployment.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "individual";

  const isFamily = type === "family";

  const invoiceData = {
    invoiceNumber: isFamily ? "INV-TEST-FAM-001" : "INV-TEST-IND-001",
    invoiceDate: new Date().toLocaleDateString("en-IN"),
    customerName: "Test Customer",
    customerEmail: "test@example.com",
    customerPhone: "9999999999",
    amount: isFamily ? MEMBERSHIP_PRICING.FAMILY.total : MEMBERSHIP_PRICING.INDIVIDUAL.total,
    membershipType: isFamily ? "Family Annual Plan" : "Individual Annual Plan",
    paymentId: "pay_testPaymentId123",
    orderId: "order_testOrderId456",
  };

  try {
    const pdfBuffer = generateInvoiceBuffer(invoiceData);

    return new NextResponse(pdfBuffer.buffer as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="test-invoice-${type}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Test invoice generation failed:", error);
    return NextResponse.json(
      {
        error: "Invoice generation failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
