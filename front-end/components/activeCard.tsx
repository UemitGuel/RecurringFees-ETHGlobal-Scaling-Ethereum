import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react'
import React from 'react';

const ActiveCard = ({ title, url }: { title: string, url: string }) => {
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
                        Valid until 20.06.2023
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default ActiveCard;