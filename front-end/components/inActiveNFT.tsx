import React from 'react';
import { OwnedNft } from 'alchemy-sdk';
import InActiveCard from './inActiveCard';
import useNftActivationStatus from '../hooks/useNFTActivationStatus';

interface InActiveNftProps {
    nft: OwnedNft;
}

const InActiveNft: React.FC<InActiveNftProps> = ({ nft }) => {
    const tokenId = parseInt(nft.tokenId) || 0;
    const { isActivated } = useNftActivationStatus(tokenId);

    if (!isActivated) {
        return <InActiveCard key={nft.tokenId + nft.contract} title={nft.title} url={nft.media[0].gateway} tokenId={+nft.tokenId} />;
    }
    return null;
};

export default InActiveNft;