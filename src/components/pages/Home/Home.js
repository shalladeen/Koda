import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Task from "../../Widgets/Tasks/Task";
import MyCalendarWidget from "../../Widgets/Calendar/CalendarWidget";
import WelcomeGreeting from "../../Widgets/Greeting/Greeting";

function Home() {
    const bgColor = useColorModeValue('#f9fdff', 'gray.800');
    const widgetBgColor = useColorModeValue('#eef4f7', 'gray.700');

    return (
        <Flex className="main-page" direction="column" alignItems="center" bg={bgColor} height="100vh">
            {/* Placeholder for navbar */}
            <Box className="navbar-placeholder" h="100px" pos="fixed" top="0" left="0" right="0" zIndex="-1" />

            <Box className="home-greeting" w="80%" m="50px" p="30px" bg={widgetBgColor} borderRadius="30px" boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)">
                <WelcomeGreeting />
            </Box>

            {/* Todo list and calendar together */}
            <Flex className="main-widgets" justifyContent="space-between" w="80%">
                <Box className="home-tasks">
                    <Task />
                </Box>
                <Box className="home-calendar" mb="100px">
                    <MyCalendarWidget />
                </Box>
            </Flex>
        </Flex>
    );
}

export default Home;
