"use client";
import { useState } from "react";
import { PaymentService } from "@/lib/paymentService";
import { MEMBERSHIP_TYPES } from "@/lib/membershipTypes";

export default function TestPaymentApiPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [userDetails, setUserDetails] = useState({
    name: "Test User",
    email: "test@example.com",
    contact: "9876543210",
  });

  const handlePayment = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const result = await PaymentService.processPayment({
        amount: 999,
        membershipType: MEMBERSHIP_TYPES.INDIVIDUAL_ANNUAL,
        userDetails,
      });

      setResult(result);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Payment failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Test Payment API Flow
        </h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="tel"
              value={userDetails.contact}
              onChange={(e) =>
                setUserDetails({ ...userDetails, contact: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Test Payment (₹999)"
          )}
        </button>

        {result && (
          <div className="mt-6 p-4 rounded-lg">
            {result.success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-green-800 font-semibold mb-2">
                  ✅ Payment Successful!
                </h3>
                <p className="text-green-700 text-sm">
                  Payment ID: {result.paymentId}
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold mb-2">
                  ❌ Payment Failed
                </h3>
                <p className="text-red-700 text-sm">Error: {result.error}</p>
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
            <li>Razorpay hosted checkout</li>
            <li>Payment verification</li>
            <li>Complete payment flow</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
