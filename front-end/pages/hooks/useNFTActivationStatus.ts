import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import abi from '../utils/FeeNFT.json'
import { CONTRACT_ADDRESS } from '../utils/constants'


type NftActivationStatusResult = {
    isActivated: boolean | null;
    isError: boolean;
    isLoading: boolean;
};

const useNftActivationStatus = (tokenId: number): NftActivationStatusResult => {
    const [isActivated, setIsActivated] = useState<boolean | null>(null);

    const { data, isError, isLoading } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'getIsActivated',
        args: [tokenId],
        onSuccess(data) {
            setIsActivated(data as boolean);
        },
    });

    return {
        isActivated,
        isError,
        isLoading,
    };
};

export default useNftActivationStatus;