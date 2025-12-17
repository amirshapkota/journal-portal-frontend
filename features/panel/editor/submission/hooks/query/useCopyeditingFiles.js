import { useQuery } from '@tanstack/react-query';
import { listCopyeditingFiles, getCopyeditingFile, listCopyeditedFiles } from '../../api';

/**
 * Hook to fetch copyediting files list
 */
export function useCopyeditingFiles({ assignmentId, file_type }, options = {}) {
  return useQuery({
    queryKey: ['copyediting-files', assignmentId, file_type],
    queryFn: () => listCopyeditingFiles(assignmentId, file_type),
    ...options,
    enabled: !!assignmentId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCopyEditedFiles({ assignmentId }, options = {}) {
  return useQuery({
    queryKey: ['copyedited-files', assignmentId],
    queryFn: () => listCopyeditedFiles(assignmentId),
    ...options,
    enabled: !!assignmentId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single copyediting file
 */
export function useCopyeditingFile(fileId, options = {}) {
  return useQuery({
    queryKey: ['copyediting-file', fileId],
    queryFn: () => getCopyeditingFile(fileId),
    enabled: !!fileId && options.enabled !== false,
    ...options,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
