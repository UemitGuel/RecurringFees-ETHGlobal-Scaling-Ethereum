import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Heading, Stack, HStack, Divider, Tabs, Tab, TabList, TabPanels, TabPanel, Text  } from '@chakra-ui/react'
import ActiveCard from '../components/activeCard';
import InActiveCard from '../components/inActiveCard';
import React from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <Container maxW="container.xl">
      <ConnectButton />
      <Text>{isConnected ? 'Yes' : 'No'}</Text>
      <Text>{address}</Text>
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
