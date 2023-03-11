// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: demo, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.

};

const alchemy = new Alchemy(settings);

// Print all NFTs returned in the response:
function getNftsForOwner() {
    alchemy.nft.getNftsForOwner("0xshah.eth").then(console.log);
}
