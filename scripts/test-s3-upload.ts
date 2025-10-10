/*
  Test script to verify S3 upload functionality
  Run with: npm run test:s3
*/

import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env") });

import { s3Service } from "../src/lib/s3Service";
import { generateInvoiceBuffer } from "../src/utils/invoiceGenerator";

async function testS3Upload() {
  console.log("🧪 Testing S3 upload...");

  try {
    // Generate a test invoice
    console.log("📄 Generating test invoice...");
    const invoiceData = {
      invoiceNumber: `TEST-${Date.now()}`,
      invoiceDate: new Date().toLocaleDateString("en-IN"),
      customerName: "Test User",
      customerEmail: "test@example.com",
      customerPhone: "8882311619",
      amount: 999.0,
      membershipType: "Individual Annual Plan",
      paymentId: "pay_TEST123",
      orderId: "order_TEST123",
    };

    const invoiceBuffer = generateInvoiceBuffer(invoiceData);
    console.log("✅ Invoice generated, size:", invoiceBuffer.length, "bytes");

    // Upload to S3
    console.log("☁️ Uploading to S3...");
    const result = await s3Service.uploadInvoice(
      invoiceBuffer,
      invoiceData.invoiceNumber
    );

    if (result.success) {
      console.log("✅ S3 upload successful!");
      console.log("URL:", result.url);
    } else {
      console.error("❌ S3 upload failed:", result.error);
    }
  } catch (error) {
    console.error("❌ S3 test error:", error);
  }
}

testS3Upload().catch(console.error);
