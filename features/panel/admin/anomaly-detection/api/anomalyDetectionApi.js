import { instance } from "@/lib/instance";

/**
 * Run comprehensive anomaly detection scan
 * @returns {Promise} API response with anomaly scan results
 */
/**
 * Run comprehensive anomaly detection scan with filters, search, and pagination
 * @param {Object} params - Query params: { type, search, page, page_size }
 * @returns {Promise} API response with anomaly scan results
 */
export const runAnomalyDetectionScan = async (params = {}) => {
  const response = await instance.get("/ml/anomaly-detection/scan/", {
    params,
  });
  return response.data;
};

/**
 * Get risk score for a specific user
 * @param {string} userId - User profile UUID
 * @returns {Promise} API response with user risk assessment
 */
export const getUserRiskScore = async (userId) => {
  const response = await instance.get(`/ml/anomaly-detection/user/${userId}/`);
  return response.data;
};

/**
 * Get anomalies for a specific submission
 * @param {string} submissionId - Submission UUID
 * @returns {Promise} API response with submission anomalies
 */
export const getSubmissionAnomalies = async (submissionId) => {
  const response = await instance.get(
    `/ml/anomaly-detection/submission/${submissionId}/`
  );
  return response.data;
};

/**
 * Get anomalies for a specific reviewer
 * @param {string} reviewerId - Reviewer profile UUID
 * @returns {Promise} API response with reviewer anomalies
 */
export const getReviewerAnomalies = async (reviewerId) => {
  const response = await instance.get(
    `/ml/anomaly-detection/reviewer/${reviewerId}/`
  );
  return response.data;
};
