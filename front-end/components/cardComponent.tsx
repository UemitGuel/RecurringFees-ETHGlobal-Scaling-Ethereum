import { Card, CardBody, Image, Stack, Heading, Text, Button, Alert, AlertIcon } from '@chakra-ui/react'
import { OwnedNft } from 'alchemy-sdk';
import React, { useEffect, useState } from 'react';
import usePayFee, { NftFeeStatusResult } from '../hooks/payFee';
import useNftActivationStatus, { NftActivationStatusResult } from '../hooks/useNFTActivationStatus';

interface InActiveNftProps {
    nft: OwnedNft;
}

const CardComponent: React.FC<InActiveNftProps> = ({ nft }) => {
    const tokenId = parseInt(nft.tokenId);
/*     const { isLoading: loadingPayedFee, isSuccess, write } = usePayFee(tokenId);
 */    const { isActivated, isError, isLoading  } = useNftActivationStatus(tokenId);
    const [activationStatus, setActivationStatus] = useState<NftActivationStatusResult>({ isActivated: null, isError: false, isLoading: true});

    useEffect(() => {
        setActivationStatus({ isActivated, isError, isLoading});
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
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={nft.media[0].gateway}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{nft.title}</Heading>
                    <Text color='blue.600' fontSize='2xl'>
                        0.45 ETH
                    </Text>
                    {isActivated ? (
                        <Button variant='solid' colorScheme='blue' disabled={activationStatus.isLoading}>
                            {activationStatus.isLoading ? 'Activating...' : 'Activate'}
                        </Button>
                        ) : null}
                </Stack>
            </CardBody>
        </Card>
    )
}

export default CardComponent;