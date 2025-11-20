import { useQuery } from "@tanstack/react-query";
import { getDecisionLetterTemplates } from "../api/reviewsApi";

/**
 * Hook to fetch decision letter templates
 */
export const useGetDecisionLetterTemplates = (params = {}) => {
  return useQuery({
    queryKey: ["decisionLetterTemplates", params],
    queryFn: () => getDecisionLetterTemplates(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
