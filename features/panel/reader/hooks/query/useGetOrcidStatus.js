import { useQuery } from "@tanstack/react-query";
import { getOrcidStatus } from "../../api/OrcidApiSlice";

export const useGetOrcidStatus = (options = {}) => {
  return useQuery({
    queryKey: ["orcid-status"],
    queryFn: () => getOrcidStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes - ORCID connection status doesn't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
    refetchOnWindowFocus: true, // Refetch when user returns to tab to ensure fresh status
    refetchOnMount: true, // Refetch when component mounts
    retry: 2, // Retry failed requests twice
    ...options,
  });
};
