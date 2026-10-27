import jwt from "jsonwebtoken";
import { executeQuery } from "@/lib/database";
import { normalizeIndianPhone } from "@/lib/enquiryService";
import { otpService } from "@/lib/otpService";
import { smsService } from "@/lib/smsService";
import { OTPPurpose } from "@/types/auth";

export const ENQUIRY_ADMIN_COOKIE = "drivefitt_enquiry_admin";
export const ENQUIRY_ADMIN_SESSION_SECONDS = 8 * 60 * 60;

interface AdminRow {
  id: number;
  phone: string;
  name: string;
}

export interface EnquiryAdminTokenPayload {
  kind: "enquiry_admin";
  adminId: number;
  phone: string;
}

export interface EnquiryAdminSession {
  id: number;
  phone: string;
  name: string;
}

const getTokenSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") {
    return "drivefitt-enquiry-admin-local-development-only-secret";
  }
  throw new Error("Missing JWT_SECRET");
};

const findActiveAdminByPhone = async (phone: string) => {
  const rows = await executeQuery<AdminRow[]>(
    `SELECT id, phone, name
     FROM enquiry_admin_users
     WHERE phone = ? AND active = TRUE
     LIMIT 1`,
    [phone],
  );
  return rows[0] || null;
};

const findActiveAdminById = async (id: number) => {
  const rows = await executeQuery<AdminRow[]>(
    `SELECT id, phone, name
     FROM enquiry_admin_users
     WHERE id = ? AND active = TRUE
     LIMIT 1`,
    [id],
  );
  return rows[0] || null;
};

export const sendEnquiryAdminOtp = async (phoneInput: string) => {
  const phone = normalizeIndianPhone(phoneInput);
  if (!phone) throw new Error("UNAUTHORIZED");

  const admin = await findActiveAdminByPhone(phone);
  if (!admin) throw new Error("UNAUTHORIZED");

  const localPhone = phone.slice(3);
  const generated = await otpService.generateAndStoreOTP(
    localPhone,
    OTPPurpose.LOGIN,
  );
  if (!generated.success || !generated.otp) throw new Error("OTP_DELIVERY_FAILED");

  const delivery = await smsService.sendOTP(localPhone, generated.otp, {
    // Admin requests should never be blocked by the vendor's duplicate-message cooldown.
    resend: true,
  });
  if (!delivery.success) throw new Error("OTP_DELIVERY_FAILED");

  // Recording the vendor response is useful for support, but is not required before
  // the browser can move to the verification step.
  return async () => {
    try {
      const storedOtp = await otpService.getOTPRecord(
        localPhone,
        OTPPurpose.LOGIN,
      );
      if (storedOtp) await otpService.updateVendorResponse(storedOtp.id, delivery);
    } catch (error) {
      console.error("Unable to record enquiry admin OTP delivery:", error);
    }
  };
};

export const verifyEnquiryAdminOtp = async (phoneInput: string, otp: string) => {
  const phone = normalizeIndianPhone(phoneInput);
  if (!phone || !/^\d{4}$/.test(otp)) throw new Error("INVALID_OTP");

  const admin = await findActiveAdminByPhone(phone);
  if (!admin) throw new Error("INVALID_OTP");

  const verified = await otpService.verifyOTP(
    phone.slice(3),
    otp,
    OTPPurpose.LOGIN,
  );
  if (!verified) throw new Error("INVALID_OTP");

  await executeQuery(
    `UPDATE enquiry_admin_users SET last_login_at = NOW() WHERE id = ?`,
    [admin.id],
  );

  const token = jwt.sign(
    { kind: "enquiry_admin", adminId: admin.id, phone: admin.phone },
    getTokenSecret(),
    { expiresIn: ENQUIRY_ADMIN_SESSION_SECONDS },
  );
  return { token, admin: { id: admin.id, phone: admin.phone, name: admin.name } };
};

export const getEnquiryAdminSession = async (
  token: string | undefined,
): Promise<EnquiryAdminSession | null> => {
  const payload = verifyEnquiryAdminToken(token);
  if (!payload) return null;
  try {
    const admin = await findActiveAdminById(payload.adminId);
    if (!admin || admin.phone !== payload.phone) return null;
    return { id: admin.id, phone: admin.phone, name: admin.name };
  } catch {
    return null;
  }
};

export const verifyEnquiryAdminToken = (
  token: string | undefined,
): EnquiryAdminTokenPayload | null => {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, getTokenSecret()) as EnquiryAdminTokenPayload;
    if (
      payload.kind !== "enquiry_admin" ||
      !Number.isInteger(payload.adminId) ||
      !payload.phone
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};
