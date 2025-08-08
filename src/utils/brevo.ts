import * as SibApiV3Sdk from "@getbrevo/brevo";
import { ContactUsFormData, FranchiseFormData } from "@/types/database";

// Initialize Brevo API instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = process.env.BREVO_API_KEY;

// Set the API key for authentication
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  apiKey || ""
);

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

/**
 * Send a contact form submission email
 * @param formData - The contact form data
 * @returns Promise with the API response
 */
export async function sendContactFormEmail(formData: ContactUsFormData) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // Configure email parameters
  sendSmtpEmail.subject = "New Contact Us Form Submission - By Tech Katalyst";
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <p>A site visitor just submitted your Contact Form on DriveFitt Brand Website</p>
        <hr>
        <h2>Submission summary:</h2>
        
        <p><strong>Full Name:</strong><br>
        ${formData.first_name} ${formData.last_name || ""}</p>
        
        <p><strong>Mobile Number:</strong><br>
        ${formData.phone || ""}</p>
        
        <p><strong>Email Address:</strong><br>
        ${formData.email}</p>
        
        <p><strong>Message:</strong><br>
        ${formData.message || ""}</p>
      </body>
    </html>
  `;

  // Replace with your notification email
  sendSmtpEmail.sender = {
    name: "Tech Katalyst",
    email: process.env.SENDER_EMAIL || "alerts@drivefitt.club",
  };

  // Replace with the email where you want to receive notifications
  sendSmtpEmail.to = [
    { email: process.env.NOTIFICATION_EMAIL || "your-email@example.com" },
  ];

  // Set reply-to as the user's email
  sendSmtpEmail.replyTo = {
    email: formData.email,
    name: `${formData.first_name} ${formData.last_name || ""}`,
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return response;
  } catch (error) {
    console.error("Error sending email via Brevo::", error);
    throw error;
  }
}

/**
 * Send a franchise inquiry form submission email
 * @param formData - The franchise form data
 * @returns Promise with the API response
 */
export async function sendFranchiseFormEmail(formData: FranchiseFormData) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // Configure email parameters
  sendSmtpEmail.subject = "New Franchise Enquiry Form - By Tech Katalyst";
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <p>A site visitor just submitted your Franchise Enquiry Form on DriveFitt Brand Website</p>
        <hr>
        <h2>Submission summary:</h2>
        
        <p><strong>Full Name:</strong><br>
        ${formData.contact_person || ""}</p>
        
        <p><strong>Mobile Number:</strong><br>
        ${formData.phone || ""}</p>
        
        <p><strong>Email Address:</strong><br>
        ${formData.email || ""}</p>
        
        <p><strong>City:</strong><br>
        ${formData.city || ""}</p>
        
        <p><strong>Message:</strong><br>
        ${formData.business_background || ""}</p>
        
      </body>
    </html>
  `;

  // Replace with your notification email
  sendSmtpEmail.sender = {
    name: "Tech Katalyst",
    email: process.env.SENDER_EMAIL || "alerts@drivefitt.club",
  };

  // Replace with the email where you want to receive franchise inquiries
  sendSmtpEmail.to = [
    {
      email:
        process.env.FRANCHISE_NOTIFICATION_EMAIL ||
        process.env.NOTIFICATION_EMAIL ||
        "your-email@example.com",
    },
  ];

  // Set reply-to as the user's email
  if (formData.email) {
    sendSmtpEmail.replyTo = {
      email: formData.email,
      name: formData.contact_person || "",
    };
  }

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return response;
  } catch (error) {
    console.error("Error sending franchise inquiry email via Brevo:", error);
    throw error;
  }
}

/**
 * Send a lead generation form submission email
 * @param formData - The lead generation form data
 * @returns Promise with the API response
 */
export async function sendLeadGenFormEmail(formData: LeadGenFormData) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // Get selected interests
  const selectedInterests = Object.entries(formData.interests)
    .filter(([_, value]) => value === 1)
    .map(([key]) => {
      // Convert camelCase to Title Case
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    });

  // Configure email parameters
  sendSmtpEmail.subject =
    "New Lead Generation Form Submission - By Tech Katalyst";
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <p>A site visitor just submitted your Lead Generation Form on DriveFitt Brand Website</p>
        <hr>
        <h2>Submission summary:</h2>
        
        <p><strong>Full Name:</strong><br>
        ${formData.name}</p>
        
        <p><strong>Mobile Number:</strong><br>
        ${formData.phone}</p>
        
        <p><strong>Interested In:</strong><br>
        ${
          selectedInterests.length > 0
            ? selectedInterests.join("<br>")
            : "No specific interests selected"
        }</p>
        
        <p><strong>Message:</strong><br>
        ${formData.message || "No message provided"}</p>
      </body>
    </html>
  `;

  // Replace with your notification email
  sendSmtpEmail.sender = {
    name: "Tech Katalyst",
    email: process.env.SENDER_EMAIL || "alerts@drivefitt.club",
  };

  // Replace with the email where you want to receive notifications
  sendSmtpEmail.to = [
    { email: process.env.NOTIFICATION_EMAIL || "garvittyagicoe@gmail.com" },
  ];

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Lead generation email sent successfully");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error sending lead generation email via Brevo:", error);
    throw error;
  }
}
