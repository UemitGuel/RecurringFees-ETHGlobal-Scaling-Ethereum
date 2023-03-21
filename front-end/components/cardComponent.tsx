import { Card, CardBody, Image, Stack, Heading, Text, Button, Alert, AlertIcon, CardFooter, Flex, Spinner, Badge, Divider, ButtonGroup, Link, HStack } from '@chakra-ui/react'
import { CONTRACT_ADDRESS } from '../constants'
import React, { useEffect, useState } from 'react';
import usePayFee, { NftFeeStatusResult } from '../hooks/payFee';
import useQueryNFTData, { NFT } from '../hooks/useQueryNFTData';

const CardComponent = ({ tokenId }: { tokenId: number }) => {

    // Hooks 
    const { isPayingFee, successfullyPayedFee, payfee } = usePayFee(tokenId);
    const nft = useQueryNFTData(tokenId)

    const [displayNft, setDisplayNft] = useState<NFT | undefined>(undefined)
    const [nftFeeStatusResult, setNftFeeStatusResult] = useState<NftFeeStatusResult>({ isPayingFee: false, successfullyPayedFee: null, payfee: undefined })

    // State changes
    useEffect(() => {
        if (nft) {
            setDisplayNft(nft)
            console.log(nft?.imageUrl)
        }
    }, [nft])

    useEffect(() => {
        if (isPayingFee || successfullyPayedFee !== null) {
            setNftFeeStatusResult({ isPayingFee, successfullyPayedFee, payfee });
        }
    }, [isPayingFee, successfullyPayedFee]);

    const handleActivateClick = () => {
        setNftFeeStatusResult({ isPayingFee: true, successfullyPayedFee: null, payfee });
        payfee?.()
    };

    return (
        <Card>
            <CardBody>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={displayNft?.imageUrl}
                    alt='NFT'
                />


                <Stack mt='6' spacing='3'>
                    <Heading size='md'> {displayNft?.title} <Badge fontSize='0.8em' ml='1' colorScheme={displayNft?.isActivated ? 'green' : 'yellow'}>
                        {displayNft?.isActivated ? 'Active' : 'Inactive'}
                    </Badge></Heading>
                    {displayNft?.isActivated ? null : (
                        <Text fontSize='2xl'>
                            Fee: 0.0001 ETH
                        </Text>
                    )}
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    {displayNft?.isLoadingData ? (<Spinner />) : (
                        !displayNft?.isActivated ? (
                            <Button variant='solid' colorScheme='blue' disabled={displayNft?.isLoadingData} onClick={handleActivateClick} isLoading={nftFeeStatusResult.isPayingFee} loadingText='Activating'>
                                Activate
                            </Button>
                        ) : null)}
                    <Button variant='ghost' colorScheme='blue'>
                        <Link href={`https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}`} isExternal>
                            See on Opensea
                        </Link>
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default CardComponent;