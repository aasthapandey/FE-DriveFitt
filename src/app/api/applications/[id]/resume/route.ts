import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(
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

    const query = `
      SELECT resume, candidate_name
      FROM applications
      WHERE id = ?
    `;

    const result = await executeQuery<any[]>(query, [applicationId]);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const application = result[0];

    if (!application.resume) {
      return NextResponse.json(
        { error: "No resume found for this application" },
        { status: 404 }
      );
    }

    const resumeBuffer = application.resume as Buffer;
    const candidateName = application.candidate_name.replace(/\s+/g, "_");

    return new NextResponse(resumeBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${candidateName}_resume.pdf"`,
        "Content-Length": resumeBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching application resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
