import { useContractRead, useContractReads } from "wagmi"
import abi from '../pages/utils/FeeNFT.json'
import { CONTRACT_ADDRESS } from '../constants'
import { useState } from "react"

const contract = {
    address: CONTRACT_ADDRESS,
    abi: abi,
} as const

const useQueryNFTCount = (): number => {

    const [count, setCount] = useState(0)

    const { } = useContractRead({
        ...contract,
        functionName: 'getTokenCounter',
        structuralSharing: (prev, next) => (prev === next ? prev : next),
        onSuccess(data) {
            setCount(data as number)
        },
    })
    
    return count
}

export default useQueryNFTCount