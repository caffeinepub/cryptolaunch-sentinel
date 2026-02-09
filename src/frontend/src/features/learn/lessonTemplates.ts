export interface LessonTemplate {
  id: string;
  title: string;
  category: 'basics' | 'defi' | 'nft' | 'security' | 'advanced';
  contentTemplate: string;
  quiz?: QuizTemplate;
  videoUrl?: string;
}

export interface QuizTemplate {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const LESSON_TEMPLATES: LessonTemplate[] = [
  {
    id: 'blockchain-basics',
    title: 'What is a Blockchain?',
    category: 'basics',
    contentTemplate: `
# Understanding Blockchain Technology

A blockchain is a distributed digital ledger that records transactions across many computers. Think of it as a digital notebook that everyone can read, but no one can erase or change what's already written.

## Key Characteristics

**Decentralization**: No single entity controls the blockchain. It's maintained by a network of computers (nodes) around the world.

**Transparency**: All transactions are visible to everyone on the network, making it very difficult to commit fraud.

**Immutability**: Once data is recorded, it's extremely difficult to change, providing a permanent record of all transactions.

## How It Works

1. A transaction is initiated
2. The transaction is broadcast to all nodes in the network
3. Nodes validate the transaction
4. Validated transactions are combined into a "block"
5. The new block is added to the chain
6. The transaction is complete

## Real-World Applications

Blockchains power cryptocurrencies like Bitcoin and Ethereum, but they're also used for supply chain tracking, digital identity, voting systems, and much more.
    `,
    quiz: {
      question: 'What is the main benefit of blockchain\'s decentralized nature?',
      options: [
        'It makes transactions faster',
        'No single entity can control or manipulate the data',
        'It reduces transaction costs to zero',
        'It makes the blockchain invisible',
      ],
      correctAnswer: 1,
      explanation: 'Decentralization means no single entity controls the blockchain, making it resistant to censorship and manipulation.',
    },
  },
  {
    id: 'crypto-wallets',
    title: 'Understanding Crypto Wallets',
    category: 'basics',
    contentTemplate: `
# Your Digital Wallet Guide

A cryptocurrency wallet is a tool that allows you to interact with blockchain networks. It stores your private keys - the passwords that give you access to your crypto assets.

## Types of Wallets

**Hot Wallets**: Connected to the internet, convenient for frequent transactions. Examples: MetaMask, Trust Wallet.

**Cold Wallets**: Offline storage, more secure for long-term holdings. Examples: Ledger, Trezor hardware wallets.

## Key Concepts

**Private Key**: Your secret password. Never share this with anyone! If someone gets your private key, they can access all your funds.

**Public Key**: Your wallet address. This is like your email address - you can share it with others to receive crypto.

**Seed Phrase**: A list of 12-24 words that can restore your wallet. Write it down and store it safely offline.

## Security Best Practices

1. Never share your private key or seed phrase
2. Use hardware wallets for large amounts
3. Enable two-factor authentication when available
4. Verify addresses carefully before sending transactions
5. Be wary of phishing attempts

## Getting Started

Most beginners start with a hot wallet like MetaMask. As you accumulate more crypto, consider moving long-term holdings to a cold wallet for added security.
    `,
    quiz: {
      question: 'What should you NEVER share with anyone?',
      options: [
        'Your public wallet address',
        'Your private key or seed phrase',
        'The name of your wallet app',
        'Your transaction history',
      ],
      correctAnswer: 1,
      explanation: 'Your private key and seed phrase give complete access to your funds. Never share them with anyone, ever!',
    },
  },
  {
    id: 'defi-intro',
    title: 'Introduction to DeFi',
    category: 'defi',
    contentTemplate: `
# Decentralized Finance (DeFi) Explained

DeFi refers to financial services built on blockchain technology that operate without traditional intermediaries like banks or brokers.

## Core DeFi Services

**Lending & Borrowing**: Platforms like Aave and Compound let you lend your crypto to earn interest or borrow against your holdings.

**Decentralized Exchanges (DEXs)**: Trade cryptocurrencies directly with others without a centralized exchange. Examples: Uniswap, PancakeSwap.

**Yield Farming**: Provide liquidity to DeFi protocols and earn rewards in return.

**Staking**: Lock up your crypto to help secure a network and earn rewards.

## Benefits of DeFi

- **Accessibility**: Anyone with an internet connection can access DeFi services
- **Transparency**: All transactions are visible on the blockchain
- **Composability**: DeFi protocols can work together like "money legos"
- **No Intermediaries**: You maintain control of your assets

## Risks to Consider

- **Smart Contract Risk**: Bugs in code can lead to loss of funds
- **Impermanent Loss**: Providing liquidity can result in losses compared to holding
- **High Gas Fees**: Transaction costs can be expensive on some networks
- **Complexity**: DeFi can be confusing for newcomers

## Getting Started Safely

1. Start with small amounts you can afford to lose
2. Research protocols thoroughly before using them
3. Look for audited smart contracts
4. Understand the risks of each DeFi activity
5. Never invest more than you can afford to lose
    `,
    quiz: {
      question: 'What is a key advantage of DeFi over traditional finance?',
      options: [
        'DeFi is completely risk-free',
        'DeFi eliminates all transaction fees',
        'DeFi provides access to financial services without intermediaries',
        'DeFi guarantees profits',
      ],
      correctAnswer: 2,
      explanation: 'DeFi allows anyone to access financial services without needing permission from banks or other intermediaries.',
    },
  },
  {
    id: 'nft-basics',
    title: 'Understanding NFTs',
    category: 'nft',
    contentTemplate: `
# Non-Fungible Tokens (NFTs) Explained

An NFT is a unique digital asset that represents ownership of a specific item or piece of content on the blockchain.

## What Makes NFTs Special?

**Non-Fungible**: Unlike cryptocurrencies where each unit is identical, every NFT is unique and cannot be exchanged one-for-one.

**Provable Ownership**: The blockchain provides a permanent record of who owns each NFT.

**Programmable**: NFTs can include smart contracts that execute automatically (like paying royalties to creators).

## Common Use Cases

- **Digital Art**: Artists can sell unique digital artworks
- **Collectibles**: Trading cards, virtual items, and memorabilia
- **Gaming**: In-game items that players truly own
- **Music & Media**: Musicians can sell limited edition releases
- **Virtual Real Estate**: Ownership of digital land in metaverse platforms

## How to Buy NFTs

1. Set up a crypto wallet (like MetaMask)
2. Purchase cryptocurrency (usually ETH)
3. Connect your wallet to an NFT marketplace (OpenSea, Rarible, etc.)
4. Browse and purchase NFTs

## Important Considerations

- **Value is Subjective**: NFT prices can be highly volatile
- **Do Your Research**: Many NFT projects fail or turn out to be scams
- **Storage**: Your NFT is on the blockchain, but the actual image/file might be stored elsewhere
- **Gas Fees**: Minting and trading NFTs can incur significant transaction costs

## The Future of NFTs

Beyond art and collectibles, NFTs have potential applications in ticketing, identity verification, supply chain tracking, and more.
    `,
    quiz: {
      question: 'What does "non-fungible" mean in the context of NFTs?',
      options: [
        'The NFT cannot be sold',
        'Each NFT is unique and cannot be exchanged one-for-one',
        'The NFT is worthless',
        'The NFT can only be used once',
      ],
      correctAnswer: 1,
      explanation: 'Non-fungible means each NFT is unique and has its own distinct value, unlike fungible assets like dollars or Bitcoin where each unit is identical.',
    },
  },
  {
    id: 'security-basics',
    title: 'Crypto Security Essentials',
    category: 'security',
    contentTemplate: `
# Staying Safe in Crypto

Security is paramount in the crypto world. Unlike traditional banking, there's no customer service to call if you lose your funds. Here's how to protect yourself.

## Common Scams to Avoid

**Phishing**: Fake websites or emails that try to steal your private keys. Always verify URLs carefully.

**Rug Pulls**: Developers abandon a project and run away with investors' funds. Look for audited projects with transparent teams.

**Ponzi Schemes**: "Guaranteed returns" that are too good to be true. If it sounds too good to be true, it probably is.

**Fake Airdrops**: Scammers promise free tokens but steal your wallet information instead.

## Security Best Practices

1. **Use Hardware Wallets**: For significant holdings, use a hardware wallet like Ledger or Trezor
2. **Enable 2FA**: Use two-factor authentication on all exchanges and services
3. **Verify Addresses**: Always double-check wallet addresses before sending transactions
4. **Keep Software Updated**: Update your wallets and security software regularly
5. **Use Strong Passwords**: Unique, complex passwords for each service
6. **Beware of Social Engineering**: Never share your seed phrase or private keys with anyone

## Red Flags to Watch For

- Promises of guaranteed returns
- Pressure to invest quickly
- Anonymous or fake team members
- No smart contract audit
- Locked or suspicious liquidity
- Unrealistic tokenomics

## What to Do If You're Scammed

Unfortunately, blockchain transactions are irreversible. Prevention is your only real protection. If you suspect a scam:

1. Stop interacting with the project immediately
2. Report it to relevant authorities and platforms
3. Warn others in the community
4. Learn from the experience

## Resources for Staying Informed

- Follow reputable crypto security accounts on Twitter
- Join community Discord servers for projects you're interested in
- Use tools like Token Sniffer or RugDoc to check projects
- Stay updated on the latest scam techniques
    `,
    quiz: {
      question: 'What is the most important rule for protecting your crypto?',
      options: [
        'Only invest in Bitcoin',
        'Never share your private key or seed phrase with anyone',
        'Use the same password for all accounts',
        'Keep all your crypto on exchanges',
      ],
      correctAnswer: 1,
      explanation: 'Your private key and seed phrase are the keys to your crypto kingdom. Never share them with anyone, under any circumstances.',
    },
  },
];
