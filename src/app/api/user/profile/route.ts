import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { jwtService } from "@/lib/jwtService";
import { User } from "@/types/auth";

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization token required.",
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = jwtService.verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token.",
        },
        { status: 401 }
      );
    }

    // Get user data
    const userQuery = `
      SELECT 
        id, 
        first_name, 
        last_name, 
        email, 
        phone, 
        date_of_birth 
      FROM users 
      WHERE id = ?
    `;
    const userResult = await executeQuery<any[]>(userQuery, [decoded.user_id]);
    const user = userResult?.[0];

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Get active membership data
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

    const membershipResult = await executeQuery<any[]>(membershipQuery, [
      decoded.user_id,
    ]);
    const membership = membershipResult?.[0];

    const fullName =
      `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User";

    // Format membership type name
    const getMembershipTypeName = (type: number): string => {
      switch (type) {
        case 1:
          return "Individual Annual Plan";
        case 2:
          return "Family Annual Plan";
        default:
          return "Unknown Plan";
      }
    };

    const userData: User = {
      id: user.id,
      name: fullName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.date_of_birth,
      hasMembership: !!membership,
      membershipInfo: membership
        ? {
            id: membership.id,
            membershipType: membership.membership_type,
            status: membership.status,
            expiresAt: membership.expires_at,
          }
        : undefined,
    };

    return NextResponse.json(
      {
        success: true,
        data: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in get user profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
