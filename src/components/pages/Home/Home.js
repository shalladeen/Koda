import React, { useState } from "react";
import { Box, Flex, useColorModeValue, IconButton, Text } from "@chakra-ui/react";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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

        {/* Main content */}
        <Flex direction="column" alignItems="center" p={[2, 5]} w="full">
          <Flex width="full" direction={["column", "row"]} alignItems="center" mt={[2, 10]} px={[4, 0]}>
              <WelcomeGreeting isLoggedIn={isLoggedIn} />
              <IconButton
                  aria-label="Profile"
                  icon={<FaUserCircle />}
                  isRound={true}
                  size="lg"
                  ml={[0, "auto"]} mt={[2, 0]} // Adjust margin top for mobile
                  bg={buttonBg}
                  color={textColor}
                  onClick={handleProfileClick}
                  _hover={{ bg: useColorModeValue('blue.600', 'blue.300') }}
              />
          </Flex>

          {/* Todo list and calendar together */}
          <Flex direction={["column", "row"]} justifyContent="space-between" w="full" mt={[2, 4]} px={[4, 0]}>
              <Box mb={[4, 0]} w={["full", "45%"]}>
                <Task />
              </Box>
              <Box w={["full", "45%"]}>
                <MyCalendarWidget />
              </Box>
          </Flex>
        </Flex>
      </Flex>
    );
}

export default Home;
