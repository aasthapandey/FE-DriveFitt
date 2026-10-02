import { NextRequest, NextResponse } from "next/server";
import { verifyEnquiryOtpChallenge } from "@/lib/enquiryService";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      consentToken?: string;
      phone?: string;
      otp?: string;
    };
    const result = await verifyEnquiryOtpChallenge({
      consentToken: body.consentToken || "",
      phoneInput: body.phone || "",
      otp: body.otp || "",
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        null,
      userAgent: request.headers.get("user-agent"),
    });
    return NextResponse.json({
      success: true,
      message: "Mobile number verified.",
      data: result,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    const isInvalidOtp = code === "INVALID_OTP";
    if (!isInvalidOtp) console.error("Enquiry OTP verification failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: isInvalidOtp
          ? "The OTP is invalid or has expired."
          : "Unable to verify OTP. Please try again.",
      },
      { status: isInvalidOtp ? 400 : 500 },
    );
  }
}
