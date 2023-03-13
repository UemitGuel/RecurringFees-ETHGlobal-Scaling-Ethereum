import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import BasicNftABI from "../constants/BasicNft.json";
import Image from "next/image";
import { Card } from "web3uikit";
import { ethers } from "ethers";

const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;
  const separator = "...";
  const separatorLength = separator.length;
  const charsToShow = strLen - separatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

export default function NFTBox({ nftAddress, tokenId }) {
  const { isWeb3Enabled, account } = useMoralis();
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenOwner, setTokenOwner] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: BasicNftABI,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  });

  const { runContractFunction: payFee } = useWeb3Contract({
    abi: BasicNftABI,
    contractAddress: nftAddress,
    functionName: "payFee",
    params: {
      tokenId: tokenId,
    },
  });

  const { runContractFunction: ownerOf } = useWeb3Contract({
    abi: BasicNftABI,
    contractAddress: nftAddress,
    functionName: "ownerOf",
    params: {
      tokenId: tokenId,
    },
  });

  async function updateUI() {
    const tokenURI = await getTokenURI();

    if (tokenURI) {
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const tokenURIResponse = await (await fetch(requestURL)).json();
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const owner = await ownerOf(tokenId);
      setImageURI(imageURIURL);
      setTokenOwner(owner);

      setTokenName(tokenURIResponse.name);
      setTokenDescription(tokenURIResponse.description);
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled, tokenOwner]);

  const handleCardClick = () => {
    console.log("handleCardClick");

    payFee({
      onError: (error) => console.log(error),
      onSuccess: console.log("success"),
    });
  };

  const isOwnedByUser = tokenOwner === account || tokenOwner === undefined;
  const formattedSellerAddress = isOwnedByUser
    ? "you"
    : truncateStr(tokenOwner || "", 15);

  return (
    <div>
      <div>
        {imageURI ? (
          <div>
            <Card
              title={tokenName}
              description={tokenDescription}
              onClick={handleCardClick}
            >
              <div className="p-7 ">
                <div className="flex flex-col items-end gap-2">
                  <div class="font-mono">#{tokenId}</div>
                  <div className="italic text-sm font-mono">
                    Owned by {formattedSellerAddress}
                  </div>
                  <Image
                    loader={() => imageURI}
                    src={imageURI}
                    height="200"
                    width="200"
                  />
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div class="font-mono"> loading...</div>
        )}
      </div>
    </div>
  );
}
