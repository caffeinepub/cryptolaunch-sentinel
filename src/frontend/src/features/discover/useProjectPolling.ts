import { useEffect } from 'react';
import { useGetProjectsForChain } from '../../hooks/useQueries';
import { mapBackendProjectToSummary } from './providers/providers';
import type { ProjectSummary } from './projectMappers';

export function useProjectPolling(chainId: string) {
  const { 
    data: backendProjects = [], 
    isLoading, 
    error, 
    refetch,
    isFetching,
    dataUpdatedAt
  } = useGetProjectsForChain(chainId);

  // Map backend projects to UI format
  const projects: ProjectSummary[] = backendProjects.map(mapBackendProjectToSummary);

  const refresh = () => {
    refetch();
  };

  return {
    projects,
    isLoading,
    error: error as Error | null,
    lastUpdated: dataUpdatedAt || null,
    refresh,
    isRefreshing: isFetching && !isLoading,
  };
}
