import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import {
  createEnquiryOtpChallenge,
  getActiveEnquirySources,
  submitEnquiry,
  verifyEnquiryOtpChallenge,
} from "@/lib/enquiryService";
import { EnquirySubmission } from "@/types/enquiry";

export const runtime = "nodejs";
export const preferredRegion = "bom1";
export const maxDuration = 15;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sources = await getActiveEnquirySources();
    return NextResponse.json(
      { success: true, data: sources },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Unable to load enquiry sources:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load enquiry sources." },
      { status: 500 },
    );
  }
}

const sendOtp = async (body: Record<string, unknown>) => {
  try {
    const result = await createEnquiryOtpChallenge({
      phoneInput: typeof body.phone === "string" ? body.phone : "",
      consentAccepted: body.consentAccepted === true,
      resend: body.resend === true,
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
    if (
      ![
        "INVALID_PHONE",
        "CONSENT_REQUIRED",
        "RATE_LIMITED",
        "OTP_DELIVERY_FAILED",
      ].includes(code)
    ) {
      console.error("Enquiry OTP send failed:", error);
    }
    return NextResponse.json({ success: false, message }, { status });
  }
};

const verifyOtp = async (request: NextRequest, body: Record<string, unknown>) => {
  try {
    const result = await verifyEnquiryOtpChallenge({
      consentToken:
        typeof body.consentToken === "string" ? body.consentToken : "",
      phoneInput: typeof body.phone === "string" ? body.phone : "",
      otp: typeof body.otp === "string" ? body.otp : "",
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
};

export async function POST(request: NextRequest) {
  const startedAt = performance.now();
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  if (body.action === "send_otp") return sendOtp(body);
  if (body.action === "verify_otp") return verifyOtp(request, body);

  try {
    const submission = await submitEnquiry(body as unknown as EnquirySubmission);
    if (submission.backgroundSync) {
      waitUntil(submission.backgroundSync());
    }
    const result = submission.result;
    const durationMs = performance.now() - startedAt;
    console.info("Enquiry submission completed", {
      enquiryId: result.enquiryId,
      duplicate: result.duplicate,
      durationMs: Math.round(durationMs),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted.",
        data: result,
      },
      {
        status: result.duplicate ? 200 : 201,
        headers: { "Server-Timing": `submit;dur=${durationMs.toFixed(1)}` },
      },
    );
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    const known: Record<string, string> = {
      INVALID_SUBMISSION: "Please check the form and try again.",
      VERIFICATION_REQUIRED: "Mobile verification expired. Please verify again.",
      INVALID_SOURCE: "Select a valid lead source.",
    };
    if (!known[code]) console.error("Enquiry submission failed:", error);
    const status = code === "VERIFICATION_REQUIRED" ? 401 : known[code] ? 400 : 500;
    return NextResponse.json(
      { success: false, message: known[code] || "Unable to submit your enquiry." },
      { status },
    );
  }
}
