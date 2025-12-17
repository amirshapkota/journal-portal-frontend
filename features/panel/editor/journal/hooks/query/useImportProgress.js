import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getImportProgress } from '../../api/ojsConnectionApi';

/**
 * Custom hook to poll and track OJS import progress using React Query
 * @param {string} journalId - Journal ID to track progress for
 * @param {Function} onErrorStop - Callback to execute when polling stops due to errors
 * @param {Function} onComplete - Callback to execute when import completes successfully
 * @returns {Object} Progress data and control functions
 */
export function useImportProgress(journalId, onErrorStop, onComplete) {
  const [isWaitingForStart, setIsWaitingForStart] = useState(false);
  const [stoppedByError, setStoppedByError] = useState(false);

  const isWaitingForStartRef = useRef(false);
  const stoppedByErrorRef = useRef(false);
  const errorCountRef = useRef(0);
  const prevIsErrorRef = useRef(false);
  const prevStatusRef = useRef('idle');

  const { data, error, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['import-progress', journalId],
    queryFn: async () => {
      if (!journalId) return null;
      return getImportProgress(journalId);
    },
    enabled: Boolean(journalId),
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchInterval: (query) => {
      // Stop polling if stopped by error
      if (stoppedByErrorRef.current) return false;

      const status = query.state.data?.status;

      // Waiting for backend job to start
      if (isWaitingForStartRef.current && status === 'idle') {
        return 1500;
      }

      // Backend job started - stop waiting
      if (isWaitingForStartRef.current && status !== 'idle') {
        isWaitingForStartRef.current = false;
        setIsWaitingForStart(false);
      }

      // Active processing states
      if (status === 'fetching' || status === 'processing') {
        return 1500;
      }

      return false;
    },
  });

  // ---------- ERROR THRESHOLD HANDLING ----------
  useEffect(() => {
    // Transition: no-error -> error
    if (isError && !prevIsErrorRef.current) {
      errorCountRef.current += 1;

      if (errorCountRef.current > 3 && !stoppedByErrorRef.current) {
        stoppedByErrorRef.current = true;
        isWaitingForStartRef.current = false;

        // Queue state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setStoppedByError(true);
          setIsWaitingForStart(false);
          onErrorStop?.();
        });
      }
    }

    // Transition: error -> success
    if (!isError && prevIsErrorRef.current) {
      errorCountRef.current = 0;

      if (stoppedByErrorRef.current) {
        stoppedByErrorRef.current = false;

        // Queue state update to avoid synchronous setState in effect
        queueMicrotask(() => {
          setStoppedByError(false);
        });
      }
    }

    prevIsErrorRef.current = isError;
  }, [isError, onErrorStop]);

  // ---------- COMPLETION HANDLING ----------
  useEffect(() => {
    const currentStatus = data?.status;

    // Detect transition to completed status
    if (currentStatus === 'completed' && prevStatusRef.current !== 'completed') {
      onComplete?.();
    }

    prevStatusRef.current = currentStatus || 'idle';
  }, [data?.status, onComplete]);

  // ---------- NORMALIZED PROGRESS ----------
  const progressData = {
    percentage: data?.status === 'completed' ? 100 : (data?.percentage ?? 0),
    status: data?.status ?? 'idle',
    stage: data?.stage ?? '',
    current: data?.current ?? 0,
    total: data?.total ?? 0,
    imported: data?.imported ?? 0,
    updated: data?.updated ?? 0,
    skipped: data?.skipped ?? 0,
    errors: data?.errors ?? 0,
  };

  // ---------- DERIVED FLAGS ----------
  const isPolling =
    !stoppedByError &&
    (isWaitingForStart ||
      progressData.status === 'fetching' ||
      progressData.status === 'processing');

  // ---------- PUBLIC API ----------
  const startPolling = () => {
    errorCountRef.current = 0;
    stoppedByErrorRef.current = false;
    setStoppedByError(false);
    isWaitingForStartRef.current = true;
    setIsWaitingForStart(true);
    refetch();
  };

  const stopPolling = () => {
    isWaitingForStartRef.current = false;
    setIsWaitingForStart(false);
  };

  return {
    progressData,
    isPolling,
    isWaitingForStart,
    stoppedByError,
    error,
    isError,
    isFetching,
    isLoading,
    startPolling,
    stopPolling,
    fetchProgress: refetch,
  };
}
