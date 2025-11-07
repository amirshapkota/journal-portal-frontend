"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { EmailDetailModal } from "@/features";

const mockStatistics = {
  total: 3,
  sent: 0,
  pending: 0,
  failed: 3,
  success_rate: 0,
  by_template_type: {
    EMAIL_VERIFICATION: 3,
  },
};

const mockEmailLogs = [
  {
    id: "eeac2caf-1f5d-48a8-9461-25f4f7320f16",
    recipient: "testuser2@example.com",
    user_email: "testuser2@example.com",
    template_type: "EMAIL_VERIFICATION",
    subject: "Verify Your Email Address - Journal Publication Portal",
    status: "FAILED",
    status_display: "Failed",
    sent_at: null,
    retry_count: 0,
    error_message: 'Invalid address ""',
    created_at: "2025-11-02T06:19:25.325095Z",
  },
  {
    id: "abc123-def456-ghi789",
    recipient: "researcher@university.edu",
    user_email: "researcher@university.edu",
    template_type: "EMAIL_VERIFICATION",
    subject: "Verify Your Email Address - Journal Publication Portal",
    status: "DELIVERED",
    status_display: "Delivered",
    sent_at: "2025-11-01T10:30:00Z",
    retry_count: 0,
    created_at: "2025-11-01T10:25:00Z",
  },
  {
    id: "xyz789-abc123-def456",
    recipient: "editor@journal.org",
    user_email: "editor@journal.org",
    template_type: "EMAIL_VERIFICATION",
    subject: "Verify Your Email Address - Journal Publication Portal",
    status: "OPENED",
    status_display: "Opened",
    sent_at: "2025-10-30T14:15:00Z",
    retry_count: 0,
    created_at: "2025-10-30T14:10:00Z",
  },
];

const statusColors = {
  SENT: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  PENDING: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  FAILED: "bg-red-500/10 text-red-700 dark:text-red-400",
  DELIVERED: "bg-green-500/10 text-green-700 dark:text-green-400",
  OPENED: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
};

const templateTypeColors = {
  EMAIL_VERIFICATION: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  PASSWORD_RESET: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  SUBMISSION_NOTIFICATION: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  REVIEW_ASSIGNMENT: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400",
};

const StatIcon = ({ type }) => {
  switch (type) {
    case "total":
      return <Mail className="h-5 w-5" />;
    case "sent":
      return <CheckCircle className="h-5 w-5" />;
    case "pending":
      return <Clock className="h-5 w-5" />;
    case "failed":
      return <XCircle className="h-5 w-5" />;
    case "success_rate":
      return <TrendingUp className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function EmailLogTab() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmails = mockEmailLogs.filter((email) => {
    if (statusFilter !== "all" && email.status !== statusFilter) return false;
    if (templateFilter !== "all" && email.template_type !== templateFilter)
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Email History
        </h2>
      </div>

      {/* Statistics with Icons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {mockStatistics.total}
          </p>
        </Card>
        <Card className="p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Sent
            </p>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {mockStatistics.sent}
          </p>
        </Card>
        <Card className="p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-yellow-600" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Pending
            </p>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {mockStatistics.pending}
          </p>
        </Card>
        <Card className="p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Failed
            </p>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {mockStatistics.failed}
          </p>
        </Card>
        <Card className="p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Success Rate
            </p>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {mockStatistics.success_rate}%
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border border-border">
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
              <SelectItem value="SUBMISSION_NOTIFICATION">
                Submission
              </SelectItem>
              <SelectItem value="REVIEW_ASSIGNMENT">Review</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Search emails..." className="flex-1" />
        </div>
      </Card>

      {/* Email Table */}
      <Card className="border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-foreground">Created At</TableHead>
              <TableHead className="text-foreground">Template Type</TableHead>
              <TableHead className="text-foreground">Subject</TableHead>
              <TableHead className="text-foreground">Status</TableHead>
              <TableHead className="text-center text-foreground">
                Retries
              </TableHead>
              <TableHead className="text-right text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <TableRow
                  key={email.id}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(email.created_at), "MMM dd, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        templateTypeColors[email.template_type] || ""
                      }`}
                    >
                      {email.template_type.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground max-w-xs truncate">
                    {email.subject}
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusColors[email.status]}`}>
                      {email.status_display}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {email.retry_count}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEmail(email)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No emails found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEmails.length} of {mockEmailLogs.length} emails
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      <EmailDetailModal
        email={selectedEmail}
        open={!!selectedEmail}
        onOpenChange={() => setSelectedEmail(null)}
      />
    </div>
  );
}
