export enum OTPPurpose {
  LOGIN = "login",
  REGISTRATION = "registration",
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  hasMembership: boolean;
  membershipInfo?: {
    id: number;
    membershipType: string;
    status: "active" | "expired" | "cancelled";
    expiresAt: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

export interface UserRegistrationData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
}

export interface MembershipInfo {
  id: number;
  userId: string;
  orderId: string;
  paymentId: string;
  membershipType: string;
  status: "active" | "expired" | "cancelled";
  createdAt: string;
  expiresAt: string;
}

export interface OTPVerification {
  id: number;
  phone: string;
  otp: string;
  purpose: OTPPurpose;
  attempts: number;
  is_verified: boolean;
  expires_at: Date;
  created_at: Date;
  verified_at?: Date;
  vendor_response?: string;
}
