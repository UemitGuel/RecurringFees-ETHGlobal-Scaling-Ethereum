import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi';
import abi from '../pages/utils/FeeNFT.json'
import { CONTRACT_ADDRESS } from '../constants'
import BigNumber from 'bignumber.js';

function unixTimestampToString(unixTimestamp: BigNumber): string | null {
    // Convert the BigNumber to a JavaScript number
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

export type NftActivationStatusResult = {
    isActivated: boolean | null;
    loadingActivationStatus: boolean;
    validUntil: string | null;
};

const contract = {
    address: CONTRACT_ADDRESS,
    abi: abi,
} as const

const useNftActivationStatus = (tokenId: number | null): NftActivationStatusResult => {
    const [isActivated, setIsActivated] = useState<boolean | null>(null);
    const [loadingActivationStatus, setLoadingActivationStatus] = useState<boolean>(true);
    const [validUntil, setValidUntil] = useState<string | null>(null)

    const { data, isError } = useContractReads({
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
        ],
        watch: true,
        structuralSharing: (prev, next) => (prev === next ? prev : next),
        onSuccess(data) {
            console.log('Success', data)
            setIsActivated(data[0] as boolean)
            setLoadingActivationStatus(false)
            const validUntilBigNumber = data[1] as BigNumber
            const dataString = unixTimestampToString(validUntilBigNumber)
            setValidUntil(dataString)
        },
    });

    useEffect(() => {
        if (tokenId === null) {
            setIsActivated(null);
        }
    }, [data]);

    return {
        isActivated,
        loadingActivationStatus,
        validUntil
    };
};

export default useNftActivationStatus;
