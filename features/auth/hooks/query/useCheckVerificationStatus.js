import { useQuery } from '@tanstack/react-query';
import { checkVerificationStatus } from '../../api/userApi';

export const useCheckVerificationStatus = (enabled = true) => {
  return useQuery({
    queryKey: ['verification-status'],
    queryFn: () => checkVerificationStatus(),
    enabled: enabled,
    refetchInterval: 10000, // Refetch every 10 seconds
    retry: false,
  });
};
