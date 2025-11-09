"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Download, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  LoadingScreen,
  useGetUsers,
  UserDetailsModal,
  UserTable,
  useUpdateUser,
} from "@/features";

export default function UserManagementPage() {
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

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Verification Status",
      "Account Status",
      "Joined",
      "Last Login",
    ];
    const csvContent = [
      headers.join(","),
      ...users?.results.map((user) =>
        [
          user.profile.display_name || `${user.first_name} ${user.last_name}`,
          user.email,
          user.profile.verification_status,
          user.is_active ? "Active" : "Inactive",
          new Date(user.date_joined).toLocaleDateString(),
          user.last_login
            ? new Date(user.last_login).toLocaleDateString()
            : "Never",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
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
      <Card className="border-0 bg-muted/30">
        <CardContent className="pt-6 space-y-4">
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
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <div>
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
        />
      </div>

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
