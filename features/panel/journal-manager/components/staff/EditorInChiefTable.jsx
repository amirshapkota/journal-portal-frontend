'use client';

import { BookOpen, UserCheck, Mail, Edit, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/features/shared/components';

export function EditorInChiefTable({ journals, isLoading, onAssignEditor }) {
  const columns = [
    {
      key: 'journal',
      header: 'Journal',
      render: (journal) => (
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">{journal.title}</p>
            <p className="text-sm text-muted-foreground">{journal.abbreviation}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'editorInChief',
      header: 'Editor-in-Chief',
      render: (journal) =>
        journal.editor_in_chief ? (
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-green-600" />
            <span className="font-medium">
              {journal.editor_in_chief.first_name} {journal.editor_in_chief.last_name}
            </span>
          </div>
        ) : (
          <Badge variant="destructive">Not Assigned</Badge>
        ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (journal) =>
        journal.editor_in_chief ? (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            {journal.editor_in_chief.email}
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (journal) => (
        <Button variant="outline" size="sm" onClick={() => onAssignEditor(journal)}>
          {journal.editor_in_chief ? (
            <>
              <Edit className="h-4 w-4 mr-1" />
              Change
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-1" />
              Assign
            </>
          )}
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      data={journals}
      columns={columns}
      emptyMessage="No journals found"
      hoverable={true}
      tableClassName="bg-card border"
      isPending={isLoading}
    />
  );
}
