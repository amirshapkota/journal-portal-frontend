import { instance } from "@/lib/instance";

/**
 * Fetch all journals
 * @returns {Promise} API response
 */
export const getJournals = async () => {
  const response = await instance.get("journals/");
  return response.data;
};
