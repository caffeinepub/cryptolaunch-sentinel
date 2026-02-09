import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Project, ProjectAnalytics, UserProfile } from '../backend';

export function useGetProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAnalytics() {
  const { actor, isFetching } = useActor();

  return useQuery<ProjectAnalytics>({
    queryKey: ['analytics'],
    queryFn: async () => {
      if (!actor) {
        return {
          chainSelections: BigInt(0),
          projectOpens: BigInt(0),
          riskDetailsExpands: BigInt(0),
          lessonStarts: BigInt(0),
          lessonCompletes: BigInt(0),
          quizSubmits: BigInt(0),
        };
      }
      return actor.getAnalytics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAnalytics() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      chainSelections: bigint;
      projectOpens: bigint;
      riskDetailsExpands: bigint;
      lessonStarts: bigint;
      lessonCompletes: bigint;
      quizSubmits: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateAnalytics(
        data.chainSelections,
        data.projectOpens,
        data.riskDetailsExpands,
        data.lessonStarts,
        data.lessonCompletes,
        data.quizSubmits
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// New hooks for data provider status
export function useGetAvailableDataProviders() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['availableDataProviders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableDataProviders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCheckDataProviderStatus(providerId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['dataProviderStatus', providerId],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkDataProviderStatus(providerId);
    },
    enabled: !!actor && !isFetching && !!providerId,
    retry: false,
  });
}

// Hook for fetching projects from backend (for Discover feed)
export function useGetProjectsForChain(chainId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['chainProjects', chainId],
    queryFn: async () => {
      if (!actor) return [];
      // Get all projects and filter by chain
      const allProjects = await actor.getProjects();
      return allProjects.filter(p => p.chain === chainId);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
}
