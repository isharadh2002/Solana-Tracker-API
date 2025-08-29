'use client'

import { SolanaTokenData } from "@/interfaces/tokenInterface"
import { useRouter } from "next/navigation"

interface TokenCardProps {
    tokenData: SolanaTokenData
}

export function TokenCard({ tokenData }: TokenCardProps) {
    const router = useRouter();
    return (
        <div className="bg-blue-300 p-5 rounded-xl w-96 flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <div>
                        <p>{tokenData.token.name}</p>
                        <p>{tokenData.token.symbol}</p>
                    </div>
                    {tokenData.token.image &&
                        <img src={tokenData.token.image} alt="Token Image"
                            className="w-10 h-10 rounded-full" />
                    }
                </div>
                <div>
                    <p>Price : ${tokenData.pools[0].price.usd}</p>
                    <p>24h change : {tokenData.events["24h"] ? tokenData.events["24h"].priceChangePercentage.toPrecision(6) + "%" : "N/A"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p>Creator : {tokenData.token.creation?.creator ? tokenData.token.creation.creator.slice(0, 12) + '...' : "N/A"}</p>
                {tokenData.token.creation &&
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg"
                        onClick={() => { router.push(`/wallet/${tokenData.token.creation.creator}`) }}>
                        View Wallet
                    </button>}
            </div>

        </div>
    )
}