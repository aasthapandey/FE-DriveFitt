import { NextRequest, NextResponse } from "next/server";
import { otpService } from "@/lib/otpService";
import { VerifyOTPRequest, AuthResponse, OTPPurpose } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const body: VerifyOTPRequest = await request.json();
    const { phone, otp, purpose } = body;

    // Validate inputs
    if (!phone || !otp || purpose === undefined) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Phone number, OTP, and purpose are required.",
        },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid phone number.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid OTP format. Please enter a 6-digit code.",
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

    const isValid = await otpService.verifyOTP(phone, otp, purpose);

    if (isValid) {
      return NextResponse.json<AuthResponse>(
        {
          success: true,
          message: "OTP verified successfully.",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid or expired OTP. Please try again.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        message: "Internal server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
