import { useQuery } from '@tanstack/react-query';
import { getReviewAssignmentById } from '../../api/reviewsApi';

/**
 * Hook to get a single review assignment by ID
 */
export const useGetReviewAssignmentById = (assignmentId) => {
  return useQuery({
    queryKey: ['reviewAssignment', assignmentId],
    queryFn: () => getReviewAssignmentById(assignmentId),
    enabled: !!assignmentId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
