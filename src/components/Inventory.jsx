import { Box, Button, Link, Progress, Text, FormControl, FormLabel, Select, Input, Image, RadioGroup, Radio, Stack, Checkbox } from "@chakra-ui/react";
import { Link as homeLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { getProduct } from "../apiCalls/apiCalls";

export default function Inventory(props) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [radioButtonValue, setRadioButtonValue] = useState(null)

    const fetchData = async () => {
        try {
            let response = await getProduct(props.match.params.id)
            setIsLoading(false)
            console.log(response)
            setData(response.product)
        }
        catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <Box d='flex' flexDir='column' justifyContent='center' alignItems='center' minH='100vh'>
            {
                isLoading && <Progress size="xs" isIndeterminate width='60%' />
            }
            {
                data && !isLoading && !errorMessage ?
                    <Box width='100%' d='flex' alignItems='center' justifyContent='center' flexDir='column' style={{ gap: '2rem' }}>
                        <Box d='flex' justifyContent='center' alignItems='center' flexDir='column' mt='2rem'>
                            <Image src={data.images[0].mediumSizeUrl} width='300px' height='300px' borderRadius='lg' objectFit='cover' />
                            <Text
                                style={{ fontFamily: 'Mulish, sans-serif' }} fontWeight='600'
                                fontSize='36px'
                                color='#666666'
                                mt='1rem'
                            >
                                {data.name}
                            </Text>
                        </Box>
                        <Box w='80%' d='flex' justifyContent='space-between' alignItems='center'>
                            <RadioGroup style={{ fontFamily: 'Mulish, sans-serif' }} color="#666666" fontWeight='600' fontSize='18px' onChange={setRadioButtonValue} value={radioButtonValue}>
                                <Stack direction="row" spacing={8}>
                                    {
                                        data.priceOptions.map((price, idx) => <Radio value={price.label} key={idx} >{price.label} ({price.price}AUD)</Radio>)
                                    }
                                </Stack>
                            </RadioGroup>
                            {
                                data.extras.length > 0 &&

                                <Stack direction="row" spacing={8}>
                                    {
                                        data.extras.map((extra, idx) => <Checkbox key={idx} style={{ fontFamily: 'Mulish, sans-serif' }} color="#666666" fontWeight='600' fontSize='18px'>{extra.name} : {extra.price}AUD</Checkbox>)
                                    }
                                </Stack>
                            }

                        </Box>
                        <Box w='50%' borderWidth="1px" borderRadius="lg" boxShadow='md' p='2rem' bg='#fefefe' >
                            <Box  d='flex' justifyContent='center' alignItems='center' mb = '1rem'>
                                <Text
                                    style={{ fontFamily: 'Mulish, sans-serif' }} fontWeight='600'
                                    fontSize='24px'
                                    color='#666666'
                                    mt='1rem'
                                >
                                    Booking Form
                                </Text>
                            </Box>
                            {
                                data.bookingFields.map((field, idx) => <FormControl key={idx} mb='1rem'>
                                    <FormLabel
                                        fontWeight='600'
                                        fontSize='20px'
                                        color='#666666'
                                        htmlFor={"label" + idx}
                                        style={{ fontFamily: 'Mulish, sans-serif' }}
                                    >
                                        {field.label}
                                    </FormLabel>
                                    {
                                        field.listOptions ?
                                            <Select
                                                id={"label" + idx}
                                                width={['100%', '100%', '90%', '85%']}
                                                border='1px solid rgba(0, 0, 0, 0.75)'
                                                borderRadius="13px"
                                                height='50px'
                                                bgColor='#fcfcfc'
                                                placeholder={field.label}
                                            >
                                                {field.listOptions.split('\r\n').map((option, idx) => <option key={idx} value={option}>{option}</option>)}
                                            </Select>
                                            :
                                            <Input
                                                id={"label" + idx}
                                                width={['100%', '100%', '90%', '85%']}
                                                border='1px solid rgba(0, 0, 0, 0.75)'
                                                borderRadius="13px"
                                                height='50px'
                                                bgColor='#fcfcfc'
                                            />
                                    }
                                </FormControl>)
                            }
                        </Box>
                        <Box w='100%' d='flex' justifyContent='center' mb='2rem'>
                            <Button onClick={() => alert('Booked!')} colorScheme='facebook' style={{ fontFamily: 'Mulish, sans-serif' }} color="#ffffff" fontWeight='600' fontSize='18px'>Book Now</Button>
                        </Box>
                    </Box>
                    : errorMessage &&
                    <Box d='flex' flexDir='column' justifyContent='center' alignItems='center'>
                        <Text fontSize='3xl' mb='1rem'>{errorMessage}</Text>
                        <Link as={homeLink} to='/' style={{ textDecoration: 'none' }}><Button colorScheme='whatsapp'>Home</Button></Link>
                    </Box>
            }
        </Box>
    )
}