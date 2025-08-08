import * as SibApiV3Sdk from "@getbrevo/brevo";
import { ContactUsFormData, FranchiseFormData } from "@/types/database";
import https from "https";
import http from "http";

// Configure HTTP agents with proper timeout and connection settings
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 30000, // 30 seconds
});

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 30000, // 30 seconds
});

// Initialize Brevo API instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = process.env.BREVO_API_KEY;

// Set the API key for authentication
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  apiKey || ""
);

// Configure the API instance with custom agents
if (apiInstance.basePath) {
  const url = new URL(apiInstance.basePath);
  if (url.protocol === "https:") {
    (apiInstance as any).defaultHeaders = {
      ...((apiInstance as any).defaultHeaders || {}),
    };
    // Set timeout and agent configuration
    (apiInstance as any).timeout = 30000;
    (apiInstance as any).httpsAgent = httpsAgent;
  } else {
    (apiInstance as any).httpAgent = httpAgent;
  }
}

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function to add delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility function to retry API calls
async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  try {
    return await apiCall();
  } catch (error: any) {
    if (
      retries > 0 &&
      (error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT" ||
        error.code === "ECONNREFUSED")
    ) {
      console.log(`Retrying API call, ${retries} attempts remaining...`);
      await delay(RETRY_DELAY);
      return retryApiCall(apiCall, retries - 1);
    }
    throw error;
  }
}

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
    const response = await retryApiCall(() =>
      apiInstance.sendTransacEmail(sendSmtpEmail)
    );
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
    const response = await retryApiCall(() =>
      apiInstance.sendTransacEmail(sendSmtpEmail)
    );
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
    .filter(([, value]) => value === 1)
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
    const response = await retryApiCall(() =>
      apiInstance.sendTransacEmail(sendSmtpEmail)
    );
    console.log("Lead generation email sent successfully");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error sending lead generation email via Brevo:", error);
    throw error;
  }
}
