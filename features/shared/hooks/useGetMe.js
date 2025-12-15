import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/shared/api/meApi";

export const useGetMe = (options = {}) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2,
    ...options,
  });
};
