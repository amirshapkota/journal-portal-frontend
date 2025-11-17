"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Mail, User } from "lucide-react";

const STAFF_ROLES = [
  { value: "EDITOR_IN_CHIEF", label: "Editor-in-Chief" },
  { value: "MANAGING_EDITOR", label: "Managing Editor" },
  { value: "ASSOCIATE_EDITOR", label: "Associate Editor" },
  { value: "SECTION_EDITOR", label: "Section Editor" },
  { value: "REVIEWER", label: "Reviewer" },
  { value: "GUEST_EDITOR", label: "Guest Editor" },
];

const ROLE_COLORS = {
  EDITOR_IN_CHIEF: "bg-purple-100 text-purple-800 border-purple-200",
  MANAGING_EDITOR: "bg-blue-100 text-blue-800 border-blue-200",
  ASSOCIATE_EDITOR: "bg-green-100 text-green-800 border-green-200",
  SECTION_EDITOR: "bg-yellow-100 text-yellow-800 border-yellow-200",
  REVIEWER: "bg-gray-100 text-gray-800 border-gray-200",
  GUEST_EDITOR: "bg-orange-100 text-orange-800 border-orange-200",
};

export function StaffSettings({ journalId }) {
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Mock staff data
  const mockStaff = [
    {
      id: "1",
      profile: {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@university.edu",
        affiliation: "University of Technology",
      },
      role: "EDITOR_IN_CHIEF",
      is_active: true,
      added_at: "2024-01-15",
    },
    {
      id: "2",
      profile: {
        id: "2",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@research.org",
        affiliation: "Research Institute",
      },
      role: "MANAGING_EDITOR",
      is_active: true,
      added_at: "2024-02-01",
    },
    {
      id: "3",
      profile: {
        id: "3",
        first_name: "Robert",
        last_name: "Johnson",
        email: "robert.j@college.edu",
        affiliation: "Science College",
      },
      role: "SECTION_EDITOR",
      is_active: true,
      added_at: "2024-03-10",
    },
  ];

  const handleAddStaff = (data) => {
    console.log("Adding staff:", data);
    toast.success("Staff member added successfully");
    setIsAddStaffOpen(false);
  };

  const handleEditStaff = (data) => {
    console.log("Editing staff:", data);
    toast.success("Staff member updated successfully");
    setIsEditStaffOpen(false);
    setSelectedStaff(null);
  };

  const handleRemoveStaff = (staffId) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      console.log("Removing staff:", staffId);
      toast.success("Staff member removed successfully");
    }
  };

  const getRoleLabel = (role) => {
    return STAFF_ROLES.find((r) => r.value === role)?.label || role;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Editorial Team</CardTitle>
            <CardDescription>
              Manage editors, reviewers, and other journal staff members
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddStaffOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Affiliation</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStaff.length > 0 ? (
                mockStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-medium">
                          {staff.profile.first_name} {staff.profile.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {staff.profile.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{staff.profile.affiliation}</TableCell>
                    <TableCell>
                      <Badge className={ROLE_COLORS[staff.role]}>
                        {getRoleLabel(staff.role)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(staff.added_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setIsEditStaffOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveStaff(staff.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    <p>No staff members yet</p>
                    <p className="text-sm mt-1">Click "Add Staff" to get started</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <AddStaffDialog
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
        onSubmit={handleAddStaff}
      />

      {/* Edit Staff Dialog */}
      {selectedStaff && (
        <EditStaffDialog
          isOpen={isEditStaffOpen}
          onClose={() => {
            setIsEditStaffOpen(false);
            setSelectedStaff(null);
          }}
          onSubmit={handleEditStaff}
          staff={selectedStaff}
        />
      )}
    </div>
  );
}

function AddStaffDialog({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    profile_id: "",
    role: "",
  });

  // Mock profiles - in real app, fetch from API
  const mockProfiles = [
    { id: "1", name: "Dr. Alice Brown", email: "alice.brown@university.edu" },
    { id: "2", name: "Prof. Michael Chen", email: "m.chen@institute.org" },
    { id: "3", name: "Dr. Sarah Wilson", email: "s.wilson@college.edu" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ profile_id: "", role: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Staff Member</DialogTitle>
          <DialogDescription>
            Select a user profile and assign a role to add them to the editorial team
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile">User Profile</Label>
            <Select
              value={formData.profile_id}
              onValueChange={(value) => setFormData({ ...formData, profile_id: value })}
              required
            >
              <SelectTrigger id="profile">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {mockProfiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.email}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              required
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {STAFF_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Staff</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditStaffDialog({ isOpen, onClose, onSubmit, staff }) {
  const [formData, setFormData] = useState({
    role: staff?.role || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: staff.id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
          <DialogDescription>
            Update the role for {staff?.profile.first_name} {staff?.profile.last_name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>User</Label>
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">
                  {staff?.profile.first_name} {staff?.profile.last_name}
                </p>
                <p className="text-sm text-muted-foreground">{staff?.profile.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              required
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {STAFF_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
