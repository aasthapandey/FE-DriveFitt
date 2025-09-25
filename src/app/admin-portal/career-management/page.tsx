"use client";

import AdminHeader from "@/components/AdminPortal/AdminHeader";
import CareerSection from "@/components/AdminPortal/CareerSection";
import JobPostApplicationSection from "@/components/AdminPortal/JobPostApplicationSection";
import { AdminUser } from "@/types/adminPortal";

// Mock user data - in real implementation, this would come from authentication
const mockUser: AdminUser = {
  name: "Admin",
  email: "admin@drivefitt.com",
};

const CareerApplicationList = [
  {
    title: "Open Position",
    quantity: 10,
  },
  {
    title: "Application received",
    quantity: 200,
  },
  {
    title: "Today's application",
    quantity: 10,
  },
  {
    title: "Shortlisted candidates",
    quantity: 16,
  },
];

export default function CareerManagementPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <AdminHeader
        title="Career management"
        user={mockUser}
        showSearchButton={false}
        showAddButton={false}
      />

      <div className="px-10 pb-10">
        {/* Career Application List Section */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {CareerApplicationList.map((item, index) => (
            <CareerSection
              key={index}
              title={item.title}
              quantity={item.quantity}
            />
          ))}
        </div>

        {/* Job Post Application Section */}
        <JobPostApplicationSection />
      </div>
    </div>
  );
}
