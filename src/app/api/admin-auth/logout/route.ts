import { NextResponse } from "next/server";

export async function POST() {
  try {
    // For JWT-based auth, logout is primarily handled on the client side
    // by removing the token from localStorage. This endpoint can be used
    // for additional cleanup if needed (like blacklisting tokens).

    // Optional: Add token to blacklist table for enhanced security
    // For now, we'll just return success as client-side token removal
    // is sufficient for basic logout functionality

    return NextResponse.json({
      status: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json(
      {
        status: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
