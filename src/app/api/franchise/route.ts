import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { FranchiseFormData } from "@/types/database";

export async function POST(request: NextRequest) {
  try {
    const body: FranchiseFormData = await request.json();

    // Insert into database
    const query = `
      INSERT INTO franchise_inquiries (
        business_name, contact_person, email, phone, location, 
        city, state, investment_capacity, experience_years, 
        business_background, why_franchise, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;

    const params = [
      body.business_name || null,
      body.contact_person,
      body.email,
      body.phone,
      body.location || null,
      body.city || null,
      body.state || null,
      body.investment_capacity || null,
      body.experience_years || null,
      body.business_background || null,
      body.why_franchise || null,
    ];

    await executeQuery(query, params);

    return NextResponse.json(
      { success: true, message: "Franchise inquiry submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting franchise inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
