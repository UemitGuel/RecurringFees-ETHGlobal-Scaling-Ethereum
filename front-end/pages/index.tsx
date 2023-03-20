import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react';
import { useAccount } from 'wagmi'
import { getNFTs } from './api/alchemyNFTs';
import { OwnedNft } from 'alchemy-sdk';
import CardComponent from '../components/cardComponent';

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [isLoading, setIsloading] = useState(false)

  const { address, isConnected, isDisconnected } = useAccount({
    onDisconnect() {
      setNfts([])
      console.log('Disconnected')
    },
  })
  const prevAddress = useRef<string | undefined>(undefined);

  async function fetchData() {
    setIsloading(true)
    if (address && address !== prevAddress.current) {
      const nfts = await getNFTs(address);
      setNfts(nfts)
      console.log(nfts)
      console.log(address)
    } else {
      console.log('address is undefined');
    }
    setIsloading(false)
  }

  useEffect(() => {
    fetchData();
    prevAddress.current = address;
  }, [address])

  return (
    <Container maxW="container.xl">
      <Container p={'16'} centerContent>
        <ConnectButton />
      </Container>
      {isDisconnected ? null : (
        <SimpleGrid minChildWidth="350px" spacing={8} py={8}>
          {nfts.map(nft => (
            <CardComponent key={nft.tokenId + nft.contract.address} nft={nft} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}
export default Home;
