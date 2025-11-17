import { instance } from "@/lib/instance";

/**
 * Get personal analytics for the current user
 * @returns {Promise} API response with author, reviewer, and editor stats
 */
export const getMyAnalytics = async () => {
  const response = await instance.get("/analytics/my-analytics/");
  return response.data;
};
