import { useQuery } from "@tanstack/react-query";
import { getTaxonomyTree } from "../../api/journalsApi";

export const useGetTaxonomyTree = (journalId, options = {}) => {
  return useQuery({
    queryKey: ["taxonomy-tree", journalId],
    queryFn: () => getTaxonomyTree(journalId),
    enabled: !!journalId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    ...options,
  });
};
