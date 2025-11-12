"use client";

import { useState } from "react";
import { useToggle } from "@/features/shared/hooks/useToggle";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import {
  ConfirmationPopup,
  LoadingScreen,
  useDeleteUser,
  useGetUsers,
  UserDetailsModal,
  UserTable,
  useUpdateUser,
} from "@/features";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function UserManagementPage() {
  const queryClient = useQueryClient();

  const {
    data: users,
    isPending: isUsersDataPending,
    error: UserDataError,
  } = useGetUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userNameToDelete, setUserNameToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const toggleDeleteDialog = () =>
    setDeleteDialogOpen((prevState) => !prevState);

  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setDeleteDialogOpen(false);
      setUserIdToDelete(null);
      setUserNameToDelete(null);
      deleteUserMutation.reset();
    },
    onError: (error) => {
      toast.error(
        `Error deleting user: ${error.message}` || "Failed to delete user"
      );
    },
  });

  // Delete user handler with confirmation popup
  const handleDeleteUser = (user) => {
    setUserIdToDelete(user.id);
    setUserNameToDelete(
      user.profile.display_name || `${user.first_name} ${user.last_name}`
    );
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userIdToDelete) return;
    await deleteUserMutation.mutateAsync(userIdToDelete);
  };

  if (isUsersDataPending) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">
          Manage all registered users, roles, and verification statuses.
        </p>
      </div>

      {/* Toolbar */}
      <Card className="">
        <CardContent className=" space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="w-full lg:w-48">
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Verification Status
              </label>
              <Select
                value={verificationFilter}
                onValueChange={setVerificationFilter}
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full lg:w-48">
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Account Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className={"w-full"}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <UserTable
        users={users?.results || []}
        onViewDetails={(user) => {
          setSelectedUser(user);
          setIsDetailsOpen(true);
        }}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsDetailsOpen(true);
        }}
        onDelete={(user) => handleDeleteUser(user)}
      />

      {/* Delete Confirmation Popup */}
      <ConfirmationPopup
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setTimeout(() => {
              setUserIdToDelete(null);
              setUserNameToDelete(null);
            }, 500);
          }
        }}
        title={`Delete ${userNameToDelete?.toUpperCase()} `}
        description={`Are you sure you want to delete this user? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isPending={deleteUserMutation.isPending || false}
        isSuccess={deleteUserMutation.isSuccess || false}
        onConfirm={confirmDeleteUser}
        autoClose={true}
      />

      {/* Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={(user) => {
          // Handle edit logic
          setIsDetailsOpen(false);
        }}
      />
    </div>
  );
}
