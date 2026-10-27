import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { executeQuery } from "@/lib/database";
import {
  ENQUIRY_ADMIN_COOKIE,
  ENQUIRY_ADMIN_SESSION_SECONDS,
  getEnquiryAdminSession,
  sendEnquiryAdminOtp,
  verifyEnquiryAdminToken,
  verifyEnquiryAdminOtp,
} from "@/lib/enquiryAdminService";

export const runtime = "nodejs";
export const preferredRegion = "bom1";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

interface LeadRow {
  id: number | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  gender: string | null;
  enquiry_type: string | null;
  source_label: string | null;
  submitted_at: Date | string | null;
  crm_status: string | null;
  filtered_total: number;
  stats_total: number;
  stats_today: number;
  stats_needs_sync: number;
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

const csvCell = (value: unknown) => {
  let text = value instanceof Date ? value.toISOString() : String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};

const listLeads = async (
  request: NextRequest,
  admin: { adminId: number; phone: string },
) => {
  const filters = parseFilters(request);
  const where = buildWhere(filters);
  const requestedPage = Number(request.nextUrl.searchParams.get("page"));
  const page = Number.isFinite(requestedPage)
    ? Math.min(100000, Math.max(1, Math.floor(requestedPage)))
    : 1;
  const pageSize = Math.min(
    100,
    Math.max(10, Number(request.nextUrl.searchParams.get("pageSize")) || 25),
  );
  const offset = (page - 1) * pageSize;

  const rows = await executeQuery<LeadRow[]>(
    `WITH authorized AS (
       SELECT id
       FROM enquiry_admin_users
       WHERE id = ? AND phone = ? AND active = TRUE
       LIMIT 1
     ),
     filtered_leads AS (
       SELECT e.id, e.name, p.phone, e.email, e.gender, e.enquiry_type,
              e.source_label, e.submitted_at,
              COALESCE(cs.status, 'not_started') AS crm_status
       FROM authorized a
       CROSS JOIN enquiries e
       INNER JOIN enquiry_prospects p ON p.id = e.prospect_id
       LEFT JOIN enquiry_crm_sync cs ON cs.enquiry_id = e.id
       ${where.sql}
     ),
     dashboard_stats AS (
       SELECT
         (SELECT COUNT(*) FROM filtered_leads) AS filtered_total,
         (SELECT COUNT(*) FROM enquiries) AS stats_total,
         (SELECT COALESCE(SUM(DATE(e2.submitted_at) = CURDATE()), 0)
          FROM enquiries e2) AS stats_today,
         (SELECT COUNT(*)
          FROM enquiries e3
          LEFT JOIN enquiry_crm_sync cs3 ON cs3.enquiry_id = e3.id
          WHERE COALESCE(cs3.status, 'not_started') <> 'synced') AS stats_needs_sync
       FROM authorized
     ),
     paged_leads AS (
       SELECT *
       FROM filtered_leads
       ORDER BY submitted_at DESC
       LIMIT ? OFFSET ?
     )
     SELECT s.filtered_total, s.stats_total, s.stats_today, s.stats_needs_sync,
            p.id, p.name, p.phone, p.email, p.gender, p.enquiry_type,
            p.source_label, p.submitted_at, p.crm_status
     FROM dashboard_stats s
     LEFT JOIN paged_leads p ON TRUE
     ORDER BY p.submitted_at DESC`,
    [admin.adminId, admin.phone, ...where.params, pageSize, offset],
  );

  if (!rows[0]) {
    return NextResponse.json(
      { success: false, message: "Authentication required." },
      { status: 401, headers: noStoreHeaders },
    );
  }

  const stats = rows[0];
  const leads = rows.filter(
    (row): row is LeadRow & { id: number } => row.id !== null,
  );

  return NextResponse.json(
    {
      success: true,
      data: {
        leads: leads.map((row) => ({
          id: row.id,
          name: row.name || "",
          phone: row.phone || "",
          email: row.email || "",
          gender: row.gender || "",
          enquiryType: row.enquiry_type || "",
          source: row.source_label || "",
          submittedAt: row.submitted_at,
          crmStatus: row.crm_status || "not_started",
        })),
        pagination: { page, pageSize, total: Number(stats.filtered_total || 0) },
        summary: {
          total: Number(stats.stats_total || 0),
          today: Number(stats.stats_today || 0),
          needsSync: Number(stats.stats_needs_sync || 0),
        },
      },
    },
    { headers: noStoreHeaders },
  );
};

const exportLeads = async (
  request: NextRequest,
  admin: { adminId: number; phone: string },
) => {
  const where = buildWhere(parseFilters(request));
  const rows = await executeQuery<LeadRow[]>(
    `WITH authorized AS (
       SELECT id
       FROM enquiry_admin_users
       WHERE id = ? AND phone = ? AND active = TRUE
       LIMIT 1
     )
     SELECT e.id, e.name, p.phone, e.email, e.gender, e.enquiry_type,
            e.source_label, e.submitted_at,
            COALESCE(cs.status, 'not_started') AS crm_status,
            0 AS filtered_total, 0 AS stats_total, 0 AS stats_today,
            0 AS stats_needs_sync
     FROM authorized a
     CROSS JOIN enquiries e
     INNER JOIN enquiry_prospects p ON p.id = e.prospect_id
     LEFT JOIN enquiry_crm_sync cs ON cs.enquiry_id = e.id
     ${where.sql}
     ORDER BY e.submitted_at DESC
     LIMIT 5000`,
    [admin.adminId, admin.phone, ...where.params],
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
    const token = request.cookies.get(ENQUIRY_ADMIN_COOKIE)?.value;
    const tokenPayload = verifyEnquiryAdminToken(token);
    if (!tokenPayload) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401, headers: noStoreHeaders },
      );
    }

    const view = request.nextUrl.searchParams.get("view") || "session";
    if (view === "list") return listLeads(request, tokenPayload);
    if (view === "export") return exportLeads(request, tokenPayload);
    const admin = await getEnquiryAdminSession(token);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401, headers: noStoreHeaders },
      );
    }
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
