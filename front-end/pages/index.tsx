import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react';
import { useAccount } from 'wagmi'
import { getNFTs } from './api/alchemyNFTs';
import { OwnedNft } from 'alchemy-sdk';
import ActiveNft from '../components/activeNft';
import InActiveNft from '../components/inActiveNFT';

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
        <Tabs size='lg' isFitted>
          <TabList>
            <Tab>Inactive Memberships</Tab>
            <Tab>Active Memberships</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid minChildWidth="150px" spacing={8} py={8}>
                {nfts.map(nft => (
                  <InActiveNft key={nft.tokenId + nft.contract.address} nft={nft} />
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid minChildWidth="150px" spacing={8} py={8}>
                {nfts.map(nft => (
                  <ActiveNft key={nft.tokenId + nft.contract.address} nft={nft} />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Container>
  )
}
export default Home;
