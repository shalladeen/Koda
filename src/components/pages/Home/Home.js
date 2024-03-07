import React, { useState } from "react";
import { Box, Flex, useColorModeValue, IconButton } from "@chakra-ui/react";
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
      <Flex direction="row" bg={bgColor} height="100vh">

        <Navbar />

        {/* Main content */}
        <Flex direction="column" alignItems="center" p={5} w="full">
          <Flex width="80%" alignItems="center" mt={10}>
              <WelcomeGreeting isLoggedIn={isLoggedIn} />
              <IconButton
                  aria-label="Profile"
                  icon={<FaUserCircle />}
                  isRound={true}
                  size="lg"
                  ml="auto"
                  bg={buttonBg}
                  color={textColor}
                  onClick={handleProfileClick}
                  _hover={{ bg: useColorModeValue('blue.600', 'blue.300') }}
              />
          </Flex>

          {/* Todo list and calendar together */}
          <Flex justifyContent="space-between" w="80%" mt={4}>
              <Task />
              <MyCalendarWidget />
          </Flex>
        </Flex>
      </Flex>
    );
}

export default Home;
