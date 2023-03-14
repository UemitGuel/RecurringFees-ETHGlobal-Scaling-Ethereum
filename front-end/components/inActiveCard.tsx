import { Card, CardBody, Image, Highlight, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react'
import React from 'react';

const InActiveCard = ({ title, url }) => {
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
                    <Button variant='solid' colorScheme='blue'>
                        Activate
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default InActiveCard;