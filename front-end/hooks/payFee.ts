import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import abi from '../pages/utils/FeeNFT.json';
import { CONTRACT_ADDRESS } from '../constants';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';

export type NftFeeStatusResult = {
    isLoading: boolean;
    isSuccess: boolean | null;
    write: (() => void) | undefined;
};

const paymentAmount = new BigNumber(0.00001)

const usePayFee = (tokenId: number): NftFeeStatusResult => {
    const { config } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'payFee',
        args: [tokenId],
        overrides: {
            value: ethers.utils.parseEther('0.00001'),
        },
        onError() {
            console.log("Errrrrrrrror")
        }
    });
    const { data, write } = useContractWrite(config);
    const { isLoading: isLoading, isSuccess: isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return {
        isLoading,
        isSuccess,
        write
    };
};

export default usePayFee;