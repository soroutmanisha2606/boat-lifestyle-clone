import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { CartProduct } from './CartProduct';


export const AddToCart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [navigate,setNavigate] = useState(0)
    const [cartProduct, setCartProduct] = useState([])
    const [cartItems, setCartItems] = useState(0)

    let userId = localStorage.getItem("userId");
    const getProducts = ()=>{
        fetch(`http://localhost:3001/users/${userId}/cart`)
        .then(res=>res.json())
        .then(res=>{
            setCartProduct(res)
            setCartItems(res.length)
        })
        .catch(err=>console.log(err))
    }


    useEffect(() =>{
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartProduct])
    let isAuth = localStorage.getItem('isAuth') || false;
    const handleClick = () => {
        if(isAuth==="false"){
            setNavigate(1)
        }
        else{
            onOpen()
        }
    }

    if(navigate===1){
        return <Navigate to='/login'/>
    }

    return (

        <>
        <Text onClick={() => handleClick()}>
            ADD TO CART
        </Text>

        <Drawer onClose={onClose}  isOpen={isOpen} size="sm" border="1px solid black">
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton color="white" _hover={{ bg: "red" }} _active={{ bg: "red" }}fontSize="14px" />
            <DrawerHeader bg="red" color="white" p={2}>Your Cart ({cartItems} items)</DrawerHeader>
            <Text bg="black" p={2} color="white" fontSize="15px">Free Shipping sitewide | Cash On Delivery available for order value upto ₹3000</Text>
            <DrawerBody  bg="#ececec" p={0} scrollbar-width="thin">
                <CartProduct cartProduct={cartProduct}/>
            </DrawerBody>
            <Box height="235px"p={5}>
                <Box display="flex" justifyContent="space-between">
                    <Text fontSize="22px" fontWeight="500" mt={5}>Shipping:</Text>
                    <Text fontSize="22px" fontWeight="500" mt={5}>FREE</Text>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Text fontSize="22px" fontWeight="500" mt={5}>Total:</Text>
                    <Text fontSize="22px" fontWeight="500" mt={5}>Value</Text>
                </Box>
                <Button mt={10} width="100%" height="50px" fontSize="20px" bg="red" color="white" colorScheme="red">Place Order</Button>
            </Box>
            </DrawerContent>
        </Drawer>
        </>
    )
}
