import { NextRequest, NextResponse } from "next/server";
import { otpService } from "@/lib/otpService";
// import { rateLimitService } from "@/lib/rateLimitService";
import { SendOTPRequest, AuthResponse, OTPPurpose } from "@/types/auth";

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

    // Rate limiting check
    // const canSendOTP = await rateLimitService.canSendOTP(phone);
    // if (!canSendOTP) {
    //   const count = await rateLimitService.getOTPCountLastHour(phone);
    //   return NextResponse.json<AuthResponse>(
    //     {
    //       success: false,
    //       message: `Too many OTP requests. You have requested ${count} OTPs in the last hour. Please try again after 1 hour.`,
    //     },
    //     { status: 429 }
    //   );
    // }

    const success = await otpService.sendOTP(phone, purpose);

    if (success) {
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
