'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Users, UserCheck, FileText } from 'lucide-react';

export function DashboardStatsCards({ stats, isLoading }) {
  const statsConfig = [
    {
      title: 'Journals Managed',
      value: stats?.journals_managed ?? '0',
      icon: BookOpen,
      valueClass: 'text-chart-1',
      iconClass: 'text-chart-1',
      description: 'Journals under management',
    },
    {
      title: 'Total Staff Members',
      value: stats?.total_staff_members ?? '0',
      icon: Users,
      valueClass: 'text-chart-2',
      iconClass: 'text-chart-2',
      description: 'Editors and staff members',
    },
    {
      title: 'Total Submissions',
      value: stats?.total_submissions ?? '0',
      icon: FileText,
      valueClass: 'text-chart-3',
      iconClass: 'text-chart-3',
      description: 'All submissions',
    },
    {
      title: 'Recent Submissions (30d)',
      value: stats?.recent_submissions_30d ?? '0',
      icon: UserCheck,
      valueClass: 'text-chart-4',
      iconClass: 'text-chart-4',
      description: 'Submissions in last 30 days',
    },
    {
      title: 'Active Submissions',
      value: stats?.active_submissions ?? '0',
      icon: BookOpen,
      valueClass: 'text-chart-5',
      iconClass: 'text-chart-5',
      description: 'Currently active submissions',
    },
    {
      title: 'Published Submissions',
      value: stats?.published_submissions ?? '0',
      icon: FileText,
      valueClass: 'text-chart-6',
      iconClass: 'text-chart-6',
      description: 'Submissions published',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.iconClass}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.valueClass}`}>
                {isLoading ? <Skeleton className={'h-8 w-14'} /> : stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
