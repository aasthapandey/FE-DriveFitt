import axios from "axios";

interface GupshupConfig {
  username: string;
  password: string;
  senderId: string;
  baseURL: string;
}

class GupshupService {
  private config: GupshupConfig;

  constructor() {
    this.config = {
      username: process.env.GUPSHUP_USERNAME!,
      password: process.env.GUPSHUP_PASSWORD!,
      senderId: process.env.GUPSHUP_SENDER_ID || "DRIVEF",
      baseURL: "https://enterprise.smsgupshup.com/GatewayAPI/rest",
    };
  }

  async sendOTP(
    phone: string,
    otp: string
  ): Promise<{ success: boolean; response: string }> {
    try {
      const message = `${otp} is your verification code. For your security, do not share this code.\nThis code expires in 15 minutes`;

      const params = new URLSearchParams({
        method: "sendMessage",
        send_to: phone,
        msg: message,
        msg_type: "TEXT",
        userid: this.config.username,
        password: this.config.password,
        auth_scheme: "plain",
        v: "1.1",
        format: "text",
      });

      const response = await axios.get(
        `${this.config.baseURL}?${params.toString()}`,
        {
          timeout: 10000,
        }
      );

      // Gupshup returns success response in format: "success | messageId"
      const result = response.data;
      console.log("Gupshup response:", result);

      return {
        success: result.startsWith("success"),
        response: result,
      };
    } catch (error) {
      console.error("Gupshup SMS error:", error);
      return {
        success: false,
        response: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getBalance(): Promise<number> {
    try {
      const params = new URLSearchParams({
        method: "GetBalance",
        userid: this.config.username,
        password: this.config.password,
        auth_scheme: "plain",
        v: "1.1",
        format: "text",
      });

      const response = await axios.get(
        `${this.config.baseURL}?${params.toString()}`
      );
      const result = response.data;

      if (result.startsWith("success")) {
        const balance = result.split("|")[1];
        return parseFloat(balance);
      }

      return 0;
    } catch (error) {
      console.error("Gupshup balance check error:", error);
      return 0;
    }
  }
}

export const gupshupService = new GupshupService();
