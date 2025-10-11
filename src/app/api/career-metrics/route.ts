import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET() {
  try {
    // Get all metrics in parallel for efficiency
    const [
      openPositionsResult,
      totalApplicationsResult,
      todayApplicationsResult,
      shortlistedCandidatesResult,
    ] = await Promise.all([
      // Open positions: Active job postings that are visible
      executeQuery<{ count: number }[]>(
        `SELECT COUNT(*) as count FROM job_postings WHERE status = 1 AND is_visible = 1`
      ),

      // Total applications: All applications
      executeQuery<{ count: number }[]>(
        `SELECT COUNT(*) as count FROM applications`
      ),

      // Today's applications: Applications created today
      executeQuery<{ count: number }[]>(
        `SELECT COUNT(*) as count FROM applications WHERE DATE(created_at) = CURDATE()`
      ),

      // Shortlisted candidates: Applications with status = 1 (SHORTLISTED)
      executeQuery<{ count: number }[]>(
        `SELECT COUNT(*) as count FROM applications WHERE status = 1`
      ),
    ]);

    const metrics = {
      openPositions: openPositionsResult[0]?.count || 0,
      totalApplications: totalApplicationsResult[0]?.count || 0,
      todayApplications: todayApplicationsResult[0]?.count || 0,
      shortlistedCandidates: shortlistedCandidatesResult[0]?.count || 0,
    };

    return NextResponse.json({
      status: true,
      data: metrics,
    });
  } catch (error) {
    console.error("Error fetching career metrics:", error);
    return NextResponse.json(
      {
        status: false,
        data: null,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
