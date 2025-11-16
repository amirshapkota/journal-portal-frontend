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

const COLORS = ["var(--chart-3)", "var(--chart-2)"];

export function JournalDistributionChart({ data, isPending }) {
  const chartData = [
    { name: "Active", value: data?.active || 0 },
    { name: "Inactive", value: data?.inactive || 0 },
  ];

  const allZero = chartData.every((d) => d.value === 0);

  return (
    <Card className="shadow-new">
      <CardHeader>
        <CardTitle>Journal Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex items-center justify-center h-[260px] text-muted-foreground animate-pulse">
            Loading chart...
          </div>
        ) : allZero ? (
          <div className="flex items-center justify-center h-[260px] text-muted-foreground">
            No journal distribution data to display at this time.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
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
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
