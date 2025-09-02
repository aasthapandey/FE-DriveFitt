import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId || isNaN(Number(userId))) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID.",
        },
        { status: 400 }
      );
    }

    // Check if user has active membership
    const membershipQuery = `
      SELECT 
        m.id,
        m.user_id,
        m.order_id,
        m.payment_id,
        m.membership_type,
        m.status,
        m.created_at,
        m.expires_at
      FROM memberships m
      WHERE m.user_id = ? 
        AND m.status = 'active' 
        AND m.expires_at > NOW()
      ORDER BY m.created_at DESC
      LIMIT 1
    `;

    const membershipResult = await executeQuery<
      Array<{
        id: number;
        user_id: number;
        order_id: string;
        payment_id: string;
        membership_type: number;
        status: string;
        created_at: string;
        expires_at: string;
      }>
    >(membershipQuery, [userId]);
    const membership = membershipResult?.[0];

    if (membership) {
      return NextResponse.json(
        {
          success: true,
          hasMembership: true,
          membershipInfo: {
            id: membership.id,
            userId: membership.user_id,
            orderId: membership.order_id,
            paymentId: membership.payment_id,
            membershipType: membership.membership_type,
            status: membership.status,
            createdAt: membership.created_at,
            expiresAt: membership.expires_at,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          hasMembership: false,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in checkMembership:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
