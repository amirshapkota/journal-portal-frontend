/**
 * React hooks for Sentry API integration
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchProjects,
  fetchIssues,
  fetchIssueDetail,
  fetchIssueEvents,
  fetchProjectStats,
} from '../api/sentryApi';

/**
 * Hook to fetch Sentry projects
 */
export function useSentryProjects() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchProjects();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}

/**
 * Hook to fetch Sentry issues for a project
 * @param {string} projectSlug - The project slug
 * @param {Object} options - Query options
 */
export function useSentryIssues(projectSlug, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!projectSlug) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchIssues(projectSlug, options);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [projectSlug, JSON.stringify(options)]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}

/**
 * Hook to fetch issue details
 * @param {string} issueId - The issue ID
 */
export function useSentryIssueDetail(issueId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (id) => {
    if (!id) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchIssueDetail(id);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (issueId) {
      fetch(issueId);
    }
  }, [issueId, fetch]);

  return { data, isLoading, error, refetch: () => fetch(issueId) };
}

/**
 * Hook to fetch issue events
 * @param {string} issueId - The issue ID
 * @param {Object} options - Query options
 */
export function useSentryIssueEvents(issueId, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (id, opts) => {
    if (!id) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchIssueEvents(id, opts);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (issueId) {
      fetch(issueId, options);
    }
  }, [issueId, JSON.stringify(options), fetch]);

  return { data, isLoading, error, refetch: () => fetch(issueId, options) };
}

/**
 * Hook to fetch project statistics
 * @param {string} projectSlug - The project slug
 * @param {Object} options - Query options
 */
export function useSentryProjectStats(projectSlug, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!projectSlug) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchProjectStats(projectSlug, options);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [projectSlug, JSON.stringify(options)]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}
