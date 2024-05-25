import React, { useState } from 'react';
import { Box, Flex, useColorModeValue, FormControl, FormLabel, Input, Button, Avatar, IconButton, VStack, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import Navbar from '../../nav/Navbar';
import MiniTimer from '../TimeTracker/Timer/MiniTimer';

const ProfilePage = () => {
  const bgColor = useColorModeValue('#f9fdff', '#1c1c1c');
  const sidebarBgColor = useColorModeValue('gray.200', 'gray.700');
  const mainContentBgColor = useColorModeValue('#f9fdff', '#1c1c1c');
  const textColor = useColorModeValue('black', 'white');
  
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdateProfile = () => {
    // put some logic here later to update profile
    console.log('Profile updated:', { username, profilePicture });
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
            <Heading as="h2" size="xl">Profile</Heading>
            <Avatar size="2xl" src={profilePicture} />
            <FormControl id="profile-picture">
              <FormLabel>Profile Picture</FormLabel>
              <Input type="file" onChange={handleProfilePictureChange} />
            </FormControl>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input value={username} onChange={handleUsernameChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleUpdateProfile}>Update Profile</Button>
            <Box w="full" p={4} bg={sidebarBgColor} borderRadius="md">
              <Heading as="h3" size="lg">Achievements</Heading>
              <Text mt={2}>Achievements will be displayed here.</Text>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
