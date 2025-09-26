export interface User {
  walletAddress: string;
  XP: number;
  nftsOwned: string[];
  tokensHeld: number;
}

export interface Submission {
  submissionId: string;
  userId: string;
  ideaDescription: string;
  submissionTimestamp: string;
  voteCount: number;
  isOnChain: boolean;
  deployedAssetAddress?: string;
}

export interface Vote {
  voteId: string;
  userId: string;
  submissionId: string;
  voteTimestamp: string;
}

export interface RewardConfig {
  rewardId: string;
  type: 'token' | 'nft' | 'burn' | 'build' | 'bonus';
  probability: number;
  description: string;
}

export interface Transaction {
  id: string;
  type: 'submission' | 'vote' | 'reward' | 'deployment';
  status: 'pending' | 'success' | 'error';
  hash?: string;
  timestamp: string;
  description: string;
}

export interface LiveStreamData {
  viewers: number;
  activeIdeas: number;
  totalVotes: number;
  currentMultiplier: number;
}
