"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

export const notificationGroups = [
  {
    title: "Account Activity",
    items: [
      {
        id: "email_on_login",
        label: "Login Notifications",
        description: "Receive an email whenever your account is logged in.",
      },
      {
        id: "email_on_password_change",
        label: "Password Changes",
        description:
          "Get notified when your password or security settings are updated.",
      },
    ],
  },
  {
    title: "ORCID",
    items: [
      {
        id: "email_on_orcid_connected",
        label: "ORCID Connected",
        description:
          "Receive an email confirmation when your ORCID account is successfully linked.",
      },
      {
        id: "email_on_orcid_disconnected",
        label: "ORCID Disconnected",
        description: "Alert when your ORCID connection is removed or expires.",
      },
    ],
  },
  {
    title: "Verification",
    items: [
      {
        id: "email_on_verification_submitted",
        label: "Verification Submitted",
        description: "Notify when verification request is submitted",
      },
      {
        id: "email_on_verification_approved",
        label: "Verification Approved",
        description: "Notify when verification is approved",
      },
      {
        id: "email_on_verification_rejected",
        label: "Verification Rejected",
        description: "Notify when verification is rejected",
      },
      {
        id: "email_on_verification_info_requested",
        label: "Verification Info Requested",
        description: "Notify when admin requests additional information",
      },
    ],
  },
  {
    title: "Submission",
    items: [
      {
        id: "email_on_submission_received",
        label: "Submission Confirmation",
        description:
          "Receive confirmation when your manuscript or article submission is received.",
      },
      {
        id: "email_on_submission_status_change",
        label: "Submission Status Change",
        description: "Notify on submission status changes",
      },
    ],
  },
  {
    title: "Review",
    items: [
      {
        id: "email_on_review_assigned",
        label: "Review Assignment",
        description:
          "Get notified when you are assigned to review a new submission.",
      },
      {
        id: "email_on_review_reminder",
        label: "Review Reminder",
        description: "Send review deadline reminders",
      },
    ],
  },
  {
    title: "Decision",
    items: [
      {
        id: "email_on_decision_made",
        label: "Decision Made",
        description: "Notify when editorial decision is made",
      },
    ],
  },
];

export default function NotificationGroupsList({ form }) {
  const masterEnabled = form.watch("email_notifications_enabled");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {notificationGroups.map((group) => (
        <Card key={group.title} className="p-4">
          <h3 className="font-semibold text-foreground">{group.title}</h3>
          <div className="space-y-4">
            {group.items.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            disabled={!masterEnabled}
                          />
                        </FormControl>
                        <Label className="cursor-pointer text-sm text-muted-foreground">
                          {item.label}
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
