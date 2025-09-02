import axios from "axios";

interface SMSConfig {
  userid: string;
  password: string;
  baseURL: string;
}

class SMSService {
  private config: SMSConfig;

  constructor() {
    this.config = {
      userid: process.env.GUPSHUP_USERID!,
      password: process.env.GUPSHUP_PASSWORD!,
      baseURL: "https://mediaapi.smsgupshup.com/GatewayAPI/rest",
    };
  }

  async sendOTP(
    phone: string,
    otp: string
  ): Promise<{ success: boolean; response: string }> {
    try {
      console.log("Sending OTP to", phone);

      const response = await axios.get(
        `${this.config.baseURL}?userid=${this.config.userid}&password=${this.config.password}&send_to=${phone}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2A${otp}%2A+is+your+verification+code.+For+your+security%2C+do+not+share+this+code.&isTemplate=true`,
        {
          timeout: 15000, // 30 seconds timeout
        }
      );

      const result = response.data;
      console.log("Gupshup response:", result);

      // Handle nested response format
      if (
        typeof result === "object" &&
        result.response &&
        result.response.status === "success"
      ) {
        return {
          success: true,
          response: JSON.stringify(result),
        };
      } else if (typeof result === "object" && result.status === "success") {
        return {
          success: true,
          response: JSON.stringify(result),
        };
      } else if (typeof result === "string" && result.startsWith("success")) {
        return {
          success: true,
          response: result,
        };
      } else {
        return {
          success: false,
          response: JSON.stringify(result),
        };
      }
    } catch (error) {
      console.error("Gupshup SMS error:", error);
      return {
        success: false,
        response: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const smsService = new SMSService();
