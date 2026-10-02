import { NextResponse } from "next/server";
import { getActiveEnquirySources } from "@/lib/enquiryService";

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
