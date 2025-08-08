import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { FranchiseFormData } from "@/types/database";
import { sendFranchiseFormEmail } from "@/utils/brevo";

export async function POST(request: NextRequest) {
  try {
    const body: FranchiseFormData = await request.json();

    // Handle database and email operations asynchronously
    Promise.allSettled([
      // Database operation
      (async () => {
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
          console.log("Franchise inquiry database record created successfully");
        } catch (dbError) {
          console.error("Franchise inquiry database error:", dbError);
        }
      })(),

      // Email operation
      (async () => {
        try {
          await sendFranchiseFormEmail(body);
          console.log("Franchise inquiry email sent successfully");
        } catch (emailError) {
          console.error(
            "Error sending franchise inquiry email notification:",
            emailError
          );
        }
      })(),
    ]).catch((error) => {
      console.error("Error in background operations:", error);
    });
    // Return success immediately
    const response = NextResponse.json(
      { success: true, message: "Franchise inquiry submitted successfully" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error("Error processing franchise inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
