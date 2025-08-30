"use client";
import React, { useState } from "react";
import PaymentButton from "../../components/common/PaymentButton";
import EnhancedPaymentModal from "../../components/common/EnhancedPaymentModal";

export default function TestPaymentPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Payment Integration Test
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Individual Annual Plan
            </h2>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">₹47,116</div>
              <div className="text-gray-500 line-through">₹63,130</div>
              <div className="text-green-600 font-medium">30% OFF</div>
              <p className="text-sm text-gray-600">
                Limited period offer for first 100 members
              </p>

              <PaymentButton
                membershipType="Individual Annual Plan"
                amount={1}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Lock this Price @ ₹1 (Test)
              </PaymentButton>
            </div>
          </div>

          {/* Test Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Family Annual Plan</h2>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">₹1,14,282</div>
              <div className="text-gray-500 line-through">₹1,64,688</div>
              <div className="text-green-600 font-medium">30% OFF</div>
              <p className="text-sm text-gray-600">
                Limited period offer for first 100 members
              </p>

              <PaymentButton
                membershipType="Family Annual Plan"
                amount={1}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Lock this Price @ ₹1 (Test)
              </PaymentButton>
            </div>
          </div>
        </div>

        {/* Manual Modal Test */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Manual Modal Test</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Open Payment Modal Manually
          </button>
        </div>

        {/* Enhanced Payment Modal */}
        <EnhancedPaymentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          membershipType="Test Plan"
          amount={1}
        />
      </div>
    </div>
  );
}
