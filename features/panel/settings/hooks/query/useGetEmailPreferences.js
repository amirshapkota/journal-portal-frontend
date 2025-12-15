import { useQuery } from "@tanstack/react-query";
import { getEmailPreferences } from "../../api/EmailPreferencesApiSlice";

export const useGetEmailPreferences = (options = {}) => {
  return useQuery({
    queryKey: ["email-preferences"],
    queryFn: getEmailPreferences,
    staleTime: 5 * 60 * 1000, // 5 minutes - preferences don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache
    refetchOnWindowFocus: false, // Don't refetch on focus - user may be editing
    refetchOnMount: true, // Use cached data
    retry: 2, // Retry failed requests twice
    ...options,
  });
};
