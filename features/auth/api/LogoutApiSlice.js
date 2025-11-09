import { instance } from "@/lib/instance";

/**
 * Logout API
 *
 * Sends a POST request to the logout endpoint to invalidate the user's session.
 *
 * @returns {Promise<Object>} Response data from the logout endpoint
 *
 * @throws {Error} When the logout request fails
 *
 * @example
 * try {
 *   const data = await logoutApi();
 *   console.log('Logout successful:', data);
 * } catch (error) {
 *   console.error('Logout failed:', error);
 * }
 */
export const logoutApi = async () => {
  const response = await instance.post("auth/logout/");
  return response.data;
};
