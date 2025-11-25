"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function ErrorStatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Issues</CardDescription>
          <CardTitle className="text-3xl">{stats.total}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Unresolved</CardDescription>
          <CardTitle className="text-3xl text-destructive">
            {stats.unresolved}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Resolved</CardDescription>
          <CardTitle className="text-3xl text-green-600">
            {stats.resolved}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Events</CardDescription>
          <CardTitle className="text-3xl">{stats.totalEvents}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Users Affected</CardDescription>
          <CardTitle className="text-3xl">{stats.affectedUsers}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
