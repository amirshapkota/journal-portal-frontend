import { useQuery } from "@tanstack/react-query";
import { getOrcidUrl } from "../../api/OrcidApiSlice";

export const useGetOrcidUrl = (options = {}) => {
  return useQuery({
    queryKey: ["orcid-url"],
    queryFn: () => getOrcidUrl(),
    staleTime: 0, // Always fresh - URL can change (contains state/nonce)
    gcTime: 0, // Don't cache - generate new URL each time
    refetchOnWindowFocus: false, // Don't refetch on focus - called manually
    refetchOnMount: true, // Don't refetch on mount - called manually via refetch
    retry: 1, // Only retry once for URL generation
    ...options,
  });
};
