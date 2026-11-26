"use client";
import { useEffect } from "react";
import { RazorpayHostedCheckout } from "@/lib/razorpayHostedCheckout";

export default function RazorpayScript() {
  useEffect(() => {
    // Checkout can retry on demand if preloading fails.
    void RazorpayHostedCheckout.loadScript().catch(() => undefined);
  }, []);

  return null;
}


