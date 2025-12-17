import { useQuery } from '@tanstack/react-query';
import {
  listProductionAssignments,
  getProductionAssignment,
  getProductionAssignmentFiles,
  getProductionAssignmentDiscussions,
  getProductionAssignmentParticipants,
} from '../../api';

/**
 * Hook to fetch production assignments list
 */
export function useProductionAssignments(options = {}) {
  const { production_assistant, submission, status, search, ordering, ...queryOptions } = options;

  return useQuery({
    queryKey: [
      'production-assignments',
      { production_assistant, submission, status, search, ordering },
    ],
    queryFn: () =>
      listProductionAssignments({
        production_assistant,
        submission,
        status,
        search,
        ordering,
      }),
    ...queryOptions,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single production assignment
 */
export function useProductionAssignment(assignmentId, options = {}) {
  return useQuery({
    queryKey: ['production-assignment', assignmentId],
    queryFn: () => getProductionAssignment(assignmentId),
    enabled: !!assignmentId && options.enabled !== false,
    ...options,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch files for a production assignment
 */
export function useProductionAssignmentFiles(assignmentId, options = {}) {
  return useQuery({
    queryKey: ['production-assignment-files', assignmentId],
    queryFn: () => getProductionAssignmentFiles(assignmentId),
    enabled: !!assignmentId && options.enabled !== false,
    ...options,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch discussions for a production assignment
 */
export function useProductionAssignmentDiscussions(assignmentId, options = {}) {
  return useQuery({
    queryKey: ['production-assignment-discussions', assignmentId],
    queryFn: () => getProductionAssignmentDiscussions(assignmentId),
    enabled: !!assignmentId && options.enabled !== false,
    ...options,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch participants for a production assignment
 */
export function useProductionAssignmentParticipants(assignmentId, options = {}) {
  return useQuery({
    queryKey: ['production-assignment-participants', assignmentId],
    queryFn: () => getProductionAssignmentParticipants(assignmentId),
    enabled: !!assignmentId && options.enabled !== false,
    ...options,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
