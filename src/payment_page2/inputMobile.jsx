import React from "react"


import "../Mystyle.css"
import { Input ,Stack,InputGroup,InputLeftAddon,Box,Checkbox} from '@chakra-ui/react'
export function MobileInput(){
    return <>
    <Box sx={{marginBottom:"20px",height:"50px"}}>
    <Stack spacing={4}>
  <InputGroup>
    <InputLeftAddon children='+91' sx={{height:"60px"}} />
    <Input type='tel' placeholder='phone number' sx={{height:"60px"}}     />
  </InputGroup>
</Stack>
    </Box>
    
    </>
}