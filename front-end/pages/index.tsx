import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container, Heading,Stack, Divider,  } from '@chakra-ui/react'
import ActiveCard from '../components/activeCard';


const Home: NextPage = () => {
  return (
    <Container maxW="container.xl">
    <ConnectButton />
      <Stack spacing={1}>
        <Heading>Active Memberships</Heading>
        <Divider />
        <SimpleGrid minChildWidth="350px" spacing={8} py={8}>
          <ActiveCard />
          <ActiveCard />
        </SimpleGrid>
      </Stack>
      
    </Container>
  );
};

export default Home;
