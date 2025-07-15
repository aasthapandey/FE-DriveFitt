import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET() {
  try {
    // Test the database connection
    const result = await executeQuery("SELECT 1 as test");

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: result,
    });
  } catch (error) {
    console.error("Database connection test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
