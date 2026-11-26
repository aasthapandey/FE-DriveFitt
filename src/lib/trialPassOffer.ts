import { fetchYoactivServiceVariation } from "@/lib/yoactivService";

export const TRIAL_PASS_SERVICE_ID = 44354;
export const TRIAL_PASS_VARIATION_ID = 168621;

// Temporary ₹1 production checkout test. Set to null to use the YoActiv price.
const TRIAL_PASS_TEST_AMOUNT_PAISE: number | null = 100;

export async function getTrialPassOffer() {
  try {
    const offer = await fetchYoactivServiceVariation(TRIAL_PASS_SERVICE_ID, TRIAL_PASS_VARIATION_ID);
    if (!offer) return null;
    return { ...offer, amountPaise: TRIAL_PASS_TEST_AMOUNT_PAISE ?? offer.amountPaise };
  } catch (error) {
    console.error("Could not load the YoActiv trial pass", error);
    return null;
  }
}
