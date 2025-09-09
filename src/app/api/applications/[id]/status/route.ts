import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { ApplicationStatus } from "@/types/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const applicationId = parseInt(params.id);

    if (isNaN(applicationId)) {
      return NextResponse.json(
        { error: "Invalid application ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (
      status === undefined ||
      !Object.values(ApplicationStatus).includes(status)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid status. Must be one of: 0 (new), 1 (in review), 2 (rejected), 3 (shortlisted)",
        },
        { status: 400 }
      );
    }

    const query = `
      UPDATE applications 
      SET status = ?
      WHERE id = ?
    `;

    const result = await executeQuery<{ affectedRows: number }>(query, [
      status,
      applicationId,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        data: {
          message: "Application status updated successfully",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application status:", error);
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
