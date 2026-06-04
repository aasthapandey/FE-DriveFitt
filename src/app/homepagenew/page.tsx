import { Metadata } from "next";
import { headers } from "next/headers";
import HomepageNew from "@/components/HomepageNew";
import { isMobileDevice } from "@/utils/deviceDetection";

export const metadata: Metadata = {
  title: "Drive FITT | Modern Cricket & Fitness Club",
  description:
    "A cleaner look at Drive FITT, Gurugram's premium cricket, fitness, recovery, and community club.",
};

export default function HomepageNewRoute() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = userAgent ? isMobileDevice(userAgent) : false;

  return <HomepageNew isMobile={isMobile} />;
}
