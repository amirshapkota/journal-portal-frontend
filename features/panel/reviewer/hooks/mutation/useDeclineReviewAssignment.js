import { useMutation, useQueryClient } from '@tanstack/react-query';
import { declineReviewAssignment } from '../../api/reviewsApi';

export const useDeclineReviewAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => declineReviewAssignment(id, data),
    onSuccess: () => {
      // Invalidate and refetch review assignments
      queryClient.invalidateQueries({ queryKey: ['reviewAssignments'] });
      queryClient.invalidateQueries({ queryKey: ['my-analytics'] });
    },
  });
};
