import { useMutation } from '@tanstack/react-query';
import { patchProfile } from '@/features/panel/reader/api/profileApi';

export const usePatchProfile = (options = {}) => {
  return useMutation({
    mutationFn: patchProfile,
    ...options,
  });
};
