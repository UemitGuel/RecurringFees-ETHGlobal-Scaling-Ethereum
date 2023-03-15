import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import ActiveCard from '../components/activeCard';
import InActiveCard from '../components/inActiveCard';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getNFTs } from './api/alchemyNFTs';
import { OwnedNft, OwnedNftsResponse } from 'alchemy-sdk';
import { useContractRead } from 'wagmi'
import abi from './utils/FeeNFT.json'


const Home: NextPage = () => {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [activeNFTs, setActiveNFTs] = useState<OwnedNft[]>([]);
  const [inActiveNFTs, setInActiveNFTs] = useState<OwnedNft[]>([]);
  const [boolean, setboolean] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { data, isError, isLoading } = useContractRead({
    address: '0x98e892c3733340C4852b7561E6F7a29ade7f2328',
    abi: abi,
    functionName: 'getIsActivated',
    args: [selectedId],
    onSuccess(data) {
      setboolean(data as boolean)
    }
  })

  useEffect(() => {
    async function fetchData() {
      if (address) {
        setActiveNFTs([])
        setInActiveNFTs([])
        const nfts = await getNFTs(address);
        for (const nft of nfts.ownedNfts) {
          setSelectedId(parseInt(nft.tokenId) || 0)
          if (boolean) {
            setActiveNFTs(prevState => ([
              ...prevState,
              nft
            ]))
          } else {
            setInActiveNFTs(prevState => ([
              ...prevState,
              nft
            ]))
          }
        }
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
              {inActiveNFTs.map(nft => (
                <InActiveCard key={nft.tokenId + nft.contract} title={nft.title} url={nft.media[0].gateway} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid minChildWidth="150px" spacing={8} py={8}>
              {activeNFTs.map(nft => (
                <ActiveCard key={nft.tokenId + nft.contract} title={nft.title} url={nft.media[0].gateway} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
export default Home;
