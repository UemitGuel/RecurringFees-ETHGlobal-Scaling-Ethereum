import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react'

const ActiveCard = ({ }) => {
    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Living room Sofa</Heading>
                    <Text>
                        Activate until 20.06.2023 for
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        0.45 ETH
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Text>Active until 20.05.2023</Text>
            </CardFooter>
        </Card>
    )
}

export default ActiveCard;