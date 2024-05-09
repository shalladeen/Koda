import React, { useState } from 'react';
import Timer from './Timer/Timer';
import { useNavigate } from "react-router-dom";
import Navbar from '../../nav/Navbar';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Link, Flex, IconButton, useColorMode, VStack, HStack, useColorModeValue } from '@chakra-ui/react';


function TimeTracker() {

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
        
        <div className="time-tracker-page">
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
            <Timer />
        </div>
    );
}

export default TimeTracker;
