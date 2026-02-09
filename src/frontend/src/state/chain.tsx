import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Chain {
  id: string;
  name: string;
  icon: string;
}

export const SUPPORTED_CHAINS: Chain[] = [
  { id: 'ethereum', name: 'Ethereum', icon: 'eth' },
  { id: 'solana', name: 'Solana', icon: 'sol' },
  { id: 'bsc', name: 'BNB Chain', icon: 'bnb' },
  { id: 'polygon', name: 'Polygon', icon: 'matic' },
  { id: 'avalanche', name: 'Avalanche', icon: 'avax' },
  { id: 'cardano', name: 'Cardano', icon: 'ada' },
  { id: 'arbitrum', name: 'Arbitrum', icon: 'arb' },
  { id: 'optimism', name: 'Optimism', icon: 'op' },
  { id: 'base', name: 'Base', icon: 'base' },
  { id: 'fantom', name: 'Fantom', icon: 'ftm' },
  { id: 'polkadot', name: 'Polkadot', icon: 'dot' },
  { id: 'cosmos', name: 'Cosmos', icon: 'atom' },
  { id: 'near', name: 'NEAR', icon: 'near' },
  { id: 'aptos', name: 'Aptos', icon: 'apt' },
  { id: 'sui', name: 'Sui', icon: 'sui' },
  { id: 'tron', name: 'Tron', icon: 'trx' },
  { id: 'cronos', name: 'Cronos', icon: 'cro' },
  { id: 'algorand', name: 'Algorand', icon: 'algo' },
  { id: 'hedera', name: 'Hedera', icon: 'hbar' },
  { id: 'icp', name: 'Internet Computer', icon: 'icp' },
  { id: 'stellar', name: 'Stellar', icon: 'xlm' },
  { id: 'flow', name: 'Flow', icon: 'flow' },
  { id: 'tezos', name: 'Tezos', icon: 'xtz' },
  { id: 'kava', name: 'Kava', icon: 'kava' },
];

interface ChainContextType {
  selectedChain: Chain;
  setSelectedChain: (chain: Chain) => void;
}

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export function ChainProvider({ children }: { children: ReactNode }) {
  const [selectedChain, setSelectedChainState] = useState<Chain>(() => {
    const stored = localStorage.getItem('cryptolaunch-selected-chain');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const found = SUPPORTED_CHAINS.find(c => c.id === parsed.id);
        if (found) return found;
      } catch {
        // Fall through to default
      }
    }
    return SUPPORTED_CHAINS[0];
  });

  const setSelectedChain = (chain: Chain) => {
    setSelectedChainState(chain);
    localStorage.setItem('cryptolaunch-selected-chain', JSON.stringify(chain));
  };

  useEffect(() => {
    localStorage.setItem('cryptolaunch-selected-chain', JSON.stringify(selectedChain));
  }, [selectedChain]);

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainContext.Provider>
  );
}

export function useChain() {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error('useChain must be used within ChainProvider');
  }
  return context;
}
