import React, { useState } from "react";
import Navbar from "../../nav/Navbar";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Link, Flex, IconButton, useColorMode, VStack, HStack, useColorModeValue } from '@chakra-ui/react';


function Friends() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/signup");
        }
    };

    const sidebarWidth = { base: "60px", md: "150px" };

    return (
        <Flex h="100vh" align="center" justify="center">
            <Box
        position="fixed"
        left="0"
        top="0"
        bottom="0"
        width={sidebarWidth}
        bg={useColorModeValue("gray.200", "gray.700")}
        height="100vh"
        zIndex="10"
      >
        <Navbar onProfileClick={handleProfileClick} />
      </Box>
            <Text fontSize="2xl">Settings</Text>
        </Flex>
    )
}


export default Friends;