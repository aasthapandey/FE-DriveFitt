"use client";
import { useState } from "react";
import { PaymentService, PaymentOptions } from "@/lib/paymentService";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  membershipType: string;
  amount: number;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  membershipType,
  amount,
  onSuccess,
  onError,
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userDetails.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!userDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!userDetails.contact.trim()) {
      newErrors.contact = "Phone number is required";
    } else if (!/^\d{10}$/.test(userDetails.contact.replace(/\D/g, ""))) {
      newErrors.contact = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await PaymentService.processPayment({
        amount,
        membershipType,
        userDetails,
      });

      if (result.success) {
        onSuccess?.(result.paymentId!);
        onClose();
        // Reset form
        setUserDetails({ name: "", email: "", contact: "" });
        setErrors({});
      } else {
        onError?.(result.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      onError?.(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {membershipType} Membership
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-semibold text-blue-800">
            Amount: ₹{amount.toLocaleString()}
          </p>
          <p className="text-sm text-blue-600">
            Complete your payment to activate membership
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={userDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={userDetails.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.contact ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={
              isLoading ||
              !userDetails.name ||
              !userDetails.email ||
              !userDetails.contact
            }
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Your payment is secured by Razorpay. We never store your payment
          details.
        </div>
      </div>
    </div>
  );
}

