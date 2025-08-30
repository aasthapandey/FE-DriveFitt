import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance

export const razorpayInstance = new Razorpay({
  key_id:  "rzp_live_RBcCfbzN35eWx4",
  key_secret:  "f0dAf49wOscpoZZzQ5HJzkUE",
});

// Verify payment signature
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  try {
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    return expectedSignature === signature;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
};

// Verify webhook signature
export const verifyWebhookSignature = (
  body: string,
  signature: string
): boolean => {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    return expectedSignature === signature;
  } catch (error) {
    console.error("Webhook signature verification error:", error);
    return false;
  }
};

// Payment status enum
export enum PaymentStatus {
  CREATED = "created",
  COMPLETED = "completed",
  FAILED = "failed",
  PENDING = "pending",
}

// Payment order interface
export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  membership_type?: string;
  payment_id?: string;
  signature?: string;
  user_details?: any;
  created_at: Date;
  completed_at?: Date;
}

// Membership interface
export interface Membership {
  id?: number;
  user_email: string;
  order_id: string;
  payment_id: string;
  membership_type?: string;
  status: "active" | "expired" | "cancelled";
  created_at: Date;
  expires_at?: Date;
}

