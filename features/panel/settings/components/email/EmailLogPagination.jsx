/**
 * EmailLogPagination - Pagination controls for email log table
 * @module features/panel/settings/components/email/EmailLogPagination
 */
import React from "react";
import { Button } from "@/components/ui/button";

/**
 * @param {Object} props
 * @param {number} currentPage
 * @param {Function} setCurrentPage
 * @param {number} totalEmails
 * @param {number} shownEmails
 */
export default function EmailLogPagination({
  currentPage,
  setCurrentPage,
  totalEmails,
  shownEmails,
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {shownEmails} of {totalEmails} emails
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
