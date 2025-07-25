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
    email: "alerts@drivefitt.club",
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
    email: "alerts@drivefitt.club",
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
