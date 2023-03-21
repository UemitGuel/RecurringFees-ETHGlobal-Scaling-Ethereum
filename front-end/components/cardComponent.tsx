import { Card, CardBody, Image, Stack, Heading, Text, Button, Alert, AlertIcon, CardFooter, Flex, Spinner } from '@chakra-ui/react'
import { OwnedNft } from 'alchemy-sdk';
import { url } from 'inspector';
import React, { useEffect, useState } from 'react';
import usePayFee, { NftFeeStatusResult } from '../hooks/payFee';
import useNftActivationStatus, { NftActivationStatusResult } from '../hooks/useNFTActivationStatus';

interface InActiveNftProps {
    nft: OwnedNft;
}

const CardComponent: React.FC<InActiveNftProps> = ({ nft }) => {
    const tokenId = parseInt(nft.tokenId);
/*     const { isLoading: loadingPayedFee, isSuccess, write } = usePayFee(tokenId);
 */    const { isActivated, isLoading  } = useNftActivationStatus(tokenId);
    const [activationStatus, setActivationStatus] = useState<NftActivationStatusResult>({ isActivated: null, isLoading: true});

    useEffect(() => {
        setActivationStatus({ isActivated, isLoading});
    }, [isActivated]);

/*     useEffect(() => {
        if (loadingPayedFee || isSuccess !== null) {
            setActivationStatus({ loadingPayedFee, isSuccess, write });
        }
    }, [loadingPayedFee, isSuccess]); */

/*     const handleActivateClick = () => {
        setActivationStatus({ isLoading: true, isSuccess: null, write: write });
        write?.(); // call the write function only when it's defined
    }; */

    return (
        <Flex>
            <Card>
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={nft.media[0].gateway}
                alt='Caffe Latte'
            />
            </Card>

            <Stack p={'8'}>
                    <Heading size='md'>{nft.title}</Heading>
                    <Text py='2'>
                        Membership fee 0.0001 ETH
                    </Text>
                    {activationStatus.isLoading ? ( <Spinner />) : (
                    !activationStatus.isActivated ? (
                        <Button variant='solid' colorScheme='blue' disabled={activationStatus.isLoading}>
                            {activationStatus.isLoading ? 'Activating...' : 'Activate'}
                        </Button>
                    ) : null)}
            </Stack>
        </Flex>
    )
}

export default CardComponent;