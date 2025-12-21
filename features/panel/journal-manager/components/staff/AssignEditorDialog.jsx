'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/features/shared/components';
import { useUpdateJournalStaff } from '../../hooks';
import { toast } from 'sonner';
import { useGetUsers } from '@/features/panel/admin';

const formSchema = z.object({
  userId: z.string().min(1, 'Please select a user'),
});

export function AssignEditorDialog({ open, onOpenChange, journal }) {
  const userRole = 'EDITOR';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
    },
  });

  const {
    data: usersData,
    isPending: loadingUsers,
    error: usersError,
  } = useGetUsers(
    { userRole },
    {
      enabled: !!userRole && open,
    }
  );

  const { mutate: updateStaff, isPending } = useUpdateJournalStaff({
    onSuccess: () => {
      toast.success('Editor-in-Chief updated successfully');
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update editor');
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({ userId: '' });
    }
  }, [open, form]);

  const onSubmit = (data) => {
    if (!journal) return;

    updateStaff({
      journalId: journal.id,
      userId: journal.editor_in_chief?.id,
      currentRole: journal.editor_in_chief ? 'EDITOR_IN_CHIEF' : '',
      role: 'EDITOR_IN_CHIEF',
      profile_id: data.userId,
    });
  };

  const userOptions =
    usersData?.results?.map((user) => ({
      value: user.profile.id,
      label: `${user.first_name} ${user.last_name} (${user.email})`,
      description: user.email,
    })) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {journal?.editor_in_chief ? 'Change' : 'Assign'} Editor-in-Chief
          </DialogTitle>
          <DialogDescription>
            Search for a user and assign them as editor-in-chief
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Journal</Label>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{journal?.title}</p>
                <p className="text-sm text-muted-foreground">{journal?.abbreviation}</p>
              </div>
            </div>

            {journal?.editor_in_chief && (
              <div className="space-y-2">
                <Label>Current Editor-in-Chief</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">
                    {journal.editor_in_chief.first_name} {journal.editor_in_chief.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{journal.editor_in_chief.email}</p>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select New Editor-in-Chief</FormLabel>
                  <FormControl>
                    <SearchableSelect
                      options={userOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={loadingUsers ? 'Loading users...' : 'Select a user'}
                      emptyText={
                        usersError
                          ? 'Error loading users'
                          : userOptions.length === 0
                            ? 'No users found with Editor-in-Chief role'
                            : 'No user found.'
                      }
                      searchPlaceholder="Search users by name or email..."
                      disabled={loadingUsers}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
