// Token creation information
export interface TokenCreation {
    creator: string;
    created_tx: string;
    created_time: number;
}

// Token basic information
export interface Token {
    name: string;
    symbol: string;
    mint: string;
    uri: string;
    decimals: number;
    isMutable: boolean;
    createdOn: string;
    image: string;
    website: string;
    hasFileMetaData: boolean;
    creation: TokenCreation;
}

// Pool liquidity information
export interface PoolLiquidity {
    quote: number;
    usd: number;
}

// Price information
export interface PoolPrice {
    quote: number;
    usd: number;
}

// Market cap information
export interface MarketCap {
    quote: number;
    usd: number;
}

// Security information
export interface Security {
    freezeAuthority: string | null;
    mintAuthority: string | null;
}

// Transaction statistics
export interface Transactions {
    buys: number;
    sells: number;
    total: number;
    volume: number;
    volume24h: number;
}

// Pool information
export interface Pool {
    liquidity: PoolLiquidity;
    price: PoolPrice;
    tokenSupply: number;
    lpBurn: number;
    tokenAddress: string;
    marketCap: MarketCap;
    market: string;
    quoteToken: string;
    decimals: number;
    security: Security;
    lastUpdated: number;
    createdAt: number;
    deployer: string;
    txns: Transactions;
    poolId: string;
}

// Price change events for different time periods
export interface PriceChangeEvent {
    priceChangePercentage: number;
}

export interface Events {
    "1m": PriceChangeEvent;
    "5m": PriceChangeEvent;
    "15m": PriceChangeEvent;
    "30m": PriceChangeEvent;
    "1h": PriceChangeEvent;
    "2h": PriceChangeEvent;
    "3h": PriceChangeEvent;
    "4h": PriceChangeEvent;
    "5h": PriceChangeEvent;
    "6h": PriceChangeEvent;
    "12h": PriceChangeEvent;
    "24h": PriceChangeEvent;
}

// Risk assessment wallet information
export interface RiskWallet {
    address: string;
    balance: number;
    percentage: number;
}

// Snipers risk information
export interface SnipersRisk {
    count: number;
    totalBalance: number;
    totalPercentage: number;
    wallets: RiskWallet[];
}

// Insiders risk information
export interface InsidersRisk {
    count: number;
    totalBalance: number;
    totalPercentage: number;
    wallets: RiskWallet[];
}

// Developer holdings
export interface DevHoldings {
    percentage: number;
    amount: number;
}

// Risk assessment
export interface Risk {
    snipers: SnipersRisk;
    insiders: InsidersRisk;
    top10: number;
    dev: DevHoldings;
    rugged: boolean;
    risks: string[];
    score: number;
    jupiterVerified: boolean;
}

// Main token data interface
export interface SolanaTokenData {
    token: Token;
    pools: Pool[];
    events: Events;
    risk: Risk;
    holders: number;
    buysCount: number;
    sellsCount: number;
}
