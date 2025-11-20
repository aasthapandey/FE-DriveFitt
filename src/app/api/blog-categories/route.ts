import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

interface BlogCategoryRow {
  id: number;
  heading: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function GET() {
  try {
    const rows = await executeQuery<BlogCategoryRow[]>(
      `SELECT id, heading, status, created_at, updated_at FROM blog_category ORDER BY id DESC`
    );
    return NextResponse.json({ status: true, data: rows });
  } catch {
    return NextResponse.json(
      { status: false, error: "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const heading: string = body.heading;
    const status: string = body.status ?? "active";
    if (!heading) {
      return NextResponse.json(
        { status: false, error: "heading is required" },
        { status: 400 }
      );
    }
    interface InsertResult {
      insertId: number;
    }

    const result = await executeQuery<InsertResult>(
      `INSERT INTO blog_category (heading, status) VALUES (?, ?)`,
      [heading, status]
    );
    const insertedId = result?.insertId;
    if (!insertedId) {
      return NextResponse.json(
        { status: false, error: "Failed to create category" },
        { status: 500 }
      );
    }
    const rows = await executeQuery<BlogCategoryRow[]>(
      `SELECT id, heading, status, created_at, updated_at FROM blog_category WHERE id = ?`,
      [insertedId]
    );
    const row = rows[0];
    return NextResponse.json({ status: true, data: row }, { status: 201 });
  } catch {
    return NextResponse.json(
      { status: false, error: "Failed to create" },
      { status: 500 }
    );
  }
}
