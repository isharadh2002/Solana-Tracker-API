// Token price information
export interface TokenPrice {
    quote: number;
    usd: number;
}

// Token market cap information
export interface TokenMarketCap {
    quote: number;
    usd: number;
}

// Token liquidity information
export interface TokenLiquidity {
    quote: number;
    usd: number;
}

// Individual wallet token holding
export interface WalletToken {
    address: string;
    balance: number;
    value: number;
    price: TokenPrice;
    marketCap: TokenMarketCap;
    liquidity: TokenLiquidity;
}

// Main wallet data interface
export interface SolanaWalletData {
    tokens: WalletToken[];
    total: number;      // Total USD value
    totalSol: number;   // Total SOL equivalent
}