"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  MessageSquare,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AddProductionDiscussionDialog } from "./AddProductionDiscussionDialog";
import DataTable from "@/features/shared/components/DataTable";

export function ProductionDiscussions({ submissionId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data - replace with actual API call
  const discussions = [
    {
      id: "1",
      topic: "Galley file format clarification",
      created_by_name: "Alice Editor",
      last_reply_at: new Date().toISOString(),
      reply_count: 3,
      is_closed: false,
    },
    {
      id: "2",
      topic: "Layout issues in PDF",
      created_by_name: "Bob Assistant",
      last_reply_at: new Date().toISOString(),
      reply_count: 1,
      is_closed: true,
    },
    {
      id: "3",
      topic: "Proofreading checklist",
      created_by_name: "Carol Proofreader",
      last_reply_at: null,
      reply_count: 0,
      is_closed: false,
    },
  ];
  const isLoading = false;

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.topic?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "topic",
      header: "Name",
      cellClassName: "font-medium",
      render: (row) => (
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="truncate max-w-xs">
            {row.topic || "Untitled Discussion"}
          </span>
        </div>
      ),
    },
    {
      key: "created_by_name",
      header: "From",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {row.created_by_name || "Unknown"}
        </span>
      ),
    },
    {
      key: "last_reply_at",
      header: "Last Reply",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {row.last_reply_at
            ? format(new Date(row.last_reply_at), "MMM d, yyyy")
            : "No replies"}
        </span>
      ),
    },
    {
      key: "reply_count",
      header: "Replies",
      align: "center",
      render: (row) => (
        <Badge variant="secondary">{row.reply_count || 0}</Badge>
      ),
    },
    {
      key: "is_closed",
      header: "Closed",
      align: "center",
      render: (row) =>
        row.is_closed ? (
          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
        ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDiscussion(row.id);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const handleOpenDiscussion = (discussionId) => {
    // Navigate to discussion detail or open modal
    console.log("Open discussion:", discussionId);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Production Discussions</CardTitle>
              <CardDescription className="mt-1">
                Communicate with production assistants about the manuscript
              </CardDescription>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Discussion
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <DataTable
            data={filteredDiscussions}
            columns={columns}
            emptyMessage={
              searchQuery
                ? "No discussions match your search criteria."
                : "No discussions yet. Start a discussion to communicate with production assistants about this manuscript."
            }
            isPending={isLoading}
            hoverable={true}
            tableClassName="bg-card border flex justify-center"
          />
        </CardContent>
      </Card>
      <AddProductionDiscussionDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        submissionId={submissionId}
      />
    </>
  );
}
