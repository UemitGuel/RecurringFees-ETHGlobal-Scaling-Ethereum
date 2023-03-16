import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";

const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_APIKEY, // Replace with your Alchemy API key.
    network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(config);

export async function getNFTs(forAddress: string) {
    // Get all NFTs
    const response = await alchemy.nft.getNftsForOwner(forAddress)
    // Print NFTs
    return response.ownedNfts
}