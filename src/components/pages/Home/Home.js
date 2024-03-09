import React, { useState } from "react";
import { Box, Flex, Stack, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Recent from "../../Widgets/Recents/Recent";
import Task from "../../Widgets/Tasks/Task";
import MyCalendarWidget from "../../Widgets/Calendar/CalendarWidget";
import WelcomeGreeting from "../../Widgets/Greeting/Greeting";
import Navbar from "../../nav/Navbar"; 

function Home() {
    const bgColor = useColorModeValue('#f9fdff', 'gray.800');
    const buttonBg = useColorModeValue('blue.500', 'blue.200');
    const textColor = useColorModeValue('white', 'gray.800');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
      if (isLoggedIn) {
        navigate('/settings'); 
      } else {
        navigate('/signup');
      }
    };

    return (
      <Flex direction={["column", "row"]} bg={bgColor} height="100vh">
        <Navbar />

        <Flex direction="column" alignItems="center" p={[2, 5]} w="full">
          <Flex width="full" direction={["column", "row"]} alignItems="center" mt={[2, 10]} px={[4, 0]}>
              <WelcomeGreeting isLoggedIn={isLoggedIn} />
              <IconButton
                  aria-label="Profile"
                  icon={<FaUserCircle />}
                  isRound={true}
                  size="lg"
                  ml={[0, "auto"]} mt={[2, 0]}
                  bg={buttonBg}
                  color={textColor}
                  onClick={handleProfileClick}
                  _hover={{ bg: useColorModeValue('blue.600', 'blue.300') }}
              />
          </Flex>

          <Flex
            direction={{ base: "column", lg: "row" }} 
            justifyContent="space-between"
            alignItems="start"
            w="full"
            mt={4}
            gap={5} 
          >
            <Stack spacing={5} w={{ base: "full", md: "45%" }} flexShrink={0}>
              <Task />
              <Recent />
            </Stack>
            <Box flex={1} w={{ base: "full"}} >
              <MyCalendarWidget />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    );
}

export default Home;
