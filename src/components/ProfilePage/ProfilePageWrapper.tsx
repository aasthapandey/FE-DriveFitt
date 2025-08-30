"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import ProfilePage from "./ProfilePage";
import { ProfilePageData } from "@/types/staticPages";

interface ProfilePageWrapperProps {
  data: ProfilePageData;
  pageName: string;
  isMobile?: boolean;
}

export default function ProfilePageWrapper({
  data,
  pageName,
  isMobile,
}: ProfilePageWrapperProps) {
  const { isAuthenticated, user, loadUser, loading } = useAuth();
  const router = useRouter();
  const hasLoadedUser = useRef(false);

  useEffect(() => {
    // Load user from storage on component mount (only once)
    if (!hasLoadedUser.current) {
      hasLoadedUser.current = true;
      loadUser();
    }
  }, [loadUser]);

  useEffect(() => {
    // If not authenticated and not loading, redirect to home with login modal
    if (!loading && !isAuthenticated) {
      // We could open a login modal here, but for now redirect to home
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // If not authenticated, don't render the profile page
  if (!isAuthenticated) {
    return null;
  }

  // Update the data with actual user information from Redux
  const updatedData: ProfilePageData = {
    ...data,
    userInfo: {
      name: user?.name || data.userInfo.name,
      email: user?.email || data.userInfo.email,
      phone: user?.phone || data.userInfo.phone,
      dateOfBirth: user?.dateOfBirth || data.userInfo.dateOfBirth,
      activePlan:
        user?.membershipInfo?.membershipType || data.userInfo.activePlan,
      planExpires: user?.membershipInfo?.expiresAt || data.userInfo.planExpires,
    },
  };

  return (
    <ProfilePage data={updatedData} pageName={pageName} isMobile={isMobile} />
  );
}
