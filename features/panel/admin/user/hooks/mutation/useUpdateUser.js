import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../api/UserApiSlice';

export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    ...options,
  });
};
