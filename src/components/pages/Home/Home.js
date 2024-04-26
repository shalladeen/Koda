import React, { useState } from "react";
import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import Recent from "../../Widgets/Recents/Recent";
import Task from "../../Widgets/Tasks/Task";
import MyCalendarWidget from "../../Widgets/Calendar/CalendarWidget";
import WelcomeGreeting from "../../Widgets/Greeting/Greeting";
import Navbar from "../../nav/Navbar"; 

function Home() {
    const bgColor = useColorModeValue('#f9fdff', 'gray.800');
    
    const mainContentBgColor = useColorModeValue('#f9fdff', 'gray.800'); 
    

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
      if (isLoggedIn) {
        navigate('/profile'); 
      } else {
        navigate('/signup');
      }
    };

    return (
      <Flex direction={["column", "row"]} bg={bgColor} height="100vh" >
        <Navbar onProfileClick={handleProfileClick}/>

        <Flex
          direction="column"
          alignItems="center"
          p={[2, 5]}
          w="full"
          ml={{ base: "0", md: "100px" }} 
          borderRadius= "full"
          bg={mainContentBgColor} 
        >
          <Flex width="full" direction={["column", "row"]} alignItems="center" mt={[2, 10]} px={[4, 0]}>
              <WelcomeGreeting isLoggedIn={isLoggedIn} />
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
