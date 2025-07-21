import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { FranchiseFormData } from "@/types/database";
import { sendFranchiseFormEmail } from "@/utils/brevo";

export async function POST(request: NextRequest) {
  try {
    const body: FranchiseFormData = await request.json();

    // Send email notification via Brevo asynchronously (don't await)
    sendFranchiseFormEmail(body)
      .then(() => {
        console.log("Franchise email sent successfully");
      })
      .catch((emailError) => {
        console.error(
          "Error sending franchise email notification:",
          emailError
        );
      });

    // Try to insert into database
    try {
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
        body.contact_person || null,
        body.email || null,
        body.phone || null,
        body.location || null,
        body.city || null,
        body.state || null,
        body.investment_capacity || null,
        body.experience_years || null,
        body.business_background || null,
        body.why_franchise || null,
      ];

      await executeQuery(query, params);
      console.log("Franchise database record created successfully");
    } catch (dbError) {
      console.error("Franchise database error:", dbError);
      // Continue even if database insert fails
    }

    // Return response immediately without waiting for email to complete
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
