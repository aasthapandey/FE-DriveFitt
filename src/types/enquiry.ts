export type EnquiryGender = "male" | "female" | "prefer_not_to_say";
export type EnquiryType = "walk_in" | "appointment";

export interface EnquirySource {
  id: number;
  label: string;
  slug: string;
  active: boolean;
  sortOrder: number;
}

export interface EnquirySubmission {
  name: string;
  email: string;
  gender: EnquiryGender;
  enquiryType: EnquiryType;
  sourceId: number;
  verificationToken: string;
  idempotencyKey: string;
}

export interface EnquiryVerificationPayload {
  kind: "enquiry_verification";
  phone: string;
  consentId: number;
}
