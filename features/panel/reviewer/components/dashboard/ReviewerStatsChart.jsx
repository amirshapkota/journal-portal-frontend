"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = {
  pending: "var(--chart-1)",
  accepted: "var(--chart-2)",
  completed: "var(--chart-3)",
  declined: "var(--chart-4)",
};

export default function ReviewerStatsChart({ reviewerStats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assignments by Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <Skeleton className="h-[250px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = reviewerStats;
  if (!data) return null;

  const barChartData = [
    { name: "Pending", value: data.pending || 0 },
    { name: "Accepted", value: data.accepted || 0 },
    { name: "Completed", value: data.completed || 0 },
    { name: "Declined", value: data.declined || 0 },
  ];

  const pieChartData = [
    { name: "Pending", value: data.pending, color: COLORS.pending },
    { name: "Accepted", value: data.accepted, color: COLORS.accepted },
    { name: "Completed", value: data.completed, color: COLORS.completed },
    { name: "Declined", value: data.declined, color: COLORS.declined },
  ].filter((item) => item.value > 0);

  if (data.total_assignments === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review Assignments Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No review assignments yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Assignments by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell
                    key={"cell-" + index}
                    fill={Object.values(COLORS)[index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) =>
                  entry.name + ": " + (entry.percent * 100).toFixed(0) + "%"
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={"cell-" + index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
