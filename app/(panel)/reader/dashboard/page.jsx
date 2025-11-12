"use client";

import { LoadingScreen, RoleBasedRoute } from "@/features";
import ErrorCard from "@/features/shared/components/ErrorCard";
import {
  ProfileCompletionCard,
  ProfileLinksCard,
  ScoreCard,
  useGetUserScoreStatus,
} from "@/features/panel";

export default function ReaderDashboard() {
  const {
    data: scoreData,
    isPending: isLoadingScore,
    isError,
    error,
    refetch,
  } = useGetUserScoreStatus();

  // Calculate completion percentage from score breakdown
  const scoreBreakdown = scoreData?.latest_request?.score_breakdown || [];
  const completedItems = scoreBreakdown.filter(
    (item) => item.status === "completed"
  ).length;
  const completionPercentage =
    scoreBreakdown.length > 0
      ? (completedItems / scoreBreakdown.length) * 100
      : 0;

  // Error state
  if (isError) {
    return (
      <RoleBasedRoute allowedRoles={["READER"]}>
        <ErrorCard
          title="Failed to load dashboard"
          description="We couldn't load your dashboard data. Please try again."
          details={error?.message || error?.toString()}
          onRetry={refetch}
        />
      </RoleBasedRoute>
    );
  }

  // Pending state for ProfileCompletionCard and ScoreCard
  if (isLoadingScore) {
    return (
      <RoleBasedRoute allowedRoles={["READER"]}>
        <LoadingScreen />
        <div className="mx-auto space-y-5">
          <div>
            <div className="lg:col-span-2">
              <ProfileCompletionCard completionPercentage={0} pending />
            </div>
          </div>

          <ScoreCard pending />
        </div>
      </RoleBasedRoute>
    );
  }

  return (
    <RoleBasedRoute allowedRoles={["READER"]}>
      <div className="mx-auto space-y-5">
        <div>
          <div className="lg:col-span-2">
            <ProfileCompletionCard
              completionPercentage={completionPercentage}
              pending={false}
            />
          </div>
        </div>
        <ScoreCard scoreData={scoreData} pending={false} />
      </div>
    </RoleBasedRoute>
  );
}
