"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { JournalInfoCard } from "@/features/panel/reviewer/components/review-detail/JournalInfoCard";

export function InactiveJournalDetailsModal({
  journal,
  isOpen,
  onClose,
  onActivate,
  isActivating,
}) {
  if (!journal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[85%] lg:max-w-[60%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{journal.title}</DialogTitle>
          <DialogDescription>{journal.short_name}</DialogDescription>
        </DialogHeader>

        {/* Status Banner */}
        <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-6">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <div>
            <p className="font-medium text-yellow-900 dark:text-yellow-100">
              Inactive Journal
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This journal is currently inactive and not visible to users.
            </p>
          </div>
        </div>

        {/* Reusable Journal Info Card */}
        <JournalInfoCard journal={journal} />

        <DialogFooter className="gap-2 mt-8">
          <Button variant="outline" onClick={onClose} disabled={isActivating}>
            Close
          </Button>
          <Button
            onClick={() => onActivate(journal)}
            disabled={isActivating}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            {isActivating ? "Activating..." : "Activate Journal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
