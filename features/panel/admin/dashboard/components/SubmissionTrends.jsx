'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = {
  '7d': [
    { date: 'Mon', submitted: 120, reviewed: 89 },
    { date: 'Tue', submitted: 200, reviewed: 120 },
    { date: 'Wed', submitted: 150, reviewed: 110 },
    { date: 'Thu', submitted: 220, reviewed: 140 },
    { date: 'Fri', submitted: 180, reviewed: 130 },
    { date: 'Sat', submitted: 100, reviewed: 70 },
    { date: 'Sun', submitted: 140, reviewed: 95 },
  ],
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    submitted: Math.floor(Math.random() * 300) + 50,
    reviewed: Math.floor(Math.random() * 200) + 30,
  })),
};

export function SubmissionTrendsChart({ dateRange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[dateRange]}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            />
            <Legend />
            <Bar dataKey="submitted" fill="var(--chart-3)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="reviewed" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
