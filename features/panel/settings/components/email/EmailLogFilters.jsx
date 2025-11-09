/**
 * EmailLogFilters - Filter controls for email log table
 * @module features/panel/settings/components/email/EmailLogFilters
 */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

/**
 * @param {Object} props
 * @param {string} statusFilter
 * @param {Function} setStatusFilter
 * @param {string} templateFilter
 * @param {Function} setTemplateFilter
 * @param {string} searchValue
 * @param {Function} setSearchValue
 */
export default function EmailLogFilters({
  statusFilter,
  setStatusFilter,
  templateFilter,
  setTemplateFilter,
  searchValue,
  setSearchValue,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="SENT">Sent</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="DELIVERED">Delivered</SelectItem>
          <SelectItem value="OPENED">Opened</SelectItem>
          <SelectItem value="FAILED">Failed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={templateFilter} onValueChange={setTemplateFilter}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Email Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="EMAIL_VERIFICATION">Verification</SelectItem>
          <SelectItem value="PASSWORD_RESET">Password Reset</SelectItem>
          <SelectItem value="SUBMISSION_NOTIFICATION">Submission</SelectItem>
          <SelectItem value="REVIEW_ASSIGNMENT">Review</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search emails..."
        className="flex-1"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
