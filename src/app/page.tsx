'use client'
import { TokenCard } from "@/components/tokenCard";
import { SolanaTokenData } from "@/interfaces/tokenInterface";
import { fetchTrendingTokens } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [tokens, setTokens] = useState<SolanaTokenData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  const loadTrendingTokens = async () => {
    setLoading(true);
    try {
      const response = await fetchTrendingTokens();
      if (!response) {
        throw Error("API function returned nothing");
      }
      setTokens(response);
      setErrors('');
      console.log("Trending tokens loaded successfully.");
    }
    catch (error) {
      console.log("Error occured when loading trending tokens :" + error);
      setErrors("Failed to load trending token data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrendingTokens();
  }, [])

  if (loading) {
    return (
      <div className="text-black min-w-screen min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex flex-col justify-center items-center">
        <p className="text-4xl font-bold">Loading trending tokens</p>
      </div>
    )
  }

  if (errors) {
    return (
      <div className="text-black min-w-screen min-h-screen bg-gradient-to-r from-red-200 to-red-300 flex flex-col justify-center items-center gap-2">
        <p className="text-4xl font-bold">Failed to load trending tokens</p>
        <p className="text-red-500 text-4xl font-bold">{errors}</p>
        <button
          className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-bold"
          onClick={() => { loadTrendingTokens() }}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="text-black min-w-screen min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center p-10">
      <p className="text-4xl font-bold mb-5">Solana Trending Tokens</p>
      <div className="flex flex-row flex-wrap gap-5 justify-center max-w-7xl">
        {tokens.map((token, index) => {
          return (
            <div key={index}>
              <TokenCard tokenData={token} />
            </div>
          )
        })}
      </div>
    </div>
  );
}
