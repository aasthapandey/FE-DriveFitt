import { NextRequest, NextResponse } from "next/server";
import { submitEnquiry } from "@/lib/enquiryService";
import { EnquirySubmission } from "@/types/enquiry";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EnquirySubmission;
    const result = await submitEnquiry(body);

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted.",
        data: result,
      },
      { status: result.duplicate ? 200 : 201 },
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
