import React from "react";
import Navbar from "../../nav/Navbar";
import { Flex, Text } from "@chakra-ui/react";


function Settings() {
    return (

        <Flex height="100vh" align="center" justify="center">
             <Navbar/>
            <Text fontSize="2xl">Settings</Text>
        </Flex>
    )
}


export default Settings;