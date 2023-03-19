import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getNFTs } from './api/alchemyNFTs';
import { OwnedNft, OwnedNftsResponse } from 'alchemy-sdk';
import ActiveNft from '../components/activeNft';
import InActiveNft from '../components/inActiveNft';

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [activeNFTs, setActiveNFTs] = useState<OwnedNft[]>([]);
  const [inActiveNFTs, setInActiveNFTs] = useState<OwnedNft[]>([]);
  const [addressSaved, setAddressSaved] = useState<string>('')
  const [boolean, setboolean] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const { address, isConnected, isDisconnected } = useAccount({
    onDisconnect() {
      setActiveNFTs([])
      setInActiveNFTs([])
      console.log('Disconnected')
    },
  })
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
      )}
    </Container>
  )

}
export default Home;
