import React from 'react';
import { OwnedNft } from 'alchemy-sdk';
import ActiveCard from './activeCard';
import useNftActivationStatus from '../hooks/useNFTActivationStatus';

interface ActiveNftProps {
    nft: OwnedNft;
}

const ActiveNft: React.FC<ActiveNftProps> = ({ nft }) => {
    const tokenId = parseInt(nft.tokenId) || 0;
    const { isActivated } = useNftActivationStatus(tokenId);

    if (isActivated) {
        return <ActiveCard key={ nft.tokenId + nft.contract } title= { nft.title } url= { nft.media[0].gateway } />
    }
    return null;
}

export default ActiveNft;