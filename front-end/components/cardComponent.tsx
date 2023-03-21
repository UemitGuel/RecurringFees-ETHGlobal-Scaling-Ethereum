import { Card, CardBody, Image, Stack, Heading, Text, Button, Alert, AlertIcon, CardFooter, Flex, Spinner, Badge, Divider, ButtonGroup, Link, HStack } from '@chakra-ui/react'
import { OwnedNft } from 'alchemy-sdk';
import { url } from 'inspector';
import { CONTRACT_ADDRESS } from '../constants'
import React, { useEffect, useState } from 'react';
import usePayFee, { NftFeeStatusResult } from '../hooks/payFee';
import useNftActivationStatus, { NftActivationStatusResult } from '../hooks/useNFTActivationStatus';

interface InActiveNftProps {
    nft: OwnedNft;
}

const CardComponent: React.FC<InActiveNftProps> = ({ nft }) => {

    // Prepare hooks
    const tokenId = parseInt(nft.tokenId);

    // Hooks 
    const { isPayingFee, successfullyPayedFee, payfee } = usePayFee(tokenId);
    const { isActivated, loadingActivationStatus, validUntil } = useNftActivationStatus(tokenId);

    const [nftFeeStatusResult, setNftFeeStatusResult] = useState<NftFeeStatusResult>({ isPayingFee: false, successfullyPayedFee: null, payfee: undefined })
    const [activationStatus, setActivationStatus] = useState<NftActivationStatusResult>({ isActivated: null, loadingActivationStatus: true, validUntil: '' })

    // State changes
    useEffect(() => {
        setActivationStatus({ isActivated, loadingActivationStatus, validUntil });
    }, [isActivated]);
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
                    src={nft.media[0].gateway}
                    alt='Caffe Latte'
                />


                <Stack mt='6' spacing='3'>
                    <Heading size='md'> {nft.title} <Badge fontSize='0.8em' ml='1' colorScheme={activationStatus.isActivated ? 'green' : 'yellow'}>
                        {activationStatus.isActivated ? 'Active' : 'Inactive'}
                    </Badge></Heading>
                    {activationStatus.isActivated ? null : (
                        <Text fontSize='2xl'>
                            Fee: 0.0001 ETH
                        </Text>
                    )}
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    {activationStatus.loadingActivationStatus ? (<Spinner />) : (
                        !activationStatus.isActivated ? (
                            <Button variant='solid' colorScheme='blue' disabled={activationStatus.loadingActivationStatus} onClick={() => payfee?.()} isLoading={nftFeeStatusResult.isPayingFee} loadingText='Activating'>
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