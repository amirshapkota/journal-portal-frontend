import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestInfoVerification } from '../../api/VerificationActionsApiSlice';
import { toast } from 'sonner';

/**
 * Hook to reject a verification request
 * @returns {Object} Mutation object with mutate function and states
 */
export const useRequestInfoVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => requestInfoVerification(id, data),
    onSuccess: (data, variables) => {
      toast.success('Information Requested', {
        description: 'Additional information has been requested for the verification request.',
      });
      // Invalidate and refetch verification requests
      queryClient.invalidateQueries({
        queryKey: ['admin-verification-requests'],
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to request additional information for verification request';
      toast.error('Request Failed', {
        description: errorMessage,
      });
    },
  });
};
