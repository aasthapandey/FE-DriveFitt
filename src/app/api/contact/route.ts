import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { ContactUsFormData } from "@/types/database";
import { sendContactFormEmail } from "@/utils/brevo";

export async function POST(request: NextRequest) {
  try {
    const body: ContactUsFormData = await request.json();

    // Send email notification via Brevo asynchronously (don't await)
    sendContactFormEmail(body)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((emailError) => {
        console.error("Error sending email notification:", emailError);
      });

    // Try to insert into database
    try {
      const query = `
        INSERT INTO contact_us (first_name, last_name, email, phone, message)
        VALUES (?, ?, ?, ?, ?)
      `;

      const params = [
        body.first_name || null,
        body.last_name || null,
        body.email || null,
        body.phone || null,
        body.message || null,
      ];

      await executeQuery(query, params);
      console.log("Database record created successfully");
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Continue even if database insert fails
    }

    // Return response immediately without waiting for email to complete
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
