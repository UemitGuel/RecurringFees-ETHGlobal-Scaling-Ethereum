// Import statements and other imports
import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi';
import abi from '../pages/utils/FeeNFT.json';
import { CONTRACT_ADDRESS } from '../constants';
import BigNumber from 'bignumber.js';


async function getMetadataFromTokenURI(tokenURI: string): Promise<any> {
    const ipfsGateway = 'https://ipfs.io/ipfs/';
    const cid = tokenURI.replace('ipfs://', '');
    const metadataURL = ipfsGateway + cid;

    try {
        const response = await fetch(metadataURL);
        const metadata = await response.json();
        return metadata;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
}

export type NFT = {
    title: string
    description: string
    owner: string
    isActivated: boolean
    validUntil: string | null
    imageUrl: string
    isLoadingData: boolean
}

const contract = {
    address: CONTRACT_ADDRESS,
    abi: abi,
} as const

function unixTimestampToString(unixTimestamp: BigNumber): string | null {
    // Convert the BigNumber to a JavaScript number
    if (unixTimestamp == null) {
        return null
    }
    const timestampNumber = unixTimestamp.toNumber();
    if (timestampNumber == 0) {
        return null
    }

    // Create a Date object from the Unix timestamp
    const date = new Date(timestampNumber * 1000);

    // Format the date as a string
    const dateString = date.toLocaleString();

    return dateString;
}

const useQueryNFTData = (tokenId: number): NFT | undefined => {
    const [nft, setNft] = useState<NFT>();
    const [count, setCount] = useState(0)
    const [isActivated, setIsActivated] = useState<boolean | null>(null);
    const [validUntil, setValidUntil] = useState<string | null>(null)
    const [owner, setOwner] = useState<string | null>(null)
    const [tokenURI, setTokenURI] = useState<string | null>(null)
    const [title, setTitle] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [imageURl, setImageURl] = useState<string | null>(null)

    const { data, isLoading, isError } = useContractReads({
        contracts: [
            {
                ...contract,
                functionName: 'getIsActivated',
                args: [tokenId],
            },
            {
                ...contract,
                functionName: 'getValidUntil',
                args: [tokenId],
            },
            {
                ...contract,
                functionName: 'ownerOf',
                args: [tokenId],
            },
            {
                ...contract,
                functionName: 'tokenURI',
                args: [tokenId],
            },
        ],
        watch: true,
        structuralSharing: (prev, next) => (prev === next ? prev : next),
        onSuccess(data) {
            setIsActivated(data[0] as boolean)
            const validUntilBigNumber = data[1] as BigNumber
            const dataString = unixTimestampToString(validUntilBigNumber)
            setValidUntil(dataString)
            setOwner(data[2] as string)
            setTokenURI(data[3] as string)
        },
    });

    const [nftData, setNftData] = useState<{
        title: string | null;
        description: string | null;
        imageURl: string | null;
    }>({
        title: null,
        description: null,
        imageURl: null,
    });

    useEffect(() => {
        async function getImageURLFromTokenURI(tokenURI: string) {
            const metadata = await getMetadataFromTokenURI(tokenURI);

            if (metadata) {
                const newNftData = {
                    title: metadata.name || null,
                    description: metadata.description || null,
                    imageURl: metadata.image || null,
                };

                setNftData(newNftData);

                if (
                    newNftData.title &&
                    newNftData.description &&
                    newNftData.imageURl &&
                    owner &&
                    isActivated !== null
                ) {
                    const myNFT: NFT = {
                        title: newNftData.title,
                        description: newNftData.description,
                        owner: owner,
                        isActivated: isActivated,
                        validUntil: validUntil,
                        imageUrl: newNftData.imageURl,
                        isLoadingData: false,
                    };
                    setNft(myNFT);
                }
            }
        }

        if (tokenURI) {
            getImageURLFromTokenURI(tokenURI).catch((error) => {
                console.error('Error getting image URL:', error);
            });
        }
    }, [tokenURI, isActivated, validUntil, owner]);

    return nft
};

export default useQueryNFTData;
