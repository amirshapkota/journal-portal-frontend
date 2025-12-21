'use client';

import { BookOpen, Mail, Edit, Trash2, UserCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/features/shared/components';

const formatRole = (role) => {
  return role
    ?.split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function StaffMembersTable({ staffMembers, isLoading, onEditStaff, onDeleteStaff }) {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (staff) => (
        <div className="flex items-center gap-2">
          <UserCog className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">
            {staff.first_name} {staff.last_name}
          </span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (staff) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Mail className="h-3 w-3" />
          {staff.email}
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (staff) => <Badge variant="secondary">{formatRole(staff.role)}</Badge>,
    },
    {
      key: 'journal',
      header: 'Journal',
      render: (staff) => (
        <div className="flex items-center gap-1">
          <BookOpen className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{staff.journal_title}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (staff) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEditStaff(staff)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteStaff(staff)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={staffMembers}
      columns={columns}
      emptyMessage="No staff members found"
      hoverable={true}
      tableClassName="bg-card border"
      isPending={isLoading}
    />
  );
}
