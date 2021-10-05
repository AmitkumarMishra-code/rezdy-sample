import { Box, Button, Link, Progress, Text, Image } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react"
import { Link as homeLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {  getList } from "../apiCalls/apiCalls";

export default function Products() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    const fetchData = async () => {
        try {
            let response = await getList()
            setIsLoading(false)
            console.log(response)
            setData(response.products)
        }
        catch (error) {
            console.log(error)
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const clickHandler = (id) => {
        history.push('/products/'+id)
    }

    return (
        <Box d='flex' flexDir='column' justifyContent='center' alignItems='center' minH='100vh'>
            {
                isLoading && <Progress size="xs" isIndeterminate width='60%' />
            }
            {
                data.length > 0 && !isLoading && !errorMessage ?
                    <Box minW='40%' borderWidth="1px" borderRadius="lg" boxShadow='md' p='2rem'>
                        <Table variant="striped" borderWidth="1px" borderRadius='lg'>
                            <TableCaption>Detailed View of all Available Products</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Image</Th>
                                    <Th>Product Name</Th>
                                    <Th textAlign = 'center'>Type</Th>
                                    <Th textAlign = 'center'>Description</Th>
                                    <Th textAlign = 'center'>Price Options</Th>
                                    <Th textAlign = 'center'>Address</Th>
                                    <Th textAlign = 'center'>Book</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data.length > 0 && data.map((product, idx) =>
                                        <Tr key={idx}>
                                            <Td><Image src={product.images[0].thumbnailUrl} width = '60px' height ='60px' objectFit = 'cover' /></Td>
                                            <Td width = '200px'>{product.name}</Td>
                                            <Td textAlign = 'center'> {product.productType}</Td>
                                            <Td textAlign = 'center'>{product.description}</Td>
                                            <Td textAlign = 'left' width = '150px'>{product.priceOptions.map(price => <Text>{price.label} : {price.price}</Text>)}</Td>
                                            <Td textAlign = 'center'> {product.locationAddress.addressLine}</Td>
                                            <Td textAlign = 'center'><Button colorScheme = 'whatsapp' onClick = {() => clickHandler(product.productCode)}>Book Now</Button></Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>
                        </Table>
                        {/*
                        "id":265463092
                        "sku":"SBWATBOT"
                        "asin":NULL
                        "condition":"new"
                        "brand":"Sellbrite"
                        "manufacturer":"Sellbrite"
                        "manufacturer_model_number":"SBI012"
                        "name":"Sample Product"
                        "description":"This is a sample product used for showing you a single product."
                        "price":12.99
                        "cost":0
                        "package_length":12
                        "package_width":4
                        "package_height":4
                        "package_unit_of_length":"inches"
                        "package_weight":7
                        "package_unit_of_weight":"pounds"
                        "msrp":15
                        "category_name":"Sample Items"
                        "features":[]
                        "warranty":NULL
                        "condition_note":NULL
                        "upc":"012345-67790"
                        "ean":NULL
                        "isbn":NULL
                        "gtin":NULL
                        "gcid":NULL
                        "epid":NULL
                        "image_list":"https://images.sellbrite.com/production/237589/SBWATBOT/c3c1eddc-bcf6-5f89-a860-d1967eb5572e.jpg"
                        "custom_attributes":{}
                        "parent_sku":NULL
                        "source_provider":NULL
                        "quantity":10
                        "modified_at":"2021-09-23T05:28:16Z"
                        "notes":NULL
                        "store_product_url":NULL
                        */}
                        <Box d='flex' justifyContent='center' alignItems='center'>
                            <Link as={homeLink} to='/' style={{ textDecoration: 'none' }}><Button mt='1rem' colorScheme='whatsapp'>Home</Button></Link>
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