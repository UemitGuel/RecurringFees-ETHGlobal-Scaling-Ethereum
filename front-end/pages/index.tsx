import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Heading, Stack, HStack, Divider, Tabs, Tab, TabList, TabPanels, TabPanel, Text  } from '@chakra-ui/react'
import ActiveCard from '../components/activeCard';
import InActiveCard from '../components/inActiveCard';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_APIKEY, // Replace with your Alchemy API key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(config);


const Home: NextPage = () => {

  const [address3, setAddress] = useState('')
  const [isConnected3, setIsConnected] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    if (address) {
      setAddress(address);
    } else {
      console.log('myValue is undefined');
      setAddress('')
    }
    setIsConnected(isConnected)
  }, [address])

  return (
    <Container maxW="container.xl">
      <ConnectButton />
      <Text>{isConnected3 ? 'Yes' : 'No'}</Text>
      <Text>{address3}</Text>
    </Container>
  )
}

/*   return (
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
              <InActiveCard />
              <InActiveCard />
              <InActiveCard />
              <InActiveCard />
              <InActiveCard />
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
  ); */

export default Home;
