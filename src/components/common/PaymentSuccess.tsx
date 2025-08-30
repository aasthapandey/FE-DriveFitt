"use client";

interface PaymentSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  membershipType: string;
}

export default function PaymentSuccess({
  isOpen,
  onClose,
  paymentId,
  membershipType,
}: PaymentSuccessProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-xl text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600">
            Thank you for your payment. Your {membershipType} membership has been activated.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Payment ID: {paymentId}</p>
            <p>Membership: {membershipType}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}