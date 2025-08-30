// Integer enums for better performance
export enum OTPPurpose {
  LOGIN = 1,
  REGISTRATION = 2,
  PASSWORD_RESET = 3,
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  SUSPENDED = 3,
}

export interface OTPVerification {
  id: number;
  phone: string;
  otp: string;
  purpose: OTPPurpose;
  attempts: number;
  is_verified: boolean;
  expires_at: Date;
  vendor_response?: string;
  created_at: Date;
  verified_at?: Date;
}

export interface User {
  id: number;
  phone: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_verified: boolean;
  phone_verified_at?: Date;
  status: UserStatus;
  last_login_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface UserSession {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
}

export interface SendOTPRequest {
  phone: string;
  purpose: OTPPurpose;
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
  purpose: OTPPurpose;
}

export interface LoginWithOTPRequest {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: User;
    expires_in?: number;
  };
}
