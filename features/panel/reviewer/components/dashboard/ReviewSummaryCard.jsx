import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ReviewSummaryCard - Displays review summary statistics
 * @param {Object} props
 * @param {Object} props.statistics - Statistics data
 * @param {boolean} [props.isLoading] - Show loading state
 */
export default function ReviewSummaryCard({ statistics, isLoading = false }) {
  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="text-lg">Review Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Review Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">Total Assignments</span>
            <span className="text-lg font-bold text-primary">
              {statistics?.total_assignments || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">Completed</span>
            <span className="text-lg font-bold text-green-600">
              {statistics?.completed || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">Pending</span>
            <span className="text-lg font-bold text-yellow-600">
              {statistics?.pending || 0}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium">Declined</span>
            <span className="text-lg font-bold text-muted-foreground">
              {statistics?.declined || 0}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
