"use client";
import { useState } from "react";
import EnhancedPaymentModal from "./EnhancedPaymentModal";

interface PaymentButtonProps {
  membershipType: string;
  amount: number;
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function PaymentButton({
  membershipType,
  amount,
  className = "",
  children,
  variant = "primary",
  size = "md",
}: PaymentButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <>
      <button onClick={() => setShowModal(true)} className={buttonClasses}>
        {children || `Join ${membershipType} - ₹${amount.toLocaleString()}`}
      </button>

      <EnhancedPaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        membershipType={membershipType}
        amount={amount}
      />
    </>
  );
}

