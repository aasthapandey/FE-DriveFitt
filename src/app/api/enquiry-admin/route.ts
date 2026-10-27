import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { executeQuery } from "@/lib/database";
import {
  ENQUIRY_ADMIN_COOKIE,
  ENQUIRY_ADMIN_SESSION_SECONDS,
  getEnquiryAdminSession,
  sendEnquiryAdminOtp,
  verifyEnquiryAdminOtp,
} from "@/lib/enquiryAdminService";

export const runtime = "nodejs";
export const preferredRegion = "bom1";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

interface LeadRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: string;
  enquiry_type: string;
  source_label: string;
  submitted_at: Date | string;
  crm_status: string;
}

const noStoreHeaders = { "Cache-Control": "private, no-store, max-age=0" };

const parseFilters = (request: NextRequest) => {
  const search = (request.nextUrl.searchParams.get("search") || "").trim().slice(0, 100);
  const from = request.nextUrl.searchParams.get("from") || "";
  const to = request.nextUrl.searchParams.get("to") || "";
  const validDate = /^\d{4}-\d{2}-\d{2}$/;
  return {
    search,
    from: validDate.test(from) ? from : "",
    to: validDate.test(to) ? to : "",
  };
};

const buildWhere = (filters: ReturnType<typeof parseFilters>) => {
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  if (filters.search) {
    clauses.push("(e.name LIKE ? OR e.email LIKE ? OR p.phone LIKE ?)");
    const value = `%${filters.search}%`;
    params.push(value, value, value);
  }
  if (filters.from) {
    clauses.push("e.submitted_at >= ?");
    params.push(`${filters.from} 00:00:00`);
  }
  if (filters.to) {
    clauses.push("e.submitted_at < DATE_ADD(?, INTERVAL 1 DAY)");
    params.push(`${filters.to} 00:00:00`);
  }
  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", params };
};

const leadSelect = `
  SELECT e.id, e.name, p.phone, e.email, e.gender, e.enquiry_type,
         e.source_label, e.submitted_at,
         COALESCE(cs.status, 'not_started') AS crm_status
  FROM enquiries e
  INNER JOIN enquiry_prospects p ON p.id = e.prospect_id
  LEFT JOIN enquiry_crm_sync cs ON cs.enquiry_id = e.id`;

const csvCell = (value: unknown) => {
  let text = value instanceof Date ? value.toISOString() : String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};

const listLeads = async (request: NextRequest) => {
  const filters = parseFilters(request);
  const where = buildWhere(filters);
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1);
  const pageSize = Math.min(
    100,
    Math.max(10, Number(request.nextUrl.searchParams.get("pageSize")) || 25),
  );
  const offset = (page - 1) * pageSize;

  const [rows, counts, summary] = await Promise.all([
    executeQuery<LeadRow[]>(
      `${leadSelect} ${where.sql} ORDER BY e.submitted_at DESC LIMIT ? OFFSET ?`,
      [...where.params, pageSize, offset],
    ),
    executeQuery<Array<{ total: number }>>(
      `SELECT COUNT(*) AS total
       FROM enquiries e
       INNER JOIN enquiry_prospects p ON p.id = e.prospect_id
       ${where.sql}`,
      where.params,
    ),
    executeQuery<Array<{ total: number; today: number; needs_sync: number }>>(
      `SELECT COUNT(*) AS total,
              SUM(DATE(e.submitted_at) = CURDATE()) AS today,
              SUM(COALESCE(cs.status, 'not_started') <> 'synced') AS needs_sync
       FROM enquiries e
       LEFT JOIN enquiry_crm_sync cs ON cs.enquiry_id = e.id`,
    ),
  ]);

  return NextResponse.json(
    {
      success: true,
      data: {
        leads: rows.map((row) => ({
          id: row.id,
          name: row.name,
          phone: row.phone,
          email: row.email,
          gender: row.gender,
          enquiryType: row.enquiry_type,
          source: row.source_label,
          submittedAt: row.submitted_at,
          crmStatus: row.crm_status,
        })),
        pagination: { page, pageSize, total: Number(counts[0]?.total || 0) },
        summary: {
          total: Number(summary[0]?.total || 0),
          today: Number(summary[0]?.today || 0),
          needsSync: Number(summary[0]?.needs_sync || 0),
        },
      },
    },
    { headers: noStoreHeaders },
  );
};

const exportLeads = async (request: NextRequest) => {
  const where = buildWhere(parseFilters(request));
  const rows = await executeQuery<LeadRow[]>(
    `${leadSelect} ${where.sql} ORDER BY e.submitted_at DESC LIMIT 5000`,
    where.params,
  );
  const headings = [
    "Submitted at",
    "Name",
    "Contact number",
    "Email",
    "Gender",
    "Enquiry type",
    "Lead source",
    "YoActiv status",
  ];
  const lines = [
    headings.map(csvCell).join(","),
    ...rows.map((row) =>
      [
        row.submitted_at,
        row.name,
        row.phone,
        row.email,
        row.gender,
        row.enquiry_type,
        row.source_label,
        row.crm_status,
      ]
        .map(csvCell)
        .join(","),
    ),
  ];
  return new NextResponse(`\uFEFF${lines.join("\r\n")}`, {
    headers: {
      ...noStoreHeaders,
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="drivefitt-enquiries-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
};

export async function GET(request: NextRequest) {
  try {
    const admin = await getEnquiryAdminSession(
      request.cookies.get(ENQUIRY_ADMIN_COOKIE)?.value,
    );
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401, headers: noStoreHeaders },
      );
    }

    const view = request.nextUrl.searchParams.get("view") || "session";
    if (view === "list") return listLeads(request);
    if (view === "export") return exportLeads(request);
    return NextResponse.json(
      { success: true, data: { admin } },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    console.error("Enquiry admin request failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load the dashboard." },
      { status: 500, headers: noStoreHeaders },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const action = typeof body.action === "string" ? body.action : "";
  if (action === "logout") {
    const response = NextResponse.json(
      { success: true, message: "Signed out." },
      { headers: noStoreHeaders },
    );
    response.cookies.set(ENQUIRY_ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  }

  try {
    const phone = typeof body.phone === "string" ? body.phone : "";
    if (action === "send_otp") {
      const recordDelivery = await sendEnquiryAdminOtp(phone);
      waitUntil(recordDelivery());
      return NextResponse.json(
        { success: true, message: "OTP sent on WhatsApp." },
        { headers: noStoreHeaders },
      );
    }
    if (action === "verify_otp") {
      const otp = typeof body.otp === "string" ? body.otp : "";
      const result = await verifyEnquiryAdminOtp(phone, otp);
      const response = NextResponse.json(
        { success: true, message: "Signed in.", data: { admin: result.admin } },
        { headers: noStoreHeaders },
      );
      response.cookies.set(ENQUIRY_ADMIN_COOKIE, result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: ENQUIRY_ADMIN_SESSION_SECONDS,
      });
      return response;
    }
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400, headers: noStoreHeaders },
    );
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    if (!["UNAUTHORIZED", "INVALID_OTP", "OTP_DELIVERY_FAILED"].includes(code)) {
      console.error("Enquiry admin authentication failed:", error);
    }
    const message =
      code === "INVALID_OTP"
        ? "The OTP is invalid or has expired."
        : code === "OTP_DELIVERY_FAILED"
          ? "We could not send the OTP. Please try again."
          : "Unable to sign in with this mobile number.";
    return NextResponse.json(
      { success: false, message },
      { status: code === "OTP_DELIVERY_FAILED" ? 502 : 401, headers: noStoreHeaders },
    );
  }
}
