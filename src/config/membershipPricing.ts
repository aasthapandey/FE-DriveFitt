/**
 * Membership Pricing Configuration
 *
 * Single source of truth for all membership prices.
 * Update these values here and they propagate everywhere:
 *   - Plans page display prices & button text
 *   - Razorpay payment amount
 *   - Invoice PDF (base, GST, total, amount-in-words)
 */

export const MEMBERSHIP_PRICING = {
  INDIVIDUAL: {
    base: 47000,
    gst: 2350, // 5% of base
    total: 49350,
    amountInWords: "Forty-Nine Thousand Three Hundred and Fifty Rupees Only",
    displayPrice: "₹49,350",
    buttonText: "Buy Now @ ₹49,350",
  },
  FAMILY: {
    base: 120000,
    gst: 6000, // 5% of base
    total: 126000,
    amountInWords: "One Lakh Twenty-Six Thousand Rupees Only",
    displayPrice: "₹1,26,000",
    buttonText: "Buy Now @ ₹1,26,000",
  },
} as const;

/** Returns the pricing object for a given membership type integer (1 = Individual, 2 = Family) */
export function getPricingByType(membershipType: number) {
  return membershipType === 2
    ? MEMBERSHIP_PRICING.FAMILY
    : MEMBERSHIP_PRICING.INDIVIDUAL;
}

/** Returns the pricing object by matching the total amount charged */
export function getPricingByAmount(amount: number) {
  return amount === MEMBERSHIP_PRICING.FAMILY.total
    ? MEMBERSHIP_PRICING.FAMILY
    : MEMBERSHIP_PRICING.INDIVIDUAL;
}
