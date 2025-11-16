"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

export function ReviewStatusChart({ data, isPending }) {
  const chartData = [
    { name: "Total", value: data?.total || 0 },
    { name: "Pending", value: data?.pending || 0 },
    { name: "Completed", value: data?.completed || 0 },
    { name: "Declined", value: data?.declined || 0 },
  ];

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-4)",
    "var(--chart-3)",
    "var(--chart-2)",
  ];

  const allZero = chartData.every((d) => d.value === 0);

  return (
    <Card className="shadow-new">
      <CardHeader>
        <CardTitle>Review Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex items-center justify-center h-[260px] text-muted-foreground animate-pulse">
            Loading chart...
          </div>
        ) : allZero ? (
          <div className="flex items-center justify-center h-[260px] text-muted-foreground">
            No review status data to display at this time.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                itemStyle={{ color: "var(--popover-foreground)" }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} name="Review Status">
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
