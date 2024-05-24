import React, { useState } from 'react';
import Timer from './Timer/Timer';
import { useNavigate } from "react-router-dom";
import Navbar from '../../nav/Navbar';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

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
    const sidebarBgColor = useColorModeValue("gray.200", "gray.700");
    const mainContentBgColor = useColorModeValue("#f9fdff", "#1c1c1c");
    const textColor = useColorModeValue("black", "white");

    return (
        <Flex direction="row" bg={mainContentBgColor} height="100vh">
            {/* Sidebar */}
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                width={sidebarWidth}
                bg={sidebarBgColor}
                height="100vh"
                color={textColor}
                zIndex="10"
            >
                <Navbar onProfileClick={handleProfileClick} />
            </Box>

            {/* Main Content */}
            <Box flex="1" ml={sidebarWidth} p={{ base: 2, md: 5 }} color={textColor}>
                <Timer />
            </Box>
        </Flex>
    );
}

export default TimeTracker;
