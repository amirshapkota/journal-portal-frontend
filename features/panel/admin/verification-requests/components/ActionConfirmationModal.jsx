'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormTextareaField } from '@/features/shared/components';

// Zod schemas
const rejectionSchema = z.object({
  rejection_reason: z.string().min(1, 'Rejection reason is required'),
  admin_notes: z.string().optional(),
});
const approveSchema = z.object({
  admin_notes: z.string().optional(),
});
const requestInfoSchema = z.object({
  additional_info_requested: z.string().min(1, 'Message to user is required'),
  admin_notes: z.string().optional(),
});

export function ActionConfirmationPopup({
  isOpen,
  action,
  userName,
  onApprove,
  onReject,
  onRequestInfo,
  onCancel,
  isLoading = false,
}) {
  const isReject = action === 'reject';
  const isApprove = action === 'approve';
  const isRequestInfo = action === 'request-info';

  // Use correct schema and default values
  const form = useForm({
    resolver: zodResolver(
      isReject
        ? rejectionSchema
        : isApprove
          ? approveSchema
          : isRequestInfo
            ? requestInfoSchema
            : approveSchema
    ),
    defaultValues: isReject
      ? { rejection_reason: '', admin_notes: '' }
      : isRequestInfo
        ? { additional_info_requested: '', admin_notes: '' }
        : { admin_notes: '' },
  });

  const onFormSubmit = (values) => {
    if (isReject) {
      onReject(values);
    } else if (isApprove) {
      onApprove(values);
    } else if (isRequestInfo) {
      onRequestInfo(values);
    }
    form.reset();
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  // Only render dialog content if action is approve, reject, or request-info
  const shouldShowForm = isApprove || isReject || isRequestInfo;

  return (
    <AlertDialog open={isOpen && shouldShowForm} onOpenChange={handleCancel}>
      {shouldShowForm && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isReject
                ? 'Reject Verification?'
                : isApprove
                  ? 'Approve Verification?'
                  : 'Request Additional Information'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isReject
                ? `You are about to reject ${userName}'s verification request.`
                : isApprove
                  ? `You are about to approve ${userName}'s verification request.`
                  : `You are about to request additional information from ${userName}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <div className="space-y-4">
              {isReject && (
                <FormTextareaField
                  name="rejection_reason"
                  label={
                    <span>
                      Rejection Reason
                      <span className="text-destructive ml-1">*</span>
                    </span>
                  }
                  control={form.control}
                  required
                  placeholder="Provide a clear reason for rejection"
                  rows={3}
                />
              )}
              {isRequestInfo && (
                <FormTextareaField
                  name="additional_info_requested"
                  label={
                    <span>
                      Message to User
                      <span className="text-destructive ml-1">*</span>
                    </span>
                  }
                  control={form.control}
                  required
                  placeholder="Please provide the additional information you need."
                  rows={3}
                />
              )}

              {/* Admin notes for all */}
              <FormTextareaField
                name="admin_notes"
                label="Admin Notes (Optional)"
                control={form.control}
                placeholder="Internal notes for admin records"
                rows={2}
              />
              <div className="flex gap-3 justify-end">
                <AlertDialogCancel type="button" disabled={isLoading} onClick={handleCancel}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  type="button"
                  disabled={isLoading}
                  onClick={form.handleSubmit(onFormSubmit)}
                  className={
                    isReject
                      ? 'bg-destructive hover:bg-destructive/90'
                      : isRequestInfo
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : ''
                  }
                >
                  {isLoading
                    ? 'Processing...'
                    : isReject
                      ? 'Reject'
                      : isRequestInfo
                        ? 'Send Request'
                        : 'Approve'}
                </AlertDialogAction>
              </div>
            </div>
          </Form>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
