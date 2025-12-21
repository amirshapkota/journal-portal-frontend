import { instance } from '@/lib/instance';

/**
 * Fetch all journals
 * @param {Object} params - Query parameters (e.g., { active_role: 'AUTHOR', search: 'keyword', is_active: true, page: 1 })
 * @returns {Promise} API response
 */
export const getJournals = async (params = {}) => {
  const response = await instance.get('journals/journals/', { params });
  return response.data;
};

/**
 * Create a new journal (admin)
 * @param {Object} journalData - Journal data to create
 * @returns {Promise} API response
 */
export const createJournal = async (journalData) => {
  const response = await instance.post('journals/journals/', journalData);
  return response.data;
};

/**
 * Delete a journal (admin)
 * @param {string} id - Journal ID
 * @returns {Promise} API response
 */
export const deleteJournal = async (id) => {
  const response = await instance.delete(`journals/journals/${id}/`);
  return response.data;
};

/**
 * Assign a journal manager to a journal
 * @param {string} journalId - Journal ID
 * @param {string} profile_id - Profile ID of the user to assign
 * @returns {Promise} API response
 */
export const assignJournalManager = async ({ journalId, profile_id }) => {
  const response = await instance.post(`journals/journals/${journalId}/assign-journal-manager/`, {
    profile_id,
  });
  return response.data;
};

/**
 * List all journal managers for a journal
 * @param {string} journalId - Journal ID
 * @returns {Promise} API response
 */
export const getJournalManagers = async (journalId) => {
  const response = await instance.get(`journals/journals/${journalId}/journal-managers/`);
  return response.data;
};

/**
 * Remove a journal manager from a journal
 * @param {string} journalId - Journal ID
 * @param {string} userId - Profile ID of the journal manager to remove
 * @returns {Promise} API response
 */
export const removeJournalManager = async ({ journalId, userId }) => {
  const response = await instance.delete(
    `journals/journals/${journalId}/journal-managers/${userId}/`
  );
  return response.data;
};
