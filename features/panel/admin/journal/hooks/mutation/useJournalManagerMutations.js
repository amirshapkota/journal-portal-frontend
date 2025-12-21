import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignJournalManager, removeJournalManager } from '../../api/journalsApi';
import { toast } from 'sonner';

export const useAssignJournalManager = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ journalId, profile_id }) => assignJournalManager({ journalId, profile_id }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['journal-managers', variables.journalId] });
      queryClient.invalidateQueries({ queryKey: ['admin-journals'] });
      toast.success('Journal manager assigned successfully!');
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        'Failed to assign journal manager';
      toast.error(errorMessage);
      options.onError?.(error, variables, context);
    },
  });
};

export const useRemoveJournalManager = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ journalId, userId }) => removeJournalManager({ journalId, userId }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['journal-managers', variables.journalId] });
      queryClient.invalidateQueries({ queryKey: ['admin-journals'] });
      toast.success('Journal manager removed successfully!');
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const errorMessage = error?.response?.data?.detail || 'Failed to remove journal manager';
      toast.error(errorMessage);
      options.onError?.(error, variables, context);
    },
  });
};
