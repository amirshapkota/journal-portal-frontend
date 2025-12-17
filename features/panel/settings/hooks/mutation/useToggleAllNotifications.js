import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  enableAllNotifications,
  disableAllNotifications,
} from '../../api/EmailPreferencesApiSlice';
import { toast } from 'sonner';

export const useToggleAllNotifications = () => {
  const queryClient = useQueryClient();

  const enableAllMutation = useMutation({
    mutationFn: enableAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-preferences'] });
      toast.success('All notifications enabled');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to enable all notifications');
    },
  });

  const disableAllMutation = useMutation({
    mutationFn: disableAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-preferences'] });
      toast.success('All notifications disabled');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to disable all notifications');
    },
  });

  return {
    enableAll: enableAllMutation.mutateAsync,
    disableAll: disableAllMutation.mutateAsync,
    isPending: enableAllMutation.isPending || disableAllMutation.isPending,
  };
};
