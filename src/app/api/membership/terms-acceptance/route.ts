import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getMembershipPlanById } from "@/config/membershipPlans";
import { termsData } from "@/data/terms";
import { jwtService } from "@/lib/jwtService";
import {
  createMembershipTermsAcceptancesTable,
  insertMembershipTermsAcceptance,
} from "@/lib/paymentDatabase";

const TERMS_URL = "/api/download/terms";
const TERMS_VERSION = "terms-2025";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization token required." },
        { status: 401 }
      );
    }

    const decoded = jwtService.verifyToken(authHeader.substring(7));
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as { planId?: string };
    const plan = getMembershipPlanById(body.planId);
    if (!plan) {
      return NextResponse.json(
        { success: false, message: "Invalid membership plan." },
        { status: 400 }
      );
    }

    const termsSnapshot = termsData.policySection?.htmlContent || "";
    const termsHash = crypto
      .createHash("sha256")
      .update(termsSnapshot)
      .digest("hex");
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;
    const acceptedAt = new Date();

    await createMembershipTermsAcceptancesTable();
    const acceptanceId = await insertMembershipTermsAcceptance({
      user_id: decoded.user_id,
      plan_id: plan.id,
      plan_display_name: plan.displayName,
      membership_type: plan.membershipType,
      base_amount: plan.pricing.base,
      gst_amount: plan.pricing.gst,
      total_amount: plan.pricing.total,
      currency: "INR",
      accepted_at: acceptedAt,
      terms_url: TERMS_URL,
      terms_version: TERMS_VERSION,
      terms_snapshot: termsSnapshot,
      terms_hash: termsHash,
      ip_address: ipAddress,
      user_agent: request.headers.get("user-agent"),
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          acceptanceId,
          acceptedAt: acceptedAt.toISOString(),
          termsVersion: TERMS_VERSION,
          termsHash,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error recording membership terms acceptance:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to record terms acceptance.",
      },
      { status: 500 }
    );
  }
}
