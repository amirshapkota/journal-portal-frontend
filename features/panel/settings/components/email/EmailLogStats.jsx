/**
 * EmailLogStats - Displays user email log statistics
 * @module features/panel/settings/components/email/EmailLogStats
 */
import StatsCard from "@/features/shared/components/StatsCard";
import { Mail, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";
import React from "react";

/**
 * @param {Object} props
 * @param {Object} props.stats - Statistics data
 */
export default function EmailLogStats({ data, isPending, isError, error }) {
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <StatsCard
            key={i}
            icon={Mail}
            title={" "}
            value={
              <span className="h-8 bg-muted rounded w-2/3 block animate-pulse" />
            }
            valueClass=""
            iconClass="text-muted-foreground"
            cardClass="animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatsCard
          icon={XCircle}
          title="Error"
          value={
            <span className="text-red-600 text-sm">
              {error?.message || "Unknown error"}
            </span>
          }
        />
      </div>
    );
  }

  const stats = data || {
    total: 0,
    sent: 0,
    pending: 0,
    failed: 0,
  };
  const successRate =
    stats.total > 0 ? Math.round((stats.sent / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatsCard
        icon={Mail}
        title="Total"
        value={stats.total}
        valueClass="text-foreground"
        iconClass="text-muted-foreground"
      />
      <StatsCard
        icon={CheckCircle}
        title="Sent"
        value={stats.sent}
        valueClass="text-green-600"
        iconClass="text-green-600"
      />
      <StatsCard
        icon={Clock}
        title="Pending"
        value={stats.pending}
        valueClass="text-yellow-600"
        iconClass="text-yellow-600"
      />
      <StatsCard
        icon={XCircle}
        title="Failed"
        value={stats.failed}
        valueClass="text-red-600"
        iconClass="text-red-600"
      />
      <StatsCard
        icon={TrendingUp}
        title="Success Rate"
        value={`${successRate}%`}
        valueClass="text-blue-600"
        iconClass="text-blue-600"
      />
    </div>
  );
}
