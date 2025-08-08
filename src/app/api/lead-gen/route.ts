import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { sendLeadGenFormEmail } from "@/utils/brevo";

interface LeadGenFormData {
  name: string;
  phone: string;
  message?: string;
  interests: {
    cricket: number;
    fitness: number;
    recovery: number;
    running: number;
    pilates: number;
    personalTraining: number;
    physiotherapy: number;
    groupClasses: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadGenFormData = await request.json();

    // Send email notification via Brevo asynchronously (don't await)
    sendLeadGenFormEmail(body)
      .then(() => {
        console.log("Lead gen email sent successfully");
      })
      .catch((emailError) => {
        console.error("Error sending lead gen email notification:", emailError);
      });

    // Try to insert into database
    try {
      const query = `
        INSERT INTO lead_generation (
          name, phone, message, 
          cricket, fitness, recovery, running, 
          pilates, personal_training, physiotherapy, group_classes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        body.name || null,
        body.phone || null,
        body.message || null,
        body.interests.cricket || 0,
        body.interests.fitness || 0,
        body.interests.recovery || 0,
        body.interests.running || 0,
        body.interests.pilates || 0,
        body.interests.personalTraining || 0,
        body.interests.physiotherapy || 0,
        body.interests.groupClasses || 0,
      ];

      await executeQuery(query, params);
      console.log("Lead generation database record created successfully");
    } catch (dbError) {
      console.error("Lead generation database error:", dbError);
      // Continue even if database insert fails
    }

    // Return response immediately without waiting for email to complete
    return NextResponse.json(
      { success: true, message: "Lead generation form submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting lead generation form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
