import crypto from "crypto";
import jwt from "jsonwebtoken";
import { privacyData } from "@/data/privacy";
import { termsData } from "@/data/terms";
import { executeQuery, getConnection } from "@/lib/database";
import { otpService } from "@/lib/otpService";
import { smsService } from "@/lib/smsService";
import { OTPPurpose } from "@/types/auth";
import {
  EnquiryGender,
  EnquirySource,
  EnquirySubmission,
  EnquiryType,
  EnquiryVerificationPayload,
} from "@/types/enquiry";

const TERMS_URL = "/terms";
const TERMS_VERSION = process.env.ENQUIRY_TERMS_VERSION || "enquiry-2026-09";
const OTP_EXPIRY_MINUTES = 5;
const DEV_SOURCES: EnquirySource[] = [
  ...Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    label: `Source ${index + 1}`,
    slug: `source-${index + 1}`,
    active: true,
    sortOrder: (index + 1) * 10,
  })),
];

interface ConsentTokenPayload {
  kind: "enquiry_consent";
  phone: string;
  acceptedAt: string;
  termsVersion: string;
  termsHash: string;
}

interface ResultHeader {
  insertId: number;
  affectedRows: number;
}

interface ProspectPrefill {
  name: string;
  email: string;
  gender?: EnquiryGender;
}

const getTokenSecret = () => {
  const value = process.env.JWT_SECRET;
  if (!value) {
    if (process.env.NODE_ENV !== "production") {
      return "drivefitt-enquiry-local-development-only-secret";
    }
    throw new Error("Missing JWT_SECRET");
  }
  return value;
};

const getTermsHash = () =>
  crypto
    .createHash("sha256")
    .update(
      `${termsData.policySection?.htmlContent || ""}\n${privacyData.policySection?.htmlContent || ""}`,
    )
    .digest("hex");

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );

const normalizeGender = (value: string | null): EnquiryGender | undefined => {
  const normalized = value?.trim().toLowerCase().replace(/[ -]+/g, "_");
  if (normalized === "male" || normalized === "female") return normalized;
  if (normalized === "prefer_not_to_say") return normalized;
  return undefined;
};

const getProspectPrefill = async (phone: string): Promise<ProspectPrefill | null> => {
  const prospects = await executeQuery<
    Array<{ name: string; email: string; gender: string | null }>
  >(
    `SELECT name, email, gender
     FROM enquiry_prospects
     WHERE phone = ?
     LIMIT 1`,
    [phone],
  );
  if (prospects[0]) {
    return {
      name: prospects[0].name || "",
      email: prospects[0].email || "",
      gender: normalizeGender(prospects[0].gender),
    };
  }

  const localPhone = phone.slice(3);
  const users = await executeQuery<
    Array<{
      name: string;
      email: string | null;
      gender: string | null;
    }>
  >(
    `SELECT TRIM(CONCAT_WS(' ', first_name, last_name)) AS name, email, gender
     FROM users
     WHERE phone IN (?, ?)
     ORDER BY id DESC
     LIMIT 1`,
    [localPhone, phone],
  );
  if (!users[0]) return null;
  return {
    name: users[0].name || "",
    email: users[0].email || "",
    gender: normalizeGender(users[0].gender),
  };
};

export const normalizeIndianPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? `+91${local}` : null;
};

export const getActiveEnquirySources = async (): Promise<EnquirySource[]> => {
  if (
    process.env.NODE_ENV !== "production" &&
    !process.env.DB_HOST &&
    !process.env.DB_USER
  ) {
    return DEV_SOURCES;
  }

  const rows = await executeQuery<
    Array<{
      id: number;
      label: string;
      slug: string;
      active: number | boolean;
      sort_order: number;
    }>
  >(
    `SELECT id, label, slug, active, sort_order
     FROM enquiry_sources
     WHERE active = TRUE
     ORDER BY sort_order ASC, label ASC`,
  );

  return rows.map((row) => ({
    id: row.id,
    label: row.label,
    slug: row.slug,
    active: Boolean(row.active),
    sortOrder: row.sort_order,
  }));
};

export const createEnquiryOtpChallenge = async ({
  phoneInput,
  consentAccepted,
}: {
  phoneInput: string;
  consentAccepted: boolean;
}) => {
  const phone = normalizeIndianPhone(phoneInput);
  if (!phone) throw new Error("INVALID_PHONE");
  if (!consentAccepted) throw new Error("CONSENT_REQUIRED");

  const consentPayload: ConsentTokenPayload = {
    kind: "enquiry_consent",
    phone,
    acceptedAt: new Date().toISOString(),
    termsVersion: TERMS_VERSION,
    termsHash: getTermsHash(),
  };
  const consentToken = jwt.sign(consentPayload, getTokenSecret(), {
    expiresIn: `${OTP_EXPIRY_MINUTES}m`,
  });

  const localPhone = phone.slice(3);
  const otpResult = await otpService.generateAndStoreOTP(
    localPhone,
    OTPPurpose.LOGIN,
  );
  if (!otpResult.success || !otpResult.otp) throw new Error("OTP_DELIVERY_FAILED");
  const otp = otpResult.otp;
  const delivery = await smsService.sendOTP(phone.slice(3), otp);
  const otpRecord = await otpService.getOTPRecord(localPhone, OTPPurpose.LOGIN);
  if (otpRecord) await otpService.updateVendorResponse(otpRecord.id, delivery);

  if (!delivery.success) throw new Error("OTP_DELIVERY_FAILED");
  return { consentToken, phone, expiresInSeconds: OTP_EXPIRY_MINUTES * 60 };
};

