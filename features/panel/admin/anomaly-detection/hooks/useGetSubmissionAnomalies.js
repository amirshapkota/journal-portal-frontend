import { useQuery } from "@tanstack/react-query";
import { getSubmissionAnomalies } from "../api/anomalyDetectionApi";

/**
 * Hook to get submission anomalies
 */
export const useGetSubmissionAnomalies = (submissionId, enabled = true) => {
  return useQuery({
    queryKey: ["submissionAnomalies", submissionId],
    queryFn: () => getSubmissionAnomalies(submissionId),
    enabled: enabled && !!submissionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
