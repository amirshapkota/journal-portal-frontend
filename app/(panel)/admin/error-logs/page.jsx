"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  ErrorLogsTable,
  ErrorDetailsModal,
  ErrorStatsCards,
  ErrorFilters,
  mockErrorIssues,
} from "@/features/panel/admin/error-logs";

export default function ErrorLogsPage() {
  const [issues, setIssues] = useState(mockErrorIssues);
  const [statusFilter, setStatusFilter] = useState("unresolved");
  const [levelFilter, setLevelFilter] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredIssues = issues.filter((issue) => {
    const statusMatch =
      statusFilter === "all" ? true : issue.status === statusFilter;
    const levelMatch =
      levelFilter === "all" ? true : issue.level === levelFilter;
    return statusMatch && levelMatch;
  });

  const handleViewDetail = (issue) => {
    setSelectedIssue(issue);
    setIsDetailOpen(true);
  };

  const handleRefresh = () => {
    // In real implementation, this would fetch fresh data
    console.log("Refreshing error logs...");
  };

  const stats = {
    total: issues.length,
    unresolved: issues.filter((i) => i.status === "unresolved").length,
    resolved: issues.filter((i) => i.status === "resolved").length,
    totalEvents: issues.reduce((sum, i) => sum + i.count, 0),
    affectedUsers: issues.reduce((sum, i) => sum + i.userCount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Error Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage application errors in real-time
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <ErrorStatsCards stats={stats} />

      {/* Filters */}
      <ErrorFilters
        statusFilter={statusFilter}
        levelFilter={levelFilter}
        onStatusChange={setStatusFilter}
        onLevelChange={setLevelFilter}
      />

      {/* Error Logs Table */}
      <ErrorLogsTable
        issues={filteredIssues}
        onViewDetails={handleViewDetail}
        isPending={false}
        error={null}
      />

      {/* Issue Detail Modal */}
      <ErrorDetailsModal
        issue={selectedIssue}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
