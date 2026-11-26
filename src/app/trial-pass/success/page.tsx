import type { Metadata } from "next";
import TrialPassSuccess from "@/components/TrialPass/TrialPassSuccess";

export const metadata: Metadata = {
  title: "Trial Pass Payment | Drive FITT",
  robots: { index: false, follow: false },
};

export default function TrialPassSuccessPage() {
  return <TrialPassSuccess />;
}
