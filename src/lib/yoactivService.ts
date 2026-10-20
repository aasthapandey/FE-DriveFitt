const YOACTIV_BASE_URL = "https://api.yoactiv.com";
const DEFAULT_SERVICE_ID = 44354;
const DEFAULT_CUSTOMER_TYPE_ID = 1;
const DEFAULT_ENQUIRY_TYPE_ID = 6;
const DEFAULT_LEAD_SOURCE_ID = 17;
const DEFAULT_TIMEOUT_MS = 8000;

type JsonRecord = Record<string, unknown>;

export interface YoactivMemberProfile {
  name: string;
  email: string;
  gender?: string;
}

export interface YoactivEnquiryInput {
  publicId: string;
  phone: string;
  name: string;
  email: string;
  gender: "male" | "female" | "prefer_not_to_say";
  enquiryType: "walk_in" | "appointment";
  sourceLabel: string;
  submittedAt: Date;
}

export interface YoactivSyncResult {
  success: boolean;
  ambiguous: boolean;
  httpStatus?: number;
  message: string;
  responseSummary: string;
}

const isRecord = (value: unknown): value is JsonRecord =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim() : value == null ? "" : String(value);

const positiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const getConfig = () => ({
  apiKey: process.env.YOACTIV_API_KEY?.trim() || "",
  branchId: process.env.YOACTIV_BRANCH_ID?.trim() || "",
  serviceId: positiveInteger(
    process.env.YOACTIV_DEFAULT_SERVICE_ID,
    DEFAULT_SERVICE_ID,
  ),
  customerTypeId: positiveInteger(
    process.env.YOACTIV_CUSTOMER_TYPE_ID,
    DEFAULT_CUSTOMER_TYPE_ID,
  ),
  enquiryTypeId: positiveInteger(
    process.env.YOACTIV_ENQUIRY_TYPE_ID,
    DEFAULT_ENQUIRY_TYPE_ID,
  ),
  leadSourceId: positiveInteger(
    process.env.YOACTIV_LEAD_SOURCE_ID,
    DEFAULT_LEAD_SOURCE_ID,
  ),
  timeoutMs: positiveInteger(
    process.env.YOACTIV_TIMEOUT_MS,
    DEFAULT_TIMEOUT_MS,
  ),
});

const formatIndiaDate = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const parseResponse = async (response: Response): Promise<JsonRecord> => {
  const text = await response.text();
  if (!text) return {};
  try {
    const parsed = JSON.parse(text) as unknown;
    return isRecord(parsed) ? parsed : { Message: "Unexpected YoActiv response" };
  } catch {
    return { Message: text.slice(0, 500) };
  }
};

const responseSummary = (
  httpStatus: number | undefined,
  message: string,
  error: string,
) =>
  JSON.stringify({
    httpStatus: httpStatus ?? null,
    message: message.slice(0, 500) || null,
    error: error.slice(0, 500) || null,
  });

const request = async (
  path: string,
  body: JsonRecord,
): Promise<
  | { type: "response"; httpStatus: number; data: JsonRecord }
  | { type: "network_error"; message: string }
> => {
  const config = getConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(`${YOACTIV_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        API_Key: config.apiKey,
        Branch_Id: config.branchId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    return {
      type: "response",
      httpStatus: response.status,
      data: await parseResponse(response),
    };
  } catch (error) {
    return {
      type: "network_error",
      message:
        error instanceof Error && error.name === "AbortError"
          ? "YoActiv request timed out"
          : "YoActiv request failed",
    };
  } finally {
    clearTimeout(timeout);
  }
};

export const isYoactivConfigured = () => {
  const config = getConfig();
  return Boolean(config.apiKey && config.branchId);
};

export const fetchYoactivMemberByPhone = async (
  phone: string,
): Promise<YoactivMemberProfile | null> => {
  if (!isYoactivConfigured()) return null;

  const response = await request("/Users/Fetch", {
    Mobile_No: phone.replace(/^\+91/, ""),
  });
  if (response.type !== "response" || response.httpStatus !== 200) return null;

  const member = isRecord(response.data.Data) ? response.data.Data : response.data;
  const name = asString(member.Name);
  const email = asString(member.Mail);
  const memberId = asString(member.MemberId ?? member.Member_Id);
  if (!memberId || !name) return null;

  return {
    name,
    email,
    gender: asString(member.Gender) || undefined,
  };
};

export const createYoactivEnquiry = async (
  input: YoactivEnquiryInput,
): Promise<YoactivSyncResult> => {
  if (!isYoactivConfigured()) {
    const message = "YoActiv credentials are not configured";
    return {
      success: false,
      ambiguous: false,
      message,
      responseSummary: responseSummary(undefined, "", message),
    };
  }

  const config = getConfig();
  const requestedType = input.enquiryType === "walk_in" ? "Walk-in" : "Appointment";
  const message = [
    "Drive FITT website enquiry",
    `Requested type: ${requestedType}`,
    `Local source: ${input.sourceLabel}`,
    `Local reference: ${input.publicId}`,
  ].join("\n");

  const response = await request("/Enquiry/SaveEnquiry", {
    Mail: input.email,
    Country_Code: "+91",
    Mobile: input.phone.replace(/^\+91/, ""),
    Name: input.name,
    Gender:
      input.gender === "male" ? "Male" : input.gender === "female" ? "Female" : "",
    Service_Id: String(config.serviceId),
    Enquiry_Date: formatIndiaDate(input.submittedAt),
    Locality: "",
    Emergency_contact_Name: "",
    Emergency_contact_Number: "",
    Emergency_contact_Relationship: "",
    "Follow-up_Date": "",
    Message: message,
    Lead_source: String(config.leadSourceId),
    Customer_Type: String(config.customerTypeId),
    Enquiry_Type: String(config.enquiryTypeId),
    "Follow-up_Staff": "",
    Trial_Staff: "",
    Trial_DateTime: "",
  });

  if (response.type === "network_error") {
    return {
      success: false,
      ambiguous: true,
      message: response.message,
      responseSummary: responseSummary(undefined, "", response.message),
    };
  }

  const apiMessage = asString(response.data.Message ?? response.data.MSG);
  const apiError = asString(response.data.Error);
  const success =
    response.httpStatus >= 200 &&
    response.httpStatus < 300 &&
    !apiError &&
    /enquiry details added|success/i.test(apiMessage);

  return {
    success,
    ambiguous: response.httpStatus >= 500,
    httpStatus: response.httpStatus,
    message: success
      ? apiMessage || "Enquiry synced"
      : apiError || apiMessage || `YoActiv returned HTTP ${response.httpStatus}`,
    responseSummary: responseSummary(response.httpStatus, apiMessage, apiError),
  };
};
