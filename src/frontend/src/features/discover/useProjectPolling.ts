import { useState, useEffect, useCallback } from 'react';
import { fetchProjectsForChain } from './providers/providers';
import type { ProjectSummary } from './projectMappers';

const POLL_INTERVAL = 30000; // 30 seconds

export function useProjectPolling(chainId: string) {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProjects = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await fetchProjectsForChain(chainId);
      setProjects(data);
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [chainId]);

  const refresh = useCallback(() => {
    fetchProjects(true);
  }, [fetchProjects]);

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(() => fetchProjects(), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    lastUpdated,
    refresh,
    isRefreshing,
  };
}
