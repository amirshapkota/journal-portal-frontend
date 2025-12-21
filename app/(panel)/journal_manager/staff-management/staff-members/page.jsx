'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { FilterToolbar, ErrorCard, Pagination } from '@/features/shared/components';
import { useGetJournals } from '@/features/panel/journal-manager';
import {
  StaffMembersTable,
  AddStaffDialog,
  EditStaffDialog,
  DeleteStaffDialog,
} from '@/features/panel/journal-manager/components/staff';

export default function StaffMembersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const searchParam = searchParams.get('search') || '';
  const journalParam = searchParams.get('journal') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const params = {
    search: searchParam || '',
    journal: journalParam || '',
    page: currentPage,
  };

  // Fetch journals with backend filtering and pagination
  const {
    data: journalsData,
    isPending: isJournalsLoading,
    isError: isJournalsError,
    error: journalsError,
    refetch: refetchJournals,
  } = useGetJournals({ params });

  const journals = journalsData?.results || [];

  // Aggregate all staff from all journals and filter out journal_manager and Editor_in_chief
  const allStaff = journals.flatMap((journal) =>
    (journal.staff_members || [])
      .filter((staff) => staff.role !== 'JOURNAL_MANAGER' && staff.role !== 'EDITOR_IN_CHIEF')
      .map((staff) => ({
        ...staff,
        journal_id: journal.id,
        journal_title: journal.title,
      }))
  );

  const handleAddStaff = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditStaff = (staff) => {
    setSelectedStaff(staff);
    setIsEditDialogOpen(true);
  };

  const handleDeleteStaff = (staff) => {
    setSelectedStaff(staff);
    setIsDeleteDialogOpen(true);
  };

  if (isJournalsError) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Staff Members</h1>
          <p className="text-muted-foreground">Manage all staff members across journals</p>
        </div>
        <ErrorCard
          title="Failed to load data"
          description={journalsError?.message || 'Unable to fetch journals and staff'}
          onRetry={refetchJournals}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Staff Members</h1>
        <p className="text-muted-foreground">Manage all staff members across journals</p>
      </div>

      {/* Search/Filter and Add Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <FilterToolbar>
            <FilterToolbar.Search placeholder="Search staff..." />
            <FilterToolbar.Select
              param="journal"
              placeholder="All Journals"
              options={journals.map((j) => ({ value: j.id.toString(), label: j.title }))}
            />
          </FilterToolbar>
        </div>
      </div>
      <article className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium ">Staff Members List</h2>
        </div>
        <Button onClick={handleAddStaff}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Staff
        </Button>
      </article>
      {/* Table */}
      <StaffMembersTable
        staffMembers={allStaff}
        isLoading={isJournalsLoading}
        onEditStaff={handleEditStaff}
        onDeleteStaff={handleDeleteStaff}
      />

      {/* Pagination */}
      {journalsData && journalsData.count > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(journalsData.count / 10)}
          totalCount={journalsData.count}
          pageSize={10}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', page.toString());
            router.push(`?${params.toString()}`, { scroll: false });
          }}
          showPageSizeSelector={false}
        />
      )}

      {/* Dialogs */}
      <AddStaffDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        journals={journals}
      />

      <EditStaffDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        staff={selectedStaff}
        journals={journals}
      />

      <DeleteStaffDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        staff={selectedStaff}
      />
    </div>
  );
}
