import { NextRequest, NextResponse } from "next/server";
import { smsService } from "@/lib/smsService";
import { otpService } from "@/lib/otpService";
import { SendOTPRequest, AuthResponse, OTPPurpose } from "@/types/auth";

// Use Node.js runtime for database operations
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body: SendOTPRequest = await request.json();
    const { phone, purpose } = body;

    // Validate phone number
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message:
            "Invalid phone number. Please enter a valid 10-digit mobile number.",
        },
        { status: 400 }
      );
    }

    // Validate purpose
    if (!Object.values(OTPPurpose).includes(purpose)) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid purpose specified.",
        },
        { status: 400 }
      );
    }

    // Step 1: Generate OTP and store in database (server-side only)
    const dbResult = await otpService.generateAndStoreOTP(phone, purpose);
    
    if (!dbResult.success || !dbResult.otp) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Failed to generate OTP. Please try again.",
        },
        { status: 500 }
      );
    }

    // Step 2: Send OTP via WhatsApp (server-side only)
    const smsResult = await smsService.sendOTP(phone, dbResult.otp);

    // Step 3: Update vendor response in database
    if (dbResult.otpId) {
      await otpService.updateVendorResponse(dbResult.otpId, smsResult);
    }

    if (smsResult.success) {
      return NextResponse.json<AuthResponse>(
        {
          success: true,
          message: "OTP sent successfully to your mobile number.",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Failed to send OTP. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in sendOTP:", error);
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        message: "Internal server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
