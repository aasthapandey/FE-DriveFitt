import { NextRequest, NextResponse } from "next/server";
import { generateInvoicePDF, InvoiceData } from "@/utils/invoiceGenerator";
import fs from "fs";
import path from "path";

export async function GET(_request: NextRequest) {
  console.log("🧪 Test Invoice API endpoint called");

  try {
    // Create test invoice data
    const testInvoiceData: InvoiceData = {
      invoiceNumber: "DF20250103001",
      invoiceDate: "3/1/2025",
      customerName: "Test User",
      customerEmail: "test@example.com",
      amount: 999,
      membershipType: "Individual Annual Plan",
      paymentId: "test_payment_123",
      orderId: "test_order_123",
    };

    console.log("📄 Generating test invoice with data:", testInvoiceData);

    // Generate the PDF
    const doc = generateInvoicePDF(testInvoiceData);

    // Create a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `test-invoice-${timestamp}.pdf`;

    // Save to public directory for easy access
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, filename);

    // Convert PDF to buffer and save
    const pdfBuffer = doc.output("arraybuffer");
    fs.writeFileSync(filePath, Buffer.from(pdfBuffer));

    console.log("✅ Test invoice generated and saved:", filePath);

    return NextResponse.json({
      success: true,
      message: "Test invoice generated successfully",
      filename: filename,
      filePath: filePath,
      downloadUrl: `/public/${filename}`,
      invoiceData: testInvoiceData,
    });
  } catch (error) {
    console.error("❌ Error generating test invoice:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate test invoice",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
