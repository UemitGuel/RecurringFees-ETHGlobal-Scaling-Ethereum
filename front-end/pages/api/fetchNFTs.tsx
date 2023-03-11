// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: "cH9g5ftcQAdQm-fJ9Zljl7Z8lhv2i4CX",
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

// Fetch all the NFTs owned by elanhalpern.eth
const main = async () => {
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner("elanhalpern.eth");
    // Print NFTs
    console.log(nfts);
};

// Execute the code
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();