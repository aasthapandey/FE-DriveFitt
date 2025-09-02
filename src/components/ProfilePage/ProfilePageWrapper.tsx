"use client";

import { useEffect, useRef, useState } from "react";
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
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Load user from storage on component mount (only once)
    if (!hasLoadedUser.current) {
      hasLoadedUser.current = true;
      loadUser();
    }
  }, [loadUser]);

  useEffect(() => {
    console.log(
      "ProfilePageWrapper: Authentication check - loading:",
      loading,
      "isAuthenticated:",
      isAuthenticated,
      "hasCheckedAuth:",
      hasCheckedAuth
    );

    // Only redirect if we've completed the initial auth check and user is not authenticated
    if (!loading && hasCheckedAuth && !isAuthenticated) {
      console.log(
        "ProfilePageWrapper: Not authenticated after initial check, redirecting to home"
      );
      router.push("/");
    }

    // Mark that we've completed the initial auth check
    if (!loading) {
      setHasCheckedAuth(true);
    }
  }, [isAuthenticated, loading, router, hasCheckedAuth]);

  // Show loading state only for initial authentication check, not for profile updates
  if (loading && !hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // If not authenticated after initial check, don't render the profile page
  if (hasCheckedAuth && !isAuthenticated) {
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
        user?.membershipInfo?.membershipType?.toString() ||
        data.userInfo.activePlan,
      planExpires: user?.membershipInfo?.expiresAt || data.userInfo.planExpires,
    },
  };

  console.log("ProfilePageWrapper: Rendering profile page with user:", user);
  return (
    <ProfilePage data={updatedData} pageName={pageName} isMobile={isMobile} />
  );
}