export const verifyEnquiryOtpChallenge = async ({
  consentToken,
  phoneInput,
  otp,
  ipAddress,
  userAgent,
}: {
  consentToken: string;
  phoneInput: string;
  otp: string;
  ipAddress: string | null;
  userAgent: string | null;
}) => {
  const phone = normalizeIndianPhone(phoneInput);
  if (!phone || !/^\d{4}$/.test(otp) || !consentToken) {
    throw new Error("INVALID_OTP");
  }

  let consent: ConsentTokenPayload;
  try {
    consent = jwt.verify(consentToken, getTokenSecret()) as ConsentTokenPayload;
    if (consent.kind !== "enquiry_consent" || consent.phone !== phone) throw new Error();
  } catch {
    throw new Error("INVALID_OTP");
  }

  const isValid = await otpService.verifyOTP(
    phone.slice(3),
    otp,
    OTPPurpose.LOGIN,
  );
  if (!isValid) throw new Error("INVALID_OTP");

  const consentResult = await executeQuery<ResultHeader>(
    `INSERT INTO enquiry_consent_acceptances
      (phone, terms_url, terms_version, terms_hash, accepted_at,
       verified_at, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      phone,
      TERMS_URL,
      consent.termsVersion,
      consent.termsHash,
      new Date(consent.acceptedAt),
      new Date(),
      ipAddress,
      userAgent,
    ],
  );
  const consentId = consentResult.insertId;

  const payload: EnquiryVerificationPayload = {
    kind: "enquiry_verification",
    phone,
    consentId,
  };
  const verificationToken = jwt.sign(payload, getTokenSecret(), { expiresIn: "10m" });
  let profile: ProspectPrefill | null = null;
  try {
    profile = await getProspectPrefill(phone);
  } catch (profileError) {
    console.error("Unable to prefill enquiry profile:", profileError);
  }
  return { verificationToken, phone, profile };
};

const validateSubmission = (body: EnquirySubmission) => {
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const validName =
    Boolean(name) &&
    name.length >= 2 &&
    name.length <= 100 &&
    !/[0-9<>()[\]{}\\/|@#$%^&*=+_~`!?;:"]/g.test(name);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "") && email.length <= 254;
  const validGender: EnquiryGender[] = ["male", "female", "prefer_not_to_say"];
  const validTypes: EnquiryType[] = ["walk_in", "appointment"];

  if (
    !validName ||
    !validEmail ||
    !validGender.includes(body.gender) ||
    !validTypes.includes(body.enquiryType) ||
    !Number.isInteger(body.sourceId) ||
    !isUuid(body.idempotencyKey) ||
    !body.verificationToken
  ) {
    throw new Error("INVALID_SUBMISSION");
  }
  return { name, email };
};

const verifySubmissionToken = (token: string) => {
  try {
    const payload = jwt.verify(token, getTokenSecret()) as EnquiryVerificationPayload;
    if (payload.kind !== "enquiry_verification") throw new Error();
    return payload;
  } catch {
    throw new Error("VERIFICATION_REQUIRED");
  }
};

export const submitEnquiry = async (body: EnquirySubmission) => {
  const { name, email } = validateSubmission(body);
  const verification = verifySubmissionToken(body.verificationToken);

  const pool = await getConnection();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const [existingRows] = await connection.execute(
      `SELECT public_id, submitted_at FROM enquiries WHERE idempotency_key = ?`,
      [body.idempotencyKey],
    );
    const existing = (
      existingRows as Array<{ public_id: string; submitted_at: Date | string }>
    )[0];
    if (existing) {
      await connection.commit();
      return {
        enquiryId: existing.public_id,
        submittedAt: new Date(existing.submitted_at).toISOString(),
        duplicate: true,
      };
    }

    const [consentRows] = await connection.execute(
      `SELECT id FROM enquiry_consent_acceptances
       WHERE id = ? AND phone = ? AND verified_at IS NOT NULL AND used_at IS NULL
       FOR UPDATE`,
      [verification.consentId, verification.phone],
    );
    if ((consentRows as Array<{ id: number }>).length !== 1) {
      throw new Error("VERIFICATION_REQUIRED");
    }

    const [sourceRows] = await connection.execute(
      `SELECT id, label FROM enquiry_sources WHERE id = ? AND active = TRUE`,
      [body.sourceId],
    );
    const source = (sourceRows as Array<{ id: number; label: string }>)[0];
    if (!source) throw new Error("INVALID_SOURCE");

    const [prospectResult] = await connection.execute(
      `INSERT INTO enquiry_prospects (phone, name, email, gender)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         id = LAST_INSERT_ID(id), name = VALUES(name), email = VALUES(email),
         gender = VALUES(gender), updated_at = CURRENT_TIMESTAMP`,
      [verification.phone, name, email, body.gender],
    );
    const prospectId = (prospectResult as ResultHeader).insertId;
    const publicId = crypto.randomUUID();
    const submittedAt = new Date();
    await connection.execute(
      `INSERT INTO enquiries
        (public_id, prospect_id, consent_id, source_id, source_label, name, email,
         gender, enquiry_type, idempotency_key, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        publicId,
        prospectId,
        verification.consentId,
        source.id,
        source.label,
        name,
        email,
        body.gender,
        body.enquiryType,
        body.idempotencyKey,
        submittedAt,
      ],
    );
    await connection.execute(
      `UPDATE enquiry_consent_acceptances SET used_at = ? WHERE id = ?`,
      [submittedAt, verification.consentId],
    );
    await connection.commit();
    return { enquiryId: publicId, submittedAt: submittedAt.toISOString(), duplicate: false };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
