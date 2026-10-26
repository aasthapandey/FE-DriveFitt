/**
 * SMS/WhatsApp Service
 * Wrapper for EasySocial WhatsApp OTP delivery
 */
import { easySocialService } from "./easySocialService";

interface SendOTPResponse {
  success: boolean;
  response: string;
  messageId?: string;
}

class SMSService {
  /**
   * Send OTP via WhatsApp
   * @param phone - Mobile number (10 digits)
   * @param otp - 4-digit OTP code
   * @param options.resend - Mark a request as an explicit resend
   * @returns Promise with success status and response details
   */
  async sendOTP(
    phone: string,
    otp: string,
    options: { resend?: boolean } = {},
  ): Promise<SendOTPResponse> {
    // Delegate to EasySocial WhatsApp service
    return easySocialService.sendOTP(phone, otp, options);
  }
}

export const smsService = new SMSService();
