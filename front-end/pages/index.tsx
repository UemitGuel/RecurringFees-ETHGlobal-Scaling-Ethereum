import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { SimpleGrid, Container } from '@chakra-ui/react'
import ActiveCard from '../components/activeCard';


const Home: NextPage = () => {
  return (
    <Container maxW="container.xl">
    <ConnectButton />
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      <ActiveCard />
    </SimpleGrid>
    </Container>
  );
};

export default Home;
