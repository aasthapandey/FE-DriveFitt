import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");

    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        o.id, 
        o.razorpay_order_id, 
        o.amount, 
        o.status, 
        o.created_at, 
        CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) as user_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE 1=1
    `;
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE 1=1
    `;
    const queryParams: (string | number)[] = [];

    if (search) {
      const searchCondition = ` AND (CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) LIKE ? OR o.razorpay_order_id LIKE ?)`;
      query += searchCondition;
      countQuery += searchCondition;
      const searchPattern = `%${search}%`;
      queryParams.push(searchPattern, searchPattern);
    }

    if (status && status !== "all") {
      query += ` AND o.status = '${status}'`;
      countQuery += ` AND o.status = '${status}'`;
    }

    query += ` ORDER BY o.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const payments = await executeQuery<any[]>(query, queryParams);
    const totalResults = await executeQuery<{ total: number }[]>(
      countQuery,
      queryParams.slice(0, queryParams.length - 2)
    );

    const total = totalResults[0].total;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      status: true,
      data: payments,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { status: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
