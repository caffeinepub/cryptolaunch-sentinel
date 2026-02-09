import type { ProjectSummary } from '../projectMappers';
import type { Project } from '../../../backend';

// Map backend Project to ProjectSummary for UI display
export function mapBackendProjectToSummary(project: Project): ProjectSummary {
  return {
    id: `${project.chain}-${project.launchDate}`,
    name: project.name,
    description: project.description,
    chain: project.chain,
    tokenAddress: 'N/A', // Backend doesn't store token address yet
    launchTime: Number(project.launchDate) / 1000000, // Convert nanoseconds to milliseconds
    socials: {}, // Backend doesn't store socials yet
    auditPresence: project.auditPresence,
    teamTransparency: project.teamTransparency,
    liquidity: Number(project.liquidity),
    volume: Number(project.volume),
  };
}

// This module now serves as a mapper between backend data and UI format
// The actual data fetching is handled by React Query hooks in useQueries.ts
