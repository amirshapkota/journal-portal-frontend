import { instance } from "@/lib/instance";

/**
 * Search for institutions using ROR (Research Organization Registry) API
 * @param {string} query - Search query string
 * @returns {Promise} API response with institution search results
 */
export const searchRORInstitutions = async (query) => {
  if (!query || query.trim().length === 0) {
    return { count: 0, results: [] };
  }

  const response = await instance.get(`/integrations/ror/search/`, {
    params: { query: query.trim() },
  });
  return response.data;
};
