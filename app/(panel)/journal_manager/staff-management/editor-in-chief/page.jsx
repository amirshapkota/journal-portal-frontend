'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterToolbar, ErrorCard } from '@/features/shared/components';
import { useGetJournals } from '@/features/panel/journal-manager';
import {
  EditorStatsCards,
  EditorInChiefTable,
  AssignEditorDialog,
} from '@/features/panel/journal-manager/components/staff';

export default function EditorInChiefPage() {
  const searchParams = useSearchParams();
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);

  const searchParam = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  // Fetch journals with search params
  const params = {
    search: searchParam || '',
    page: currentPage,
  };

  const {
    data: journalsData,
    isPending: isJournalsLoading,
    isError: isJournalsError,
    error: journalsError,
    refetch: refetchJournals,
  } = useGetJournals({ params });

  const journals = journalsData?.results || [];

  const handleAssignEditor = (journal) => {
    setSelectedJournal(journal);
    setIsAssignDialogOpen(true);
  };

  if (isJournalsError) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Editor-in-Chief Management</h1>
          <p className="text-muted-foreground">
            Assign and manage editor-in-chief for all journals
          </p>
        </div>
        <ErrorCard
          title="Failed to load journals"
          description={journalsError?.message || 'Unable to fetch journals'}
          onRetry={refetchJournals}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Editor-in-Chief Management</h1>
        <p className="text-muted-foreground">Assign and manage editor-in-chief for all journals</p>
      </div>

      {/* Stats */}
      <EditorStatsCards
        journalsData={journalsData}
        journals={journals}
        isLoading={isJournalsLoading}
      />

      {/* Search/Filter */}
      <FilterToolbar>
        <FilterToolbar.Search placeholder="Search journals..." />
      </FilterToolbar>

      {/* Table */}
      <EditorInChiefTable
        journals={journals}
        isLoading={isJournalsLoading}
        onAssignEditor={handleAssignEditor}
      />

      {/* Assign/Change Editor Dialog */}
      <AssignEditorDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        journal={selectedJournal}
      />
    </div>
  );
}
