import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/**
 * ReviewRecommendationsChart - Displays recommendations distribution pie chart
 * @param {Object} props
 * @param {Object} props.recommendations - Recommendations data
 * @param {boolean} [props.isLoading] - Show loading state
 */
export default function ReviewRecommendationsChart({
  recommendations,
  isLoading = false,
}) {
  const chartData = [
    {
      name: "Accept",
      value: recommendations?.Accept || 0,
      fill: "#10b981",
    },
    {
      name: "Minor Revision",
      value: recommendations?.["Minor Revision"] || 0,
      fill: "#f59e0b",
    },
    {
      name: "Reject",
      value: recommendations?.Reject || 0,
      fill: "#ef4444",
    },
  ];

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="text-lg">
            Recommendations Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted rounded flex items-center justify-center">
            <span className="text-muted-foreground">Loading chart...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recommendations Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData.filter((item) => item.value > 0)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
