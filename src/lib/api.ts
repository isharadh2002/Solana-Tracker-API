import { SolanaTokenData } from "@/interfaces/tokenInterface";
import { SolanaWalletData } from "@/interfaces/walletInterface";

const SOLANA_API_BASE_URL = "https://data.solanatracker.io";
const SOLANA_API_KEY = process.env.NEXT_PUBLIC_SOLANA_API_KEY;

const header = {
    'x-api-key': `${SOLANA_API_KEY}`,
    'Content-Type': 'application/json'
}

export async function fetchTrendingTokens(): Promise<SolanaTokenData[] | void> {
    try {
        if (!SOLANA_API_KEY) {
            throw Error("API key not found");
        }

        const response = await fetch(`${SOLANA_API_BASE_URL}/tokens/trending`, {
            headers: header
        })

        if (!response.ok) {
            throw Error("API response error, status :" + response.status);
        }

        const data: SolanaTokenData[] = await response.json();

        if (!data) {
            throw Error("Failed to load token data");
        }

        return data;

    } catch (error) {
        console.log("An error occured when fetching treding tokens :" + error);
    }
}

export async function fetchWalletData(address: string): Promise<SolanaWalletData | void> {
    try {
        if (!SOLANA_API_KEY) {
            throw Error("API key not found");
        }

        const response = await fetch(`${SOLANA_API_BASE_URL}/wallet/${address}/basic`, {
            headers: header
        })

        if (!response.ok) {
            throw Error("API response error, status :" + response.status);
        }

        const data: SolanaWalletData = await response.json();

        if (!data) {
            throw Error("Failed to load wallet data");
        }

        return data;

    } catch (error) {
        console.log("An error occured when fetching wallet data :" + error);
    }
}