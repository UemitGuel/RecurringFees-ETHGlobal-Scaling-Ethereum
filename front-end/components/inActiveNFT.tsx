import React from 'react';
import { OwnedNft } from 'alchemy-sdk';
import InActiveCard from './inActiveCard';
import useNftActivationStatus from '../pages/hooks/useNFTActivationStatus';

interface InactiveNftProps {
    nft: OwnedNft;
}

const InactiveNft: React.FC<InactiveNftProps> = ({ nft }) => {
    const tokenId = parseInt(nft.tokenId) || 0;
    const { isActivated } = useNftActivationStatus(tokenId);

    if (!isActivated) {
        return <InActiveCard key={nft.tokenId + nft.contract} title={nft.title} url={nft.media[0].gateway} />;
    }
    return null;
};

export default InactiveNft;