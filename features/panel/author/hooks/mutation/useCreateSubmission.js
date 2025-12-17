import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubmission } from '../../api/submissionsApi';
import { toast } from 'sonner';

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubmission,
    onSuccess: (data) => {
      toast.success('Submission created successfully!');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        'Failed to create submission';
      toast.error(errorMessage);
    },
  });
};
