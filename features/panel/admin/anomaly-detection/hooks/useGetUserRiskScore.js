import { useQuery } from "@tanstack/react-query";
import { getUserRiskScore } from "../api/anomalyDetectionApi";

/**
 * Hook to get user risk score
 */
export const useGetUserRiskScore = (userId, enabled = true) => {
  return useQuery({
    queryKey: ["userRiskScore", userId],
    queryFn: () => getUserRiskScore(userId),
    enabled: enabled && !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
