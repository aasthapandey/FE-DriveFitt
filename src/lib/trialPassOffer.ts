import { getCache } from "@vercel/functions";
import { fetchYoactivServiceVariation } from "@/lib/yoactivService";

export const TRIAL_PASS_SERVICE_ID = 44354;
export const TRIAL_PASS_VARIATION_ID = 168621;

type TrialPassOffer = NonNullable<Awaited<ReturnType<typeof fetchYoactivServiceVariation>>>;
const cache = getCache({ namespace: "trial-pass" });

export async function getTrialPassOffer() {
  const key = `offer:${process.env.YOACTIV_BRANCH_ID}:${TRIAL_PASS_SERVICE_ID}:${TRIAL_PASS_VARIATION_ID}`;
  try {
    const cached = await cache.get(key).catch(() => null) as TrialPassOffer | null;
    if (cached) return cached;

    const offer = await fetchYoactivServiceVariation(TRIAL_PASS_SERVICE_ID, TRIAL_PASS_VARIATION_ID);
    if (offer) await cache.set(key, offer, { ttl: 120, name: "trial-pass-offer" }).catch(() => {});
    return offer;
  } catch (error) {
    console.error("Could not load the YoActiv trial pass", error);
    return null;
  }
}
