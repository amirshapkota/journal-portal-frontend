import React from "react";
import StatsCard from "@/features/shared/components/StatsCard";
import { StatsErrorCard } from "@/features/shared";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

/**
 * ReviewerDashboardStats - Displays reviewer statistics cards
 * @param {Object} props
 * @param {Object} props.statistics - Statistics data
 * @param {boolean} [props.isLoading] - Show loading skeletons
 * @param {boolean} [props.isError] - Show error state
 * @param {Object} [props.error] - Error object
 */
export default function ReviewerDashboardStats({
  statistics,
  isLoading = false,
  isError = false,
  error,
}) {
  if (isError) {
    return (
      <StatsErrorCard
        title="Failed to load reviewer stats"
        message={error?.message || "Unknown error"}
      />
    );
  }

  const statsCards = [
    {
      icon: ClipboardList,
      title: "Pending Invitations",
      value: statistics?.pending || 0,
      iconClass: "text-yellow-500",
      valueClass: "text-foreground",
      description: "Awaiting your response",
    },
    {
      icon: CheckCircle2,
      title: "Accepted Reviews",
      value: statistics?.accepted || 0,
      iconClass: "text-blue-500",
      valueClass: "text-foreground",
      description: "In progress or completed",
    },
    {
      icon: Clock,
      title: "Completed Reviews",
      value: statistics?.completed || 0,
      iconClass: "text-green-500",
      valueClass: "text-foreground",
      description: statistics?.average_review_time?.avg_days
        ? `Avg time: ${statistics.average_review_time.avg_days} days`
        : "No data",
    },
    {
      icon: AlertTriangle,
      title: "Overdue Reviews",
      value: statistics?.overdue || 0,
      iconClass: "text-red-500",
      valueClass: "text-foreground",
      description: "Action required",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card) => (
        <StatsCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          value={card.value}
          iconClass={card.iconClass}
          valueClass={card.valueClass}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
