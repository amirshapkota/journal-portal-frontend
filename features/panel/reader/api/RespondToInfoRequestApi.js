import { instance } from "@/lib/instance";

/**
 * Respond to an info request for a verification request
 * @param {string} id - Verification request ID
 * @param {Object} data - Response data (fields to update)
 * @returns {Promise} API response
 */
export const respondToInfoRequest = async (id, data) => {
  const response = await instance.patch(`verification-requests/${id}/`, data);
  return response.data;
};
