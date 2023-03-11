import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Heading, Stack, HStack, Divider, Tabs, Tab, TabList, TabPanels, TabPanel  } from '@chakra-ui/react'
import ActiveCard from '../components/activeCard';
import InActiveCard from '../components/inActiveCard';


const Home: NextPage = () => {
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
            <SimpleGrid minChildWidth="350px" spacing={8} py={8}>
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
  );
};

export default Home;
