export const REWARD_TYPES = {
  SOL_TOKENS: 'sol_tokens',
  NFT_DROP: 'nft_drop',
  BURN_BUILD: 'burn_build',
  BONUS_ROUND: 'bonus_round',
  DOUBLE_XP: 'double_xp'
} as const;

export const IDEA_CATEGORIES = {
  DEFI: 'DeFi',
  NFT: 'NFT',
  GAMING: 'Gaming',
  SOCIAL: 'Social',
  INFRASTRUCTURE: 'Infrastructure'
} as const;

export const TRANSACTION_TYPES = {
  SUBMISSION: 'submission',
  VOTE: 'vote',
  REWARD: 'reward',
  DEPLOYMENT: 'deployment'
} as const;

export const SOLANA_NETWORK = {
  MAINNET: 'https://api.mainnet-beta.solana.com',
  DEVNET: 'https://api.devnet.solana.com',
  TESTNET: 'https://api.testnet.solana.com'
} as const;

export const DESIGN_TOKENS = {
  COLORS: {
    BG: 'var(--color-bg)',
    FG: 'var(--color-fg)',
    ACCENT: 'var(--color-accent)',
    PRIMARY: 'var(--color-primary)',
    SURFACE: 'var(--color-surface)',
    BORDER: 'var(--color-border)',
    MUTED: 'var(--color-muted)'
  },
  SPACING: {
    XS: 'var(--spacing-xs)',
    SM: 'var(--spacing-sm)',
    MD: 'var(--spacing-md)',
    LG: 'var(--spacing-lg)',
    XL: 'var(--spacing-xl)',
    XXL: 'var(--spacing-xxl)'
  },
  RADIUS: {
    SM: 'var(--radius-sm)',
    MD: 'var(--radius-md)',
    LG: 'var(--radius-lg)',
    XL: 'var(--radius-xl)'
  }
} as const;
