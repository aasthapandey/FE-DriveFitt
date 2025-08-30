// Declare global Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;
  currency?: string;
  membershipType: string;
  userDetails: {
    name: string;
    email: string;
    contact: string;
  };
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export class PaymentService {
  // Create order on server
  static async createOrder(options: PaymentOptions) {
    const response = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency || "INR",
        receipt: `receipt_${Date.now()}`,
        membership_type: options.membershipType,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create order");
    }

    return response.json();
  }

  // Verify payment on server
  static async verifyPayment(paymentData: PaymentResponse, userDetails: any) {
    const response = await fetch("/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: paymentData.razorpay_order_id,
        paymentId: paymentData.razorpay_payment_id,
        signature: paymentData.razorpay_signature,
        userDetails: {
          ...userDetails,
          membership_type: userDetails.membershipType,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Payment verification failed");
    }

    return response.json();
  }

  // Initialize Razorpay payment
  static initializePayment(
    orderData: any,
    options: PaymentOptions
  ): Promise<PaymentResponse> {
    return new Promise((resolve, reject) => {
      // Check if Razorpay is loaded
      if (typeof window === "undefined" || !window.Razorpay) {
        reject(new Error("Razorpay not loaded"));
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "DriveFitt",
        description: `${options.membershipType} Membership`,
        order_id: orderData.orderId,
        prefill: {
          name: options.userDetails.name,
          email: options.userDetails.email,
          contact: options.userDetails.contact,
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response: PaymentResponse) {
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled by user"));
          },
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: "Pay using UPI",
                instruments: [
                  {
                    method: "upi",
                  },
                ],
              },
              cards: {
                name: "Pay using Card",
                instruments: [
                  {
                    method: "card",
                  },
                ],
              },
              netbanking: {
                name: "Pay using Net Banking",
                instruments: [
                  {
                    method: "netbanking",
                  },
                ],
              },
            },
            sequence: ["block.banks", "block.cards", "block.netbanking"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
      });

      rzp.open();
    });
  }

  // Complete payment flow
  static async processPayment(
    options: PaymentOptions
  ): Promise<{ success: boolean; paymentId?: string; error?: string }> {
    try {
      // Step 1: Create order
      const orderData = await this.createOrder(options);

      // Step 2: Initialize payment
      const paymentData = await this.initializePayment(orderData, options);

      // Step 3: Verify payment
      const verificationResult = await this.verifyPayment(
        paymentData,
        options.userDetails
      );

      if (verificationResult.success) {
        return {
          success: true,
          paymentId: paymentData.razorpay_payment_id,
        };
      } else {
        return {
          success: false,
          error: "Payment verification failed",
        };
      }
    } catch (error) {
      console.error("Payment processing failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Payment failed",
      };
    }
  }
}
