import { useQuery } from "@tanstack/react-query";
import { runAnomalyDetectionScan } from "../api/anomalyDetectionApi";

/**
 * Hook to run anomaly detection scan
 */
/**
 * Hook to run anomaly detection scan with filters, search, and pagination
 * @param {Object} params - Query params: { type, search, page, page_size }
 * @param {boolean} enabled - Whether to enable the query
 */
export const useAnomalyDetectionScan = (params = {}, enabled = true) => {
  return useQuery({
    queryKey: ["anomalyDetectionScan", params],
    queryFn: () => runAnomalyDetectionScan(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
