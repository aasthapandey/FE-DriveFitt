import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryPage/EnquiryForm";

export const metadata: Metadata = {
  title: "Enquiry | Drive FITT",
  description: "Submit an enquiry to the Drive FITT team.",
  robots: { index: false, follow: false },
};

export default function NewClientEnquiryPage() {
  return <EnquiryForm />;
}
