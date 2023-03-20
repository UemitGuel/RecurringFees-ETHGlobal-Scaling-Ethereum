import { Card, CardBody, Image, Stack, Heading, Text, Button, Alert, AlertIcon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import usePayFee, { NftFeeStatusResult } from '../hooks/payFee';

const InActiveCard = ({ title, url, tokenId }: { title: string, url: string, tokenId: number }) => {

    const [activationStatus, setActivationStatus] = useState<NftFeeStatusResult>({ isLoading: false, isSuccess: null, write: undefined });

    const { isLoading, isSuccess, write } = usePayFee(tokenId);

    useEffect(() => {
        if (isLoading || isSuccess !== null) {
            setActivationStatus({ isLoading, isSuccess, write });
        }
    }, [isLoading, isSuccess]);

    const handleActivateClick = () => {
        setActivationStatus({ isLoading: true, isSuccess: null, write: write });
        write?.(); // call the write function only when it's defined
    };

    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={url}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Text color='blue.600' fontSize='2xl'>
                        0.45 ETH
                    </Text>
                    {!isSuccess ? (
                        <Button variant='solid' colorScheme='blue' onClick={handleActivateClick} disabled={activationStatus.isLoading}>
                            {activationStatus.isLoading ? 'Activating...' : 'Activate'}
                        </Button>
                    ) : (
                        <Alert status='success'>
                            <AlertIcon />
                            Data uploaded to the server. Fire on!
                        </Alert>
                    )}

                </Stack>
            </CardBody>
        </Card>
    )
}

export default InActiveCard;