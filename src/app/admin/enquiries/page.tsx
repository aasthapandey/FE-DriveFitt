import type { Metadata } from "next";
import EnquiryAdminDashboard from "@/components/EnquiryAdminDashboard";

export const metadata: Metadata = {
  title: "Enquiry Dashboard | Drive FITT",
  description: "Drive FITT enquiry management dashboard.",
  robots: { index: false, follow: false },
};

export default function EnquiryAdminPage() {
  return <EnquiryAdminDashboard />;
}
