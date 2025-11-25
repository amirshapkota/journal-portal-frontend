import { useQuery } from "@tanstack/react-query";
import { runAnomalyDetectionScan } from "../api/anomalyDetectionApi";

/**
 * Hook to run anomaly detection scan
 */
export const useAnomalyDetectionScan = (enabled = true) => {
  return useQuery({
    queryKey: ["anomalyDetectionScan"],
    queryFn: runAnomalyDetectionScan,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
