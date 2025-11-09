"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export function UserDetailsModal({ user, isOpen, onClose, onEdit }) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.profile.avatar || ""} />
                  <AvatarFallback className="bg-primary/20 text-base">
                    {(
                      user.profile.display_name ||
                      `${user.first_name} ${user.last_name}`
                    )
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold">
                    {user.profile.display_name ||
                      `${user.first_name} ${user.last_name}`}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex gap-2 pt-2">
                    <Badge variant={user.is_active ? "default" : "outline"}>
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge
                      className={
                        user.profile.verification_status === "VERIFIED"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                          : ""
                      }
                      variant="secondary"
                    >
                      {user.profile.verification_status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  ORCID ID
                </p>
                <p className="text-sm font-mono">
                  {user.profile.orcid_id || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Affiliation
                </p>
                <p className="text-sm">
                  {user.profile.affiliation_name || "Not provided"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Activity Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Joined
                </p>
                <p className="text-sm">
                  {format(new Date(user.date_joined), "PPP p")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Login
                </p>
                <p className="text-sm">
                  {user.last_login
                    ? format(new Date(user.last_login), "PPP p")
                    : "Never"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(user)}>Edit User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
