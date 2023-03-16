import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getNFTs } from './api/alchemyNFTs';
import { OwnedNft, OwnedNftsResponse } from 'alchemy-sdk';
import { useContractRead } from 'wagmi'
import ActiveNft from '../components/activeNFT';
import InActiveNft from '../components/inActiveNFT';



const Home: NextPage = () => {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [activeNFTs, setActiveNFTs] = useState<OwnedNft[]>([]);
  const [inActiveNFTs, setInActiveNFTs] = useState<OwnedNft[]>([]);
  const [addressSaved, setAddressSaved] = useState<string>('')
  const [boolean, setboolean] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    async function fetchData() {
      if (address) {
          setAddressSaved(address)
          const nfts = await getNFTs(address);
          setNfts(nfts)
      } else {
        console.log('address is undefined');
      }
    }
    fetchData();
  }, [address])

  return (
    <Container maxW="container.xl">
      <Container p={'16'} centerContent>
        <ConnectButton />
      </Container>
      <Tabs size='lg' isFitted>
        <TabList>
          <Tab>Inactive Memberships</Tab>
          <Tab>Active Memberships</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid minChildWidth="150px" spacing={8} py={8}>
              {nfts.map(nft => (
                <InActiveNft key={nft.tokenId + nft.contract} nft={nft} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid minChildWidth="150px" spacing={8} py={8}>
              {nfts.map(nft => (
                <ActiveNft key={nft.tokenId + nft.contract} nft={nft} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
export default Home;
