"use client";
import { useState } from "react";

export default function TestPaymentSimplePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // Step 1: Create order
      console.log("🔍 Creating order...");
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 999,
          membership_type: "Premium",
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderResponse.json();
      console.log("✅ Order created:", orderData);

      // Step 2: Try to load Razorpay script
      console.log("📥 Loading Razorpay script...");

      // Check if Razorpay is already loaded
      if (typeof window !== "undefined" && window.Razorpay) {
        console.log("✅ Razorpay already loaded");
        setResult({
          success: true,
          message: "Razorpay is available and ready to use",
          orderData,
        });
      } else {
        // Try to load the script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onload = () => {
          console.log("✅ Razorpay script loaded successfully");
          if (window.Razorpay) {
            setResult({
              success: true,
              message: "Razorpay script loaded successfully",
              orderData,
            });
          } else {
            setResult({
              success: false,
              error: "Razorpay not available after script load",
            });
          }
        };

        script.onerror = () => {
          console.error("❌ Failed to load Razorpay script");
          setResult({
            success: false,
            error: "Failed to load Razorpay script",
          });
        };

        document.head.appendChild(script);
      }
    } catch (error) {
      console.error("❌ Test failed:", error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Test failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testRazorpayOpen = () => {
    if (typeof window !== "undefined" && window.Razorpay) {
      try {
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: 100,
          currency: "INR",
          name: "DriveFitt",
          description: "Test Payment",
          order_id: "test_order",
          handler: function (response: any) {
            console.log("Payment successful:", response);
            setResult({
              success: true,
              message: "Razorpay checkout opened successfully",
              paymentResponse: response,
            });
          },
          modal: {
            ondismiss: function () {
              console.log("Payment cancelled");
              setResult({
                success: false,
                error: "Payment cancelled by user",
              });
            },
          },
        });

        rzp.open();
        console.log("✅ Razorpay checkout opened");
      } catch (error) {
        console.error("❌ Failed to open Razorpay:", error);
        setResult({
          success: false,
          error: `Failed to open Razorpay: ${error}`,
        });
      }
    } else {
      setResult({
        success: false,
        error: "Razorpay not available",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Simple Payment Test
        </h1>

        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Testing...
              </div>
            ) : (
              "Test Order Creation & Script Loading"
            )}
          </button>

          <button
            onClick={testRazorpayOpen}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Test Razorpay Checkout
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg">
            {result.success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-green-800 font-semibold mb-2">
                  ✅ Success!
                </h3>
                <p className="text-green-700 text-sm mb-2">{result.message}</p>
                {result.orderData && (
                  <div className="text-xs text-green-600">
                    <p>Order ID: {result.orderData.orderId}</p>
                    <p>Amount: {result.orderData.amount}</p>
                  </div>
                )}
                {result.paymentResponse && (
                  <div className="text-xs text-green-600">
                    <p>
                      Payment ID: {result.paymentResponse.razorpay_payment_id}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold mb-2">❌ Failed</h3>
                <p className="text-red-700 text-sm">{result.error}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500">
          <p className="mb-2">
            <strong>What this tests:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Order creation via API</li>
            <li>Razorpay script loading</li>
            <li>Razorpay checkout functionality</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Declare global Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}
