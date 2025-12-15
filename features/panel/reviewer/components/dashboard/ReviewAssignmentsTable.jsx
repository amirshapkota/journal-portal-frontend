"use client";

import EllipsisTooltip from "@/components/ui/EllipsisTooltip";
import { DataTable, StatusBadge, statusConfig } from "@/features/shared";
import { format } from "date-fns";

/**
 * ReviewAssignmentsTable - Displays review assignments in a table
 * @param {Object} props
 * @param {Array} props.assignments - Review assignments data
 * @param {Function} props.onAcceptReview - Callback for accepting review
 * @param {Function} props.onDeclineReview - Callback for declining review
 * @param {Function} props.onStartReview - Callback for starting review
 * @param {Function} props.onDownloadFiles - Callback for downloading files
 * @param {boolean} [props.isPending] - Show loading state
 * @param {Object} [props.error] - Error object
 */

// Custom status config for review assignments
const reviewAssignmentStatusConfig = {
  PENDING: {
    bg: "bg-yellow-100 dark:bg-yellow-900",
    text: "text-yellow-700 dark:text-yellow-300",
    label: "Pending",
  },
  ACCEPTED: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-700 dark:text-blue-300",
    label: "Accepted",
  },
  COMPLETED: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-700 dark:text-green-300",
    label: "Completed",
  },
  OVERDUE: {
    bg: "bg-red-100 dark:bg-red-900",
    text: "text-red-700 dark:text-red-300",
    label: "Overdue",
  },
};

export default function ReviewAssignmentsTable({
  assignments,
  onAcceptReview,
  onDeclineReview,
  onStartReview,
  onDownloadFiles,
  isPending = false,
  error = null,
}) {
  const columns = [
    {
      key: "submission_number",
      header: "Submission #",
      render: (row) =>
        row.submission_details?.submission_number ||
        row.submission_number ||
        "-",
    },
    {
      key: "submission_title",
      header: "Submission Title",
      render: (row) => (
        <EllipsisTooltip
          text={row.submission_title || row.submission_details?.title || "N/A"}
        />
      ),
    },
    {
      key: "journal_name",
      header: "Journal",
      cellClassName: "text-sm",
      render: (row) => (
        <EllipsisTooltip
          text={row.submission_details?.journal?.title || "N/A"}
        />
      ),
    },

    {
      key: "status",
      header: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          statusConfig={reviewAssignmentStatusConfig}
        />
      ),
    },
    {
      key: "due_date",
      header: "Due Date",
      render: (row) => (
        <span className="text-sm">
          {format(new Date(row.due_date), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      key: "days_remaining",
      header: "Days Remaining",
      render: (row) => (
        <div
          className={`text-sm font-semibold ${
            row.is_overdue
              ? "text-red-600 dark:text-red-400"
              : "text-green-600 dark:text-green-400"
          }`}
        >
          {row.is_overdue
            ? `${Math.abs(row.days_remaining)} days overdue`
            : `${row.days_remaining} days left`}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={assignments?.results || []}
      columns={columns}
      emptyMessage="No review assignments yet."
      isPending={isPending}
      error={error}
      errorMessage="Error loading review assignments"
      hoverable={true}
      tableClassName="bg-card border"
    />
  );
}
