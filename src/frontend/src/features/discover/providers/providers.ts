import type { ProjectSummary } from '../projectMappers';
import { mapToProjectSummary } from '../projectMappers';

// Mock data generator for demonstration
function generateMockProjects(chainId: string): ProjectSummary[] {
  const mockProjects: ProjectSummary[] = [
    {
      id: `${chainId}-1`,
      name: 'DeFi Protocol X',
      description: 'A revolutionary decentralized finance protocol offering high-yield staking and liquidity pools.',
      chain: chainId,
      tokenAddress: '0x1234...5678',
      launchTime: Date.now() - 3600000,
      socials: {
        twitter: 'https://twitter.com/defiprotocolx',
        telegram: 'https://t.me/defiprotocolx',
      },
      auditPresence: true,
      teamTransparency: true,
      liquidity: 50000,
      volume: 250000,
    },
    {
      id: `${chainId}-2`,
      name: 'MetaVerse Token',
      description: 'The native token for the next-generation metaverse gaming platform.',
      chain: chainId,
      tokenAddress: '0xabcd...efgh',
      launchTime: Date.now() - 7200000,
      socials: {
        twitter: 'https://twitter.com/metaversetoken',
        discord: 'https://discord.gg/metaverse',
      },
      auditPresence: false,
      teamTransparency: true,
      liquidity: 25000,
      volume: 100000,
    },
    {
      id: `${chainId}-3`,
      name: 'SafeMoon 2.0',
      description: 'Community-driven token with automatic liquidity generation and holder rewards.',
      chain: chainId,
      tokenAddress: '0x9876...5432',
      launchTime: Date.now() - 10800000,
      socials: {
        telegram: 'https://t.me/safemoon2',
      },
      auditPresence: false,
      teamTransparency: false,
      liquidity: 5000,
      volume: 15000,
    },
  ];

  return mockProjects;
}

export async function fetchProjectsForChain(chainId: string): Promise<ProjectSummary[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In production, this would call actual APIs:
  // - Dexscreener API
  // - CoinGecko DEX API
  // - Backend-mediated calls for APIs requiring secrets
  
  return generateMockProjects(chainId);
}
