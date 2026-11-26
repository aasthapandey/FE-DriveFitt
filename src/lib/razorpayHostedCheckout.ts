export interface RazorpayCheckoutOptions {
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  onSuccess: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onError: (error: Error) => void;
}

export class RazorpayHostedCheckout {
  private static checkoutScript: Promise<Window["Razorpay"]> | undefined;

  static loadScript(): Promise<Window["Razorpay"]> {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Razorpay Checkout requires a browser."));
    }
    if (this.checkoutScript) return this.checkoutScript;

    this.checkoutScript = new Promise<Window["Razorpay"]>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      const fail = () => {
        window.clearTimeout(timeout);
        script.remove();
        reject(new Error("Razorpay Checkout could not be loaded."));
      };
      const timeout = window.setTimeout(fail, 10000);
      script.onload = () => {
        if (typeof window.Razorpay !== "function") {
          fail();
          return;
        }
        window.clearTimeout(timeout);
        resolve(window.Razorpay);
      };
      script.onerror = fail;
      document.head.appendChild(script);
    }).catch((error: unknown) => {
      this.checkoutScript = undefined;
      throw error;
    });
    return this.checkoutScript;
  }

  static async openCheckout(options: RazorpayCheckoutOptions): Promise<void> {
    try {
      console.log("🔄 Starting Razorpay checkout process...");

      // Load Razorpay script if not already loaded
      console.log("📥 Loading Razorpay script...");
      const Razorpay = await this.loadScript();

      console.log("✅ Razorpay is available, creating checkout instance...");

      const a = {
        key: process.env.RAZORPAY_KEY_ID!,
        amount: options.amount,
        currency: options.currency,
        name: options.name,
        description: options.description,
        order_id: options.orderId,
        prefill: options.prefill,
        theme: options.theme,
        handler: options.onSuccess,
        modal: {
          ondismiss: () => {
            console.log("🚫 Payment cancelled by user");
            options.onError(new Error("Payment cancelled by user"));
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
      };
      console.log("a:", a);
      const rzp = new Razorpay(a);

      console.log("🚀 Opening Razorpay checkout...");
      rzp.open();
      console.log("✅ Razorpay checkout opened successfully");
    } catch (error) {
      console.error("❌ Failed to open Razorpay checkout:", error);
      options.onError(
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }
}

// Declare global Razorpay type
declare global {
  interface Window {
    Razorpay: new (options: {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      order_id: string;
      prefill: {
        name: string;
        email: string;
        contact: string;
      };
      theme: {
        color: string;
      };
      handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => void;
      modal: {
        ondismiss: () => void;
      };
      config?: {
        display: {
          blocks: {
            banks: { name: string; instruments: Array<{ method: string }> };
            cards: { name: string; instruments: Array<{ method: string }> };
            netbanking: {
              name: string;
              instruments: Array<{ method: string }>;
            };
          };
          sequence: string[];
          preferences: { show_default_blocks: boolean };
        };
      };
    }) => {
      open: () => void;
    };
  }
}
