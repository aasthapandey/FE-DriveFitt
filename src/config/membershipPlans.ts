import { MEMBERSHIP_PRICING } from "./membershipPricing";

export type MembershipPlanId = "individual-annual" | "family-annual";

export interface MembershipPlanCatalogItem {
  id: MembershipPlanId;
  displayName: string;
  cardTitle: string;
  subtitle?: string;
  membershipType: number;
  pricing: {
    base: number;
    gst: number;
    total: number;
    displayPrice: string;
    displayPriceWithTax: string;
    buttonText: string;
  };
  originalPrice: string;
  discountPercentage: string;
  seatsLeft: string;
  limitedOfferCountText: string;
  benefits: string[];
}

export const MEMBERSHIP_PLAN_BENEFITS = [
  "30 Cricket Sessions",
  "8 Pilates Sessions",
  "6 Run Studio Sessions",
  "6 Recovery Classes",
  "4 Physio Sessions",
  "Unlimited Group Classes (Spinning, etc.)",
  "Unlimited Small Group Training",
  "Fitness Induction + Events/Workshops/Outdoor Runs/Bootcamps",
];

export const MEMBERSHIP_PLANS: Record<
  MembershipPlanId,
  MembershipPlanCatalogItem
> = {
  "individual-annual": {
    id: "individual-annual",
    displayName: "Individual Annual Plan",
    cardTitle: "Founding Member - Individual Annual Plan",
    membershipType: 1,
    pricing: MEMBERSHIP_PRICING.INDIVIDUAL,
    originalPrice: "₹67,149",
    discountPercentage: "30%",
    seatsLeft: "",
    limitedOfferCountText: "100 members",
    benefits: MEMBERSHIP_PLAN_BENEFITS,
  },
  "family-annual": {
    id: "family-annual",
    displayName: "Family Annual Plan",
    cardTitle: "Founding Member - Family Annual Plan",
    subtitle: "3 Members",
    membershipType: 2,
    pricing: MEMBERSHIP_PRICING.FAMILY,
    originalPrice: "₹2,01,447",
    discountPercentage: "40%",
    seatsLeft: "",
    limitedOfferCountText: "100 families",
    benefits: MEMBERSHIP_PLAN_BENEFITS,
  },
};

export const MEMBERSHIP_PLAN_LIST = Object.values(MEMBERSHIP_PLANS);

export function getMembershipPlanById(
  planId: string | null | undefined
): MembershipPlanCatalogItem | null {
  if (!planId) return null;
  return MEMBERSHIP_PLANS[planId as MembershipPlanId] || null;
}

export function getMembershipPlanByType(
  membershipType: number
): MembershipPlanCatalogItem {
  return (
    MEMBERSHIP_PLAN_LIST.find((plan) => plan.membershipType === membershipType) ||
    MEMBERSHIP_PLANS["individual-annual"]
  );
}
