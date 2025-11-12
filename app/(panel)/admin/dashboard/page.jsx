"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, FileText, Clock } from "lucide-react";
import {
  QuickLinksPanel,
  RecentActivityFeed,
  RoleBasedRoute,
  StatsCard,
  StatsErrorCard,
  SubmissionTrendsChart,
  UserGrowthChart,
} from "@/features";

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("30d");

  const statistics = [
    {
      title: "Total Users",
      value: "2,847",
      icon: Users,
      valueClass: "text-foreground",
      iconClass: "text-foreground",
    },
    {
      title: "Total Journals",
      value: "156",
      icon: BookOpen,
      valueClass: "text-chart-3",
      iconClass: "text-chart-3",
    },
    {
      title: "Total Submissions",
      value: "8,324",
      icon: FileText,
      valueClass: "text-secondary",
      iconClass: "text-secondary",
    },
    {
      title: "Active Reviews",
      value: "342",
      icon: Clock,
      valueClass: "text-chart-1",
      iconClass: "text-chart-1",
    },
  ];

  return (
    <RoleBasedRoute allowedRoles={["ADMIN"]}>
      <div className="space-y-5 ">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
        </div>

        {/* Global Statistics Cards */}
        {/* Example error state: set isStatsError and statsError as needed */}
        {false ? (
          <StatsErrorCard
            title="Failed to load admin stats"
            message={"An error occurred while loading admin statistics."}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                valueClass={stat.valueClass}
                iconClass={stat.iconClass}
                isLoading={false} // Set to true to show loading skeleton
              />
            ))}
          </div>
        )}

        {/* Charts Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
            <div className="flex gap-2">
              {["7d", "30d"].map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateRange(range)}
                >
                  {range === "7d" ? "7 Days" : "30 Days"}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <UserGrowthChart dateRange={dateRange} />
            <SubmissionTrendsChart dateRange={dateRange} />
          </div>
        </div>

        {/* Recent Activity and Quick Links */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivityFeed />
          </div>
          <QuickLinksPanel />
        </div>
      </div>
    </RoleBasedRoute>
  );
}
