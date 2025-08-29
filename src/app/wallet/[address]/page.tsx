'use client'

import { SolanaWalletData } from "@/interfaces/walletInterface";
import { fetchWalletData } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function WalletInfo() {
    const [walletInfo, setWalletInfo] = useState<SolanaWalletData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string>("");

    const params = useParams();
    const walletAddress = params.address as string;
    const router = useRouter();

    const loadWalletData = async () => {
        setLoading(true);
        try {
            const response = await fetchWalletData(walletAddress);
            if (!response) {
                throw Error("API function returned nothing");
            }
            setWalletInfo(response);
            setErrors('');
            console.log("Wallet loaded successfully.");
        }
        catch (error) {
            console.log("Error occured when loading wallet data :" + error);
            setErrors("Failed to load wallet data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadWalletData();
    }, [])

    if (loading) {
        return (
            <div className="text-black min-w-screen min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex flex-col justify-center items-center">
                <p className="text-4xl font-bold">Loading wallet data</p>
            </div>
        )
    }

    if (errors) {
        return (
            <div className="text-black min-w-screen min-h-screen bg-gradient-to-r from-red-200 to-red-300 flex flex-col justify-center items-center gap-2">
                <p className="text-4xl font-bold">Failed to load wallet data</p>
                <p className="text-red-500 text-4xl font-bold">{errors}</p>
                <button
                    className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-bold"
                    onClick={() => { loadWalletData() }}>
                    Try Again
                </button>
            </div>
        )
    }


    return (
        <div className="text-black min-w-screen min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center p-10">
            <div>
                <p className="text-4xl font-bold">Solana Wallet info</p>
            </div>
            <div className="flex w-full mt-5 flex-col items-start gap-2">
                <p className="text-2xl">Wallet address : {walletAddress}</p>
                <button className="text-white bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-xl"
                    onClick={() => { router.push('/') }}>
                    Go back to trending tokens
                </button>
            </div>
            <div className="flex flex-row gap-10 my-10">
                <div className="bg-blue-300 p-4 rounded-xl w-48">
                    <p>Total</p>
                    <p>{walletInfo?.total}</p>
                </div>
                <div className="bg-blue-300 p-4 rounded-xl w-48">
                    <p>Total SOL</p>
                    <p>{walletInfo?.totalSol}</p>
                </div>
                <div className="bg-blue-300 p-4 rounded-xl w-48">
                    <p>Token Count</p>
                    <p>{walletInfo?.tokens.length}</p>
                </div>
            </div>
            <div className="w-full">
                <table className="w-full">
                    <tr className="bg-blue-200">
                        <th>Address</th>
                        <th>Balance</th>
                        <th>Value</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>Liquidity</th>
                    </tr>
                    {walletInfo?.tokens.map((token, index) => {
                        return (
                            <tr key={index} className="bg-blue-200 even:bg-blue-300">
                                <td>{token.address}</td>
                                <td>{token.balance}</td>
                                <td>{token.value.toPrecision(8)}</td>
                                <td>{token.price.usd.toPrecision(8)}</td>
                                <td>{token.marketCap.usd.toPrecision(8)}</td>
                                <td>{token.liquidity.usd.toPrecision(8)}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}