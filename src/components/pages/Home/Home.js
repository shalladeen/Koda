import React, { useState } from "react";
import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Recent from "../../Widgets/Recents/Recent";
import Task from "../../Widgets/Tasks/Task";
import MyCalendarWidget from "../../Widgets/Calendar/CalendarWidget";
import WelcomeGreeting from "../../Widgets/Greeting/Greeting";
import Navbar from "../../nav/Navbar";

function Home() {
  const bgColor = useColorModeValue("#f9fdff", "#1c1c1c");
  const sidebarBgColor = useColorModeValue("gray.200", "gray.700");
  const mainContentBgColor = useColorModeValue("#f9fdff", "#1c1c1c");
  const textColor = useColorModeValue("black", "white");

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
    <Flex direction="row" bg={bgColor} height="100vh">
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
      >
        <Navbar onProfileClick={handleProfileClick} />
      </Box>

      {/* Main Content Container */}
      <Box
        flex="1"
        ml={sidebarWidth}
      >
        <Flex
          direction="column"
          alignItems="center"
          p={{ base: 2, md: 5 }}
          w="full"
          h="full"
          bg={mainContentBgColor}
          color={textColor}
        >
          {/* Welcome Greeting */}
          <Flex
            width="full"
            direction="column"
            mt={{ base: 2, md: 10 }}
            px={{ base: 4, md: 0 }}
          >
            <WelcomeGreeting isLoggedIn={isLoggedIn} />
          </Flex>

          {/* Main Layout */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems="start"
            w="full"
            mt={4}
            gap={5}
          >
            {/* Left Column: Task and Recent */}
            <Stack spacing={5} w={{ base: "full", lg: "45%" }} flexShrink={0}>
              <Task />
              <Recent />
            </Stack>

            {/* Right Column: Calendar */}
            <Box flex={1} w={{ base: "full" }}>
              <MyCalendarWidget />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Home;
