import { NextResponse } from "next/server";
import { initializePaymentDatabase } from "@/lib/paymentDatabase";

export async function POST() {
  try {
    // Initialize payment database tables
    await initializePaymentDatabase();

    return NextResponse.json({
      success: true,
      message: "Payment database tables initialized successfully",
    });
  } catch (error) {
    console.error("Database initialization failed:", error);
    return NextResponse.json(
      {
        error: "Database initialization failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
