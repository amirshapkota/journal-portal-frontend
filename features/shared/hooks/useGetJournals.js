import { useQuery } from "@tanstack/react-query";
import { getJournals } from "@/features/panel/admin/journal/api/journalsApi";

export const useGetJournals = () => {
  return useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
