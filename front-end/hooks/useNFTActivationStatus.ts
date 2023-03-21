import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import abi from '../pages/utils/FeeNFT.json'
import { CONTRACT_ADDRESS } from '../constants'

export type NftActivationStatusResult = {
    isActivated: boolean | null;
    isLoading: boolean;
};

const useNftActivationStatus = (tokenId: number | null): NftActivationStatusResult => {
    const [isActivated, setIsActivated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { data, isError } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'getIsActivated',
        args: [tokenId],
        watch: true,
        onSuccess(data) {
            setIsActivated(data as boolean);
            console.log(tokenId)
            console.log(data as boolean)
            setIsLoading(false)
        },
    });

    useEffect(() => {
        if (tokenId === null) {
            setIsActivated(null);
        }
    }, [tokenId]);

    return {
        isActivated,
        isLoading,
    };
};

export default useNftActivationStatus;
