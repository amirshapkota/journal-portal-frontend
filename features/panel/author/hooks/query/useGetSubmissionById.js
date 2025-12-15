import { useQuery } from "@tanstack/react-query";
import { getSingleSubmissionById } from "../../api";

/**
 * React Query hook to fetch a submission by its ID
 * @param {string} submissionId
 * @param {object} options - Additional options for useQuery
 */
export function useGetSubmissionById(submissionId, options = {}) {
  const result = useQuery({
    queryKey: ["submission", submissionId],
    queryFn: () => {
      return getSingleSubmissionById(submissionId);
    },
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(submissionId),
    ...options,
  });

  return result;
}
