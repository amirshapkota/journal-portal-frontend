import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptReviewAssignment } from '../../api/reviewsApi';

export const useAcceptReviewAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId) => acceptReviewAssignment(assignmentId),
    onSuccess: () => {
      // Invalidate and refetch review assignments
      queryClient.invalidateQueries({ queryKey: ['reviewAssignments'] });
      queryClient.invalidateQueries({ queryKey: ['my-analytics'] });
    },
  });
};
