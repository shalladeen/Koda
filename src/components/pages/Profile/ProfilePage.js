import React, { useState } from 'react';
import { Box, Flex, useColorModeValue, VStack, Heading, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import Navbar from '../../nav/Navbar';
import MiniTimer from '../TimeTracker/Timer/MiniTimer';
import ProfileInfo from '../Profile/ProfileInfo';
import Achievements from '../Profile/Achievements/Achivements';
import FocusStats from '../TimeTracker/FocusStats';
import { useAuth } from '../../context/AuthContext'; 

const ProfilePage = () => {
  const bgColor = useColorModeValue('#f9fdff', '#1c1c1c');
  const sidebarBgColor = useColorModeValue('gray.200', 'gray.700');
  const mainContentBgColor = useColorModeValue('#f9fdff', '#1c1c1c');
  const textColor = useColorModeValue('black', 'white');

  const { user } = useAuth(); 
  const [isLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/signup');
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const sidebarWidth = { base: '60px', md: '150px' };

  return (
    <Flex direction="row" bg={bgColor} height="100vh">
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

      <Box flex="1" ml={sidebarWidth}>
        <Flex
          direction="column"
          alignItems="center"
          p={{ base: 2, md: 5 }}
          w="full"
          h="full"
          bg={mainContentBgColor}
          color={textColor}
        >
          <Flex
            width="full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={{ base: 4, md: 0 }}
          >
            <MiniTimer />
            <IconButton
              icon={<FaCog />}
              aria-label="Settings"
              onClick={handleSettingsClick}
              colorScheme="blue"
              size="lg"
            />
          </Flex>

          <VStack spacing={6} w="full" mt={4}>
            <Heading as="h2" size="xl">{user?.username}</Heading> {/* Display the username */}
            <ProfileInfo />
            <Achievements />
            <FocusStats />
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
