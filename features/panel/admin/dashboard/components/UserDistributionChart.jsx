"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-4)",
  "var(--chart-3)",
  "var(--chart-5)",
];

export function UserDistributionChart({ data, isPending }) {
  // Build chart data from provided analytics `users` object.
  // We include: Verified, Pending Verifications, Authors, Reviewers.
  // Values fall back to 0 when not provided. Filter out zero-value segments.
  const raw = {
    Verified: data?.verified || 0,
    "Pending Verifications": data?.pending_verifications || 0,
    Authors: data?.authors || 0,
    Reviewers: data?.reviewers || 0,
  };

  const chartData = Object.entries(raw)
    .map(([name, value]) => ({ name, value }))
    .filter((d) => d.value > 0);

  const allZero = chartData.length === 0;

  return (
    <Card className="shadow-new">
      <CardHeader>
        <CardTitle>User Verification Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex items-center justify-center h-[260px] text-muted-foreground animate-pulse">
            Loading chart...
          </div>
        ) : allZero ? (
          <div className="flex items-center justify-center h-[260px] text-muted-foreground">
            No user distribution data to display at this time.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                itemStyle={{ color: "var(--popover-foreground)" }}
                labelStyle={{ color: "var(--muted-foreground)" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
