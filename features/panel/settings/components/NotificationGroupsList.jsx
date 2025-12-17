'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { FormControl, FormField, FormItem } from '@/components/ui/form';

export const notificationGroups = [
  {
    title: 'Account Activity',
    items: [
      {
        id: 'email_on_login',
        label: 'Login Notifications',
        description:
          'Receive an email whenever your account is accessed from a new device or location.',
      },
      {
        id: 'email_on_password_change',
        label: 'Password Changes',
        description: 'Get notified when your password or security settings are updated.',
      },
      {
        id: 'email_on_profile_update',
        label: 'Profile Updates',
        description: 'Be informed when your personal details or contact information change.',
      },
    ],
  },
  {
    title: 'ORCID',
    items: [
      {
        id: 'email_on_orcid_connected',
        label: 'ORCID Connected',
        description:
          'Receive an email confirmation when your ORCID account is successfully linked.',
      },
      {
        id: 'email_on_orcid_disconnected',
        label: 'ORCID Disconnected',
        description: 'Alert when your ORCID connection is removed or expires.',
      },
      {
        id: 'email_on_orcid_sync',
        label: 'ORCID Sync Updates',
        description: 'Get updates when data between your account and ORCID is synchronized.',
      },
    ],
  },
  {
    title: 'Project Updates',
    items: [
      {
        id: 'email_on_project_created',
        label: 'New Project Created',
        description:
          'Receive a confirmation email when a new project is created under your account.',
      },
      {
        id: 'email_on_project_status_change',
        label: 'Project Status Updates',
        description:
          "Get notified when a project's status changes (e.g., from Draft to Published).",
      },
      {
        id: 'email_on_project_comment',
        label: 'Project Comments',
        description: 'Be alerted when someone comments or gives feedback on your project.',
      },
    ],
  },
  {
    title: 'Collaboration & Invites',
    items: [
      {
        id: 'email_on_invite_received',
        label: 'New Collaboration Invite',
        description: 'Get an email when someone invites you to collaborate on a project.',
      },
      {
        id: 'email_on_invite_accepted',
        label: 'Invite Accepted',
        description: 'Receive confirmation when a collaborator accepts your invitation.',
      },
      {
        id: 'email_on_invite_declined',
        label: 'Invite Declined',
        description: 'Be notified if a collaborator declines your project invitation.',
      },
    ],
  },
  {
    title: 'Publication & Review',
    items: [
      {
        id: 'email_on_submission_received',
        label: 'Submission Confirmation',
        description: 'Receive confirmation when your manuscript or article submission is received.',
      },
      {
        id: 'email_on_review_assigned',
        label: 'Review Assignment',
        description: 'Get notified when you are assigned to review a new submission.',
      },
      {
        id: 'email_on_review_feedback',
        label: 'Review Feedback',
        description: 'Be alerted when reviews or editorial feedback are submitted for your work.',
      },
    ],
  },
  {
    title: 'System & Announcements',
    items: [
      {
        id: 'email_on_system_update',
        label: 'System Updates',
        description: 'Stay informed about upcoming system maintenance or new platform releases.',
      },
      {
        id: 'email_on_newsletter',
        label: 'Monthly Newsletter',
        description: 'Receive our monthly roundup of updates, events, and featured research.',
      },
      {
        id: 'email_on_marketing',
        label: 'Promotions & Offers',
        description: 'Get information about special offers or events relevant to your interests.',
      },
    ],
  },
];

export default function NotificationGroupsList({ form }) {
  const masterEnabled = form.watch('email_notifications_enabled');

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
                      <p className="text-xs text-muted-foreground">{item.description}</p>
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
