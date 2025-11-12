"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ReviewerDashboardStats,
  ReviewRecommendationsChart,
  ReviewSummaryCard,
  ReviewAssignmentsTable,
} from "@/features/panel/reviewer/components/dashboard";
import { RoleBasedRoute } from "@/features";

// Mock data for review statistics
const REVIEW_STATISTICS = {
  total_assignments: 12,
  accepted: 4,
  declined: 1,
  completed: 3,
  pending: 3,
  overdue: 1,
  average_review_time: {
    avg_days: 8,
  },
  recommendations_given: {
    Accept: 3,
    "Minor Revision": 1,
    Reject: 1,
  },
};

// Mock data for review assignments
const REVIEW_ASSIGNMENTS = [
  {
    id: "1",
    submission_title: "Machine Learning in Healthcare",
    journal_name: "AI & Medicine Journal",
    status: "PENDING",
    due_date: "2025-11-20T11:09:00.122Z",
    days_remaining: 8,
    is_overdue: false,
  },
  {
    id: "2",
    submission_title: "Quantum Computing Review",
    journal_name: "Physics Letters",
    status: "ACCEPTED",
    due_date: "2025-11-15T11:09:00.122Z",
    days_remaining: 3,
    is_overdue: false,
  },
  {
    id: "3",
    submission_title: "Environmental Policy Reform",
    journal_name: "Sustainability Studies",
    status: "COMPLETED",
    due_date: "2025-11-05T11:09:00.122Z",
    days_remaining: 0,
    is_overdue: true,
  },
  {
    id: "4",
    submission_title: "Blockchain in Supply Chain",
    journal_name: "Tech Innovation Quarterly",
    status: "ACCEPTED",
    due_date: "2025-11-18T11:09:00.122Z",
    days_remaining: 5,
    is_overdue: false,
  },
  {
    id: "5",
    submission_title: "Climate Change Modeling",
    journal_name: "Environmental Science",
    status: "OVERDUE",
    due_date: "2025-10-20T11:09:00.122Z",
    days_remaining: -17,
    is_overdue: true,
  },
];

export default function ReviewerDashboard() {
  // TODO: Replace with actual API calls
  const isLoading = false;
  const isError = false;
  const error = null;

  // Event handlers for table actions
  const handleAcceptReview = (review) => {
    console.log("Accept review:", review);
    // TODO: Implement accept review logic
  };

  const handleDeclineReview = (review) => {
    console.log("Decline review:", review);
    // TODO: Implement decline review logic
  };

  const handleStartReview = (review) => {
    console.log("Start review:", review);
    // TODO: Implement start review logic
  };

  const handleDownloadFiles = (review) => {
    console.log("Download files:", review);
    // TODO: Implement download files logic
  };

  return (
    <RoleBasedRoute allowedRoles={["REVIEWER"]}>
      <div className="space-y-5">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Reviewer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track and manage your peer review assignments
          </p>
        </div>

        {/* Statistics Cards Grid */}
        <ReviewerDashboardStats
          statistics={REVIEW_STATISTICS}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

        {/* Charts and Analytics Section */}
        {REVIEW_STATISTICS.recommendations_given && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ReviewRecommendationsChart
              recommendations={REVIEW_STATISTICS.recommendations_given}
              isLoading={isLoading}
            />
            <ReviewSummaryCard
              statistics={REVIEW_STATISTICS}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Review Assignments Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Review Assignments</h2>
          </div>
          <ReviewAssignmentsTable
            assignments={REVIEW_ASSIGNMENTS}
            onAcceptReview={handleAcceptReview}
            onDeclineReview={handleDeclineReview}
            onStartReview={handleStartReview}
            onDownloadFiles={handleDownloadFiles}
            isPending={isLoading}
            error={error}
          />
        </div>
      </div>
    </RoleBasedRoute>
  );
}
