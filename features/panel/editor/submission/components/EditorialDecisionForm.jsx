"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateEditorialDecision } from "../hooks/useCreateEditorialDecision";
import { useGetDecisionLetterTemplates } from "../hooks/useGetDecisionLetterTemplates";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const decisionSchema = z.object({
  decision_type: z.enum(
    ["ACCEPT", "REJECT", "MINOR_REVISION", "MAJOR_REVISION"],
    {
      required_error: "Please select a decision type",
    }
  ),
  decision_letter: z
    .string()
    .min(50, "Decision letter must be at least 50 characters"),
  confidential_notes: z.string().optional(),
  revision_deadline: z.string().optional(),
  template_id: z.string().optional(),
});

const DECISION_OPTIONS = [
  {
    value: "ACCEPT",
    label: "Accept",
    description: "Accept the submission for publication",
    color: "text-green-600",
  },
  {
    value: "REJECT",
    label: "Reject",
    description: "Reject the submission",
    color: "text-red-600",
  },
  {
    value: "MINOR_REVISION",
    label: "Minor Revision",
    description: "Request minor revisions",
    color: "text-blue-600",
  },
  {
    value: "MAJOR_REVISION",
    label: "Major Revision",
    description: "Request major revisions",
    color: "text-orange-600",
  },
];

export default function EditorialDecisionForm({ submissionId, reviews = [] }) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: createDecision, isPending } = useCreateEditorialDecision();
  const { data: templates, isLoading: templatesLoading } =
    useGetDecisionLetterTemplates();

  const form = useForm({
    resolver: zodResolver(decisionSchema),
    defaultValues: {
      decision_type: "",
      decision_letter: "",
      confidential_notes: "",
      revision_deadline: "",
      template_id: "",
    },
  });

  const selectedDecisionType = form.watch("decision_type");
  const selectedTemplateId = form.watch("template_id");

  // Load template content when selected
  const handleTemplateSelect = (templateId) => {
    const template = templates?.results?.find(
      (t) => t.id.toString() === templateId
    );
    if (template) {
      form.setValue("decision_letter", template.content);
    }
  };

  const onSubmit = (data) => {
    const payload = {
      submission: submissionId,
      decision_type: data.decision_type,
      decision_letter: data.decision_letter,
      confidential_notes: data.confidential_notes || "",
    };

    // Only add revision_deadline if decision type is revision
    if (
      (data.decision_type === "MINOR_REVISION" ||
        data.decision_type === "MAJOR_REVISION") &&
      data.revision_deadline
    ) {
      payload.revision_deadline = data.revision_deadline;
    }

    createDecision(payload, {
      onSuccess: () => {
        setShowSuccess(true);
        toast.success("Editorial decision submitted successfully");
      },
    });
  };

  if (showSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Editorial Decision Submitted Successfully!
            </h3>
            <p className="text-green-600">
              The decision has been recorded and the submission status has been
              updated.
            </p>
            <p className="text-sm text-green-600 mt-2">
              Redirecting to submissions list...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      {reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reviews Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      Review {index + 1} {index + 1 === 1 ? "(Latest)" : ""}
                    </p>
                    <p className="text-sm text-gray-600">
                      Submitted:{" "}
                      {new Date(review.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        review.recommendation === "ACCEPT"
                          ? "bg-green-100 text-green-700"
                          : review.recommendation === "REJECT"
                          ? "bg-red-100 text-red-700"
                          : review.recommendation === "MINOR_REVISION"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {review.recommendation.replace("_", " ")}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Confidence: {review.confidence_level}/5
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Decision Form */}
      <Card>
        <CardHeader>
          <CardTitle>Make Editorial Decision</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Decision Type */}
              <FormField
                control={form.control}
                name="decision_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Decision Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a decision" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DECISION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className={option.color}>{option.label}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              - {option.description}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Revision Deadline (only for revision decisions) */}
              {(selectedDecisionType === "MINOR_REVISION" ||
                selectedDecisionType === "MAJOR_REVISION") && (
                <FormField
                  control={form.control}
                  name="revision_deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revision Deadline</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            {...field}
                            className="pl-10"
                            min={new Date().toISOString().split("T")[0]}
                          />
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Deadline for authors to submit revisions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Template Selector */}
              <FormField
                control={form.control}
                name="template_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Decision Letter Template (Optional)</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTemplateSelect(value);
                      }}
                      value={field.value || ""}
                      disabled={templatesLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template to auto-fill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates?.results?.map((template) => (
                          <SelectItem
                            key={template.id}
                            value={template.id.toString()}
                          >
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a template to pre-fill the decision letter
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Decision Letter */}
              <FormField
                control={form.control}
                name="decision_letter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Decision Letter *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the decision letter to be sent to the author..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This letter will be sent to the author. Minimum 50
                      characters required.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confidential Notes */}
              <FormField
                control={form.control}
                name="confidential_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confidential Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Internal notes not visible to authors..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      These notes are for internal use only and will not be
                      shared with the author
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit Decision"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
