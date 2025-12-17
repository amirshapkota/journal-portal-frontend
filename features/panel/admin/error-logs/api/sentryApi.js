import { instance } from '@/lib/instance';

/**
 * Sentry API Service
 * Handles all API calls to the Sentry integration endpoints
 */

const SENTRY_BASE = 'integrations/sentry';

/**
 * Fetch all projects from Sentry
 * @returns {Promise} API response
 */
export const fetchProjects = async () => {
  const response = await instance.get(`${SENTRY_BASE}/projects/`);
  return response.data;
};

/**
 * Fetch issues for a specific project
 * @param {string} projectSlug - The project slug
 * @param {Object} options - Query options
 * @param {string} options.status - Issue status (unresolved, resolved, ignored)
 * @param {string} options.query - Search query
 * @param {number} options.limit - Number of results (max 100)
 * @param {string} options.cursor - Pagination cursor
 * @returns {Promise} API response
 */
export const fetchIssues = async (projectSlug, options = {}) => {
  const { status = 'unresolved', query = '', limit = 50, cursor = null } = options;

  const params = {
    status,
    limit,
  };

  if (query) params.query = query;
  if (cursor) params.cursor = cursor;

  const response = await instance.get(`${SENTRY_BASE}/projects/${projectSlug}/issues/`, { params });
  return response.data;
};

/**
 * Fetch detailed information about a specific issue
 * @param {string} issueId - The issue ID
 * @returns {Promise} API response
 */
export const fetchIssueDetail = async (issueId) => {
  const response = await instance.get(`${SENTRY_BASE}/issues/${issueId}/`);
  return response.data;
};

/**
 * Fetch events for a specific issue
 * @param {string} issueId - The issue ID
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of results
 * @param {string} options.cursor - Pagination cursor
 * @returns {Promise} API response
 */
export const fetchIssueEvents = async (issueId, options = {}) => {
  const { limit = 25, cursor = null } = options;

  const params = {
    limit,
  };

  if (cursor) params.cursor = cursor;

  const response = await instance.get(`${SENTRY_BASE}/issues/${issueId}/events/`, { params });
  return response.data;
};

/**
 * Fetch detailed information about a specific event
 * @param {string} eventId - The event ID
 * @param {string} projectSlug - The project slug
 * @returns {Promise} API response
 */
export const fetchEventDetail = async (eventId, projectSlug) => {
  const response = await instance.get(`${SENTRY_BASE}/projects/${projectSlug}/events/${eventId}/`);
  return response.data;
};

/**
 * Fetch project statistics
 * @param {string} projectSlug - The project slug
 * @param {Object} options - Query options
 * @param {string} options.stat - Stat type (received, rejected, blacklisted, generated)
 * @param {number} options.since - Start timestamp (Unix)
 * @param {number} options.until - End timestamp (Unix)
 * @param {string} options.resolution - Time resolution (1h, 1d, 1w, 1m)
 * @returns {Promise} API response
 */
export const fetchProjectStats = async (projectSlug, options = {}) => {
  const { stat = 'received', since = null, until = null, resolution = '1h' } = options;

  const params = {
    stat,
    resolution,
  };

  if (since) params.since = since;
  if (until) params.until = until;

  const response = await instance.get(`${SENTRY_BASE}/projects/${projectSlug}/stats/`, { params });
  return response.data;
};
