import { NextRequest, NextResponse } from "next/server";
import { createEnquiryOtpChallenge } from "@/lib/enquiryService";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      phone?: string;
      consentAccepted?: boolean;
    };
    const result = await createEnquiryOtpChallenge({
      phoneInput: body.phone || "",
      consentAccepted: body.consentAccepted === true,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent on WhatsApp.",
      data: result,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    const status =
      code === "RATE_LIMITED"
        ? 429
        : code === "OTP_DELIVERY_FAILED"
          ? 502
          : ["INVALID_PHONE", "CONSENT_REQUIRED"].includes(code)
            ? 400
            : 500;
    const message =
      code === "INVALID_PHONE"
        ? "Enter a valid 10-digit mobile number."
        : code === "CONSENT_REQUIRED"
          ? "Accept the Terms & Conditions to continue."
          : code === "RATE_LIMITED"
            ? "Too many OTP requests. Please try again later."
            : code === "OTP_DELIVERY_FAILED"
              ? "We could not send the OTP. Please try again."
              : "Unable to send OTP.";

    if (!["INVALID_PHONE", "CONSENT_REQUIRED", "RATE_LIMITED", "OTP_DELIVERY_FAILED"].includes(code)) {
      console.error("Enquiry OTP send failed:", error);
    }
    return NextResponse.json({ success: false, message }, { status });
  }
}
