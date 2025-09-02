import * as SibApiV3Sdk from "@getbrevo/brevo";
import { ContactUsFormData, FranchiseFormData } from "@/types/database";
import https from "https";
import http from "http";

// Define types for API instance
type ApiInstance = SibApiV3Sdk.TransactionalEmailsApi & {
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  httpsAgent?: https.Agent;
  httpAgent?: http.Agent;
};

// Define custom error type
interface NetworkError extends Error {
  code?: string;
}

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
const apiInstance: ApiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
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
    apiInstance.defaultHeaders = {
      ...(apiInstance.defaultHeaders || {}),
    };
    // Set timeout and agent configuration
    apiInstance.timeout = 30000;
    apiInstance.httpsAgent = httpsAgent;
  } else {
    apiInstance.httpAgent = httpAgent;
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
  } catch (error) {
    const networkError = error as NetworkError;
    if (
      retries > 0 &&
      networkError.code &&
      ["ECONNRESET", "ETIMEDOUT", "ECONNREFUSED"].includes(networkError.code)
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
  preferredLocation?: string;
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
        
        <p><strong>Preferred Location:</strong><br>
        ${formData.preferredLocation || "Not specified"}</p>
        
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

/**
 * Send membership success email with invoice attachment
 * @param userData - User information
 * @param membershipData - Membership details
 * @param invoiceBuffer - PDF invoice buffer
 * @returns Promise with the API response
 */
export async function sendMembershipSuccessEmail(
  userData: {
    name: string;
    email: string;
    phone: string;
  },
  membershipData: {
    id: number;
    membershipType: number;
    status: string;
    startDate: string;
    expiresAt: string;
    invoiceNumber?: string;
    orderId: number;
    paymentId: number;
  },
  invoiceBuffer: Buffer
) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // Get first name from full name
  const firstName = userData.name.split(" ")[0];

  // Configure email parameters
  sendSmtpEmail.subject = "Your Drive FITT Journey Starts here!";
  sendSmtpEmail.htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
            Hi ${firstName},
          </h2>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Big news – your Drive FITT membership price is officially locked! 🎉
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            You've secured your spot at our special discounted rate and will now enjoy exclusive member benefits worth over ₹40,000. 💪🔥
          </p>
          
          <h3 style="color: #2c3e50; margin-top: 30px; margin-bottom: 15px;">
            Here's what you need to know:
          </h3>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0; font-size: 16px;">
              ✅ Your price is locked at the discounted rate
            </p>
            <p style="margin: 10px 0; font-size: 16px;">
              ✅ You'll enjoy all included benefits once your membership is fully active
            </p>
            <p style="margin: 10px 0; font-size: 16px;">
              ⏳ Complete your balance payment within 90 days or before the club opens, whichever is earlier, to keep this price effective
            </p>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Attached is your invoice for this payment.
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            We can't wait to see you <strong>Drive. Strive. Thrive.</strong> with us at the club! 🏏✨
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 5px 0; font-size: 14px;">
              Cheers,<br>
              <strong>Team Drive FITT</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Set sender
  sendSmtpEmail.sender = {
    name: "Drive FITT",
    email: process.env.SENDER_EMAIL || "info@drivefitt.club",
  };

  // Set recipient
  sendSmtpEmail.to = [{ email: userData.email, name: userData.name }];

  // Add invoice attachment
  (sendSmtpEmail as any).attachment = [
    {
      name: `Invoice-${membershipData.invoiceNumber || "DriveFITT"}.pdf`,
      content: invoiceBuffer.toString("base64"),
      type: "application/pdf",
    },
  ];

  try {
    const response = await retryApiCall(() =>
      apiInstance.sendTransacEmail(sendSmtpEmail)
    );
    console.log("Membership success email sent successfully");
    return response;
  } catch (error) {
    console.error("Error sending membership success email via Brevo:", error);
    throw error;
  }
}
