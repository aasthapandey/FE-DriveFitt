import { NextRequest, NextResponse } from "next/server";
import { initializePaymentDatabase } from "@/lib/paymentDatabase";

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Initializing payment database tables...");

    await initializePaymentDatabase();

    console.log("✅ Payment database tables initialized successfully");

    return NextResponse.json({
      success: true,
      message: "Payment database tables initialized successfully",
      tables: ["orders", "payments", "memberships"],
    });
  } catch (error) {
    console.error("❌ Failed to initialize payment database:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize payment database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
