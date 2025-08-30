"use client";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import PaymentSuccess from "./PaymentSuccess";
import PaymentError from "./PaymentError";

interface EnhancedPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  membershipType: string;
  amount: number;
}

export default function EnhancedPaymentModal({
  isOpen,
  onClose,
  membershipType,
  amount,
}: EnhancedPaymentModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccess = (paymentId: string) => {
    setPaymentId(paymentId);
    setShowSuccess(true);
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowError(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setShowError(false);
    setPaymentId("");
    setErrorMessage("");
    onClose();
  };

  const handleRetry = () => {
    setShowError(false);
    setErrorMessage("");
  };

  if (showSuccess) {
    return (
      <PaymentSuccess
        paymentId={paymentId}
        membershipType={membershipType}
        amount={amount}
        onClose={handleClose}
      />
    );
  }

  if (showError) {
    return (
      <PaymentError
        error={errorMessage}
        onClose={handleClose}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <PaymentModal
      isOpen={isOpen}
      onClose={handleClose}
      membershipType={membershipType}
      amount={amount}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}
