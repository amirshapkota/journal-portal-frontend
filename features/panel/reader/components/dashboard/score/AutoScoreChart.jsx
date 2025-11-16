"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";

export function AutoScoreChart({ scoreBreakdown, totalScore }) {
  // Compute chart data efficiently
  const chartData = useMemo(() => {
    if (!scoreBreakdown || scoreBreakdown.length === 0) {
      return [{ name: "No Data", value: 100 }];
    }

    const completedItems = scoreBreakdown.filter(
      (item) => item.status === "completed"
    );
    const maxPossibleScore = scoreBreakdown.reduce(
      (sum, item) => sum + item.points_possible,
      0
    );
    const remainingPoints = maxPossibleScore - totalScore;

    const data = completedItems.map((item) => ({
      name: item.criterion,
      value: item.points_earned,
    }));

    if (remainingPoints > 0) {
      data.push({ name: "Remaining", value: remainingPoints });
    }

    return data;
  }, [scoreBreakdown, totalScore]);

  const maxPossibleScore = useMemo(() => {
    if (!scoreBreakdown || scoreBreakdown.length === 0) return 100;
    return scoreBreakdown.reduce((sum, item) => sum + item.points_possible, 0);
  }, [scoreBreakdown]);

  // Color palette
  const COLORS = [
    "hsl(142, 76%, 36%)",
    "hsl(142, 70%, 45%)",
    "hsl(142, 65%, 50%)",
    "hsl(160, 60%, 45%)",
    "hsl(173, 58%, 39%)",
    "hsl(197, 71%, 33%)",
    "hsl(221, 83%, 53%)",
  ];

  // Get color for a segment
  const getColor = (index) => COLORS[index % COLORS.length];

  return (
    <div className="relative w-full h-[300px]">
      {/* Recharts Doughnut */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            isAnimationActive={true}
            activeShape={null}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index)} />
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
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground tabular-nums">
            {totalScore}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            out of {maxPossibleScore}
          </div>
        </div>
      </div>
    </div>
  );
}
