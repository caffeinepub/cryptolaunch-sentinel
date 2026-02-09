export interface ProjectSummary {
  id: string;
  name: string;
  description: string;
  chain: string;
  tokenAddress: string;
  launchTime: number;
  socials?: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    website?: string;
  };
  auditPresence: boolean;
  teamTransparency: boolean;
  liquidity: number;
  volume: number;
}

export function mapToProjectSummary(data: any): ProjectSummary {
  return {
    id: data.id || `${data.chain}-${Date.now()}`,
    name: data.name || 'Unknown Project',
    description: data.description || 'No description available',
    chain: data.chain || 'unknown',
    tokenAddress: data.tokenAddress || data.address || 'N/A',
    launchTime: data.launchTime || data.createdAt || Date.now(),
    socials: data.socials || {},
    auditPresence: data.auditPresence || false,
    teamTransparency: data.teamTransparency || false,
    liquidity: data.liquidity || 0,
    volume: data.volume || 0,
  };
}
