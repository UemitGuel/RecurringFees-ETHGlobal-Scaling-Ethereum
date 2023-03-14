import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import ActiveCard from '../components/activeCard';
import InActiveCard from '../components/inActiveCard';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getNFTs } from './api/alchemyNFTs';
import { OwnedNftsResponse } from 'alchemy-sdk';

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<OwnedNftsResponse>({ ownedNfts: [], totalCount: 0, blockHash: '' });
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const nfts = await getNFTs(address);
        setNfts(nfts);
      } else {
        console.log('myValue is undefined');
      }
    };

    fetchData();
  }, [address])

  return (
    <Container maxW="container.xl">
      <Container p={'16'} centerContent>
        <ConnectButton />
      </Container>
      <Tabs size='lg' isFitted>
        <TabList>
          <Tab>Inactive NFTs</Tab>
          <Tab>Active NFTs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid minChildWidth="150px" spacing={8} py={8}>
              {nfts.ownedNfts.map(nft => (
                <InActiveCard key={nft.tokenId + nft.contract} title={nft.title} url={nft.media[0].gateway} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid minChildWidth="350px" spacing={8} py={8}>
              <ActiveCard />
              <ActiveCard />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
export default Home;
