import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { ContactUsFormData } from "@/types/database";

export async function POST(request: NextRequest) {
  try {
    const body: ContactUsFormData = await request.json();

    // Validate required fields
    console.log(body);
    console.log("dadadasaddsadsasdadad");

    // Insert into database
    const query = `
      INSERT INTO contact_us (first_name, last_name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      body.first_name,
      body.last_name,
      body.email,
      body.phone || null,
      body.message,
    ];

    const a = await executeQuery(query, params);
    console.log(a);
    console.log("dadadasaddsads");

    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
