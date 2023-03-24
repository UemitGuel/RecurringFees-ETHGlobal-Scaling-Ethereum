import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Heading, Divider } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react';
import { useAccount } from 'wagmi'
import CardComponent from '../components/cardComponent';
import useQueryNFTCount from '../hooks/useQueryNFTCount';

const Home: NextPage = () => {
  const [tokenIdArray, setTokenIdArray] = useState<number[]>([])

  const { address, isConnected, isDisconnected } = useAccount({
    onDisconnect() {
      setTokenIdArray([])
      console.log('Disconnected')
    },
  })
  
  // Hooks
  const count = useQueryNFTCount()

  useEffect(() => {
    const newArray = Array.from({ length: count }, (_, i) => i);
    setTokenIdArray(newArray)
  }, [count])

  return (
    <Container maxW="container.lg">
      <Container p={'16'} centerContent>
        <ConnectButton />
      </Container>
      <Heading>Memberships</Heading>
      <Divider />
      {isDisconnected ? null : (
        <SimpleGrid columns={2} spacing={10}>
          {tokenIdArray.map(tokenId => (
            <CardComponent key={tokenId} tokenId={tokenId} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}
export default Home;
