import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import {
  Application,
  ApplicationStatus,
  ApplicationFormData,
} from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const jobId = searchParams.get("job_id");

    let whereConditions = ["1=1"];
    let queryParams: any[] = [];

    if (status !== null) {
      whereConditions.push("a.status = ?");
      queryParams.push(parseInt(status));
    }

    if (jobId) {
      whereConditions.push("a.job_id = ?");
      queryParams.push(parseInt(jobId));
    }

    const query = `
      SELECT 
        a.id,
        a.candidate_name,
        a.email,
        a.phone,
        a.job_id,
        a.status,
        a.created_at,
        a.updated_at,
        jp.title as job_title,
        d.id as dept_id,
        d.name as dept_name
      FROM applications a
      LEFT JOIN job_postings jp ON a.job_id = jp.id
      LEFT JOIN departments d ON jp.department_id = d.id
      WHERE ${whereConditions.join(" AND ")}
      ORDER BY a.created_at DESC
    `;

    const result = await executeQuery<any[]>(query, queryParams);

    const applications: Application[] = result.map((row) => ({
      id: row.id,
      candidate_name: row.candidate_name,
      email: row.email,
      phone: row.phone,
      job_id: row.job_id,
      status: row.status as ApplicationStatus,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      job: {
        id: row.job_id,
        title: row.job_title,
        department: row.dept_id
          ? {
              id: row.dept_id,
              name: row.dept_name,
            }
          : undefined,
      },
    }));

    return NextResponse.json(
      {
        status: true,
        data: { applications },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const candidate_name = formData.get("candidate_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const job_id = formData.get("job_id") as string;
    const resume = formData.get("resume") as File;

    if (!candidate_name || !email || !job_id) {
      return NextResponse.json(
        { error: "Missing required fields: candidate_name, email, job_id" },
        { status: 400 }
      );
    }

    const jobId = parseInt(job_id);
    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job_id" }, { status: 400 });
    }

    let resumeBuffer: Buffer | null = null;
    if (resume && resume.size > 0) {
      const arrayBuffer = await resume.arrayBuffer();
      resumeBuffer = Buffer.from(arrayBuffer);
    }

    const query = `
      INSERT INTO applications (candidate_name, email, phone, job_id, resume)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [candidate_name, email, phone || null, jobId, resumeBuffer];

    const result = await executeQuery<{ insertId: number }>(query, params);

    return NextResponse.json(
      {
        status: true,
        data: {
          id: result.insertId,
          message: "Application submitted successfully",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
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
