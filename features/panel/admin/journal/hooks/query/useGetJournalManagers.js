import { useQuery } from '@tanstack/react-query';
import { getJournalManagers } from '../../api/journalsApi';

export const useGetJournalManagers = (journalId, options = {}) => {
  return useQuery({
    queryKey: ['journal-managers', journalId],
    queryFn: () => getJournalManagers(journalId),
    enabled: !!journalId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
