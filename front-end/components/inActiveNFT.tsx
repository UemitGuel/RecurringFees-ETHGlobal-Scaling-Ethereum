import React from 'react';
import { OwnedNft } from 'alchemy-sdk';
import InActiveCard from './inActiveCard';
import useNftActivationStatus from '../hooks/useNFTActivationStatus';
import { Spinner } from '@chakra-ui/react';

interface InActiveNftProps {
    nft: OwnedNft;
}

const InActiveNft: React.FC<InActiveNftProps> = ({ nft }) => {
    const tokenId = parseInt(nft.tokenId) || 0;
    const { isLoading, isActivated } = useNftActivationStatus(tokenId);

    if (isLoading) {
        return (
            <Spinner size='xl' />
        )
    }
    return null;
};

export default InActiveNft;