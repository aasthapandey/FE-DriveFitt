import { NextRequest, NextResponse } from "next/server";
import { otpService } from "@/lib/otpService";
import { VerifyOTPRequest, AuthResponse, OTPPurpose } from "@/types/auth";
import { executeQuery } from "@/lib/database";
import { jwtService } from "@/lib/jwtService";

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

    if (!/^\d{4}$/.test(otp)) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid OTP format. Please enter a 4-digit code.",
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
      // Check if user exists in database
      const userQuery = `
        SELECT id, first_name, last_name, email, phone, date_of_birth, created_at 
        FROM users 
        WHERE phone = ?
      `;

      const userResult = await executeQuery<any[]>(userQuery, [phone]);
      const user = userResult?.[0];
      console.log("user", user);

      if (user) {
        // User exists, generate JWT token and return user data
        const fullName =
          `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User";

        // Generate JWT token
        const token = jwtService.generateToken({
          user_id: user.id,
          phone: user.phone,
        });

        return NextResponse.json<AuthResponse>(
          {
            success: true,
            message: "OTP verified successfully. User found.",
            data: {
              token,
              user: {
                id: user.id,
                name: fullName,
                email: user.email,
                phone: user.phone,
                dateOfBirth: user.date_of_birth,
                hasMembership: false, // Will be checked separately
              },
            },
          },
          { status: 200 }
        );
      } else {
        // User doesn't exist, return success without user data
        return NextResponse.json<AuthResponse>(
          {
            success: true,
            message: "OTP verified successfully. User not found.",
          },
          { status: 200 }
        );
      }
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
