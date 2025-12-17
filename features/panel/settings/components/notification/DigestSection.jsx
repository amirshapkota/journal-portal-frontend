'use client';

import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FormControl, FormField, FormItem } from '@/components/ui/form';

export default function DigestSection({ form }) {
  const masterEnabled = form.watch('email_notifications_enabled');

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-foreground">Digest Emails</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="enable_daily_digest"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-3">
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    disabled={!masterEnabled}
                  />
                </FormControl>
                <Label className="cursor-pointer text-sm text-muted-foreground">Daily Digest</Label>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enable_weekly_digest"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-3">
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    disabled={!masterEnabled}
                  />
                </FormControl>
                <Label className="cursor-pointer text-sm text-muted-foreground">
                  Weekly Digest
                </Label>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
