import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import abi from '../pages/utils/FeeNFT.json';
import { CONTRACT_ADDRESS } from '../constants';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';

export type NftFeeStatusResult = {
    isPayingFee: boolean;
    successfullyPayedFee: boolean | null;
    payfee: (() => void) | undefined;
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
    const { data, write: payfee } = useContractWrite(config);
    const { isLoading: isPayingFee, isSuccess: successfullyPayedFee } = useWaitForTransaction({
        hash: data?.hash,
    })

    return {
        isPayingFee,
        successfullyPayedFee,
        payfee
    };
};

export default usePayFee;