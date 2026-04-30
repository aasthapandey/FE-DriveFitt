import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MembershipReviewPage from "@/components/MembershipReview/MembershipReviewPage";
import { getMembershipPlanById } from "@/config/membershipPlans";
import { isMobileDevice } from "@/utils/deviceDetection";

export const metadata: Metadata = {
  title: "Review Your Membership | Drive FITT",
  description: "Review your selected Drive FITT membership before payment.",
};

export default function MembershipReviewRoute({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const plan = getMembershipPlanById(searchParams.plan);
  if (!plan) {
    redirect("/membership");
  }

  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = userAgent ? isMobileDevice(userAgent) : false;

  return <MembershipReviewPage plan={plan} isMobile={isMobile} />;
}
