export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'blockchain' | 'defi' | 'nft' | 'security' | 'general';
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Blockchain',
    definition: 'A distributed digital ledger that records transactions across many computers in a way that makes it nearly impossible to change or hack.',
    category: 'blockchain',
  },
  {
    term: 'Smart Contract',
    definition: 'Self-executing contracts with the terms directly written into code. They automatically execute when predetermined conditions are met.',
    category: 'blockchain',
  },
  {
    term: 'DeFi',
    definition: 'Decentralized Finance - financial services built on blockchain technology that operate without traditional intermediaries like banks.',
    category: 'defi',
  },
  {
    term: 'Liquidity Pool',
    definition: 'A collection of funds locked in a smart contract used to facilitate trading by providing liquidity on decentralized exchanges.',
    category: 'defi',
  },
  {
    term: 'NFT',
    definition: 'Non-Fungible Token - a unique digital asset that represents ownership of a specific item or piece of content on the blockchain.',
    category: 'nft',
  },
  {
    term: 'Gas Fee',
    definition: 'The fee required to execute a transaction or smart contract on a blockchain network, paid to validators/miners.',
    category: 'blockchain',
  },
  {
    term: 'Wallet',
    definition: 'A digital tool that stores your private keys and allows you to send, receive, and manage your cryptocurrency.',
    category: 'general',
  },
  {
    term: 'Audit',
    definition: 'A thorough examination of a smart contract\'s code by security experts to identify vulnerabilities and ensure safety.',
    category: 'security',
  },
  {
    term: 'Rug Pull',
    definition: 'A scam where developers abandon a project and run away with investors\' funds, often by removing liquidity.',
    category: 'security',
  },
  {
    term: 'Token',
    definition: 'A digital asset created on an existing blockchain that can represent various things like currency, utility, or ownership.',
    category: 'general',
  },
];
