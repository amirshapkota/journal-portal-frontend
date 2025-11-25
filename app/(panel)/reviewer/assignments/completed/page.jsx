"use client";

import { FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetCompletedAssignments } from "@/features/panel/reviewer/hooks/query/useGetCompletedAssignments";
import { AssignmentCard } from "../../../../../features/panel/reviewer/components/assignments/AssignmentCard";
import { EmptyState } from "../../../../../features/panel/reviewer/components/assignments/EmptyState";
import { ErrorCard } from "@/features";

export default function CompletedAssignmentsPage() {
  const {
    data: assignmentsData,
    isLoading,
    error,
    refetch,
  } = useGetCompletedAssignments();

  const completedAssignments = Array.isArray(assignmentsData)
    ? assignmentsData
    : assignmentsData?.results || [];

  if (isLoading) {
    return (
      <div className="space-y-4 mt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6">
        <ErrorCard
          title="Failed to Load Completed Assignments"
          description={
            error?.message ||
            "Unable to load your completed review assignments. Please try again."
          }
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 mt-6">
        {completedAssignments.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No completed reviews"
            description="You haven't completed any reviews yet"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
