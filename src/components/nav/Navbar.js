import React, { useContext } from 'react';
import {
  Box, Flex, VStack, IconButton, useColorModeValue, Switch, useColorMode, Avatar,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { FiHome, FiClipboard, FiClock, FiUsers } from 'react-icons/fi'; 
import { useAuth } from '../context/AuthContext';

function Navbar({ onProfileClick, onProfileMenuClick }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { user } = useAuth();
  const bg = useColorModeValue('gray.100', '#0e0e0e');
  const profileColor = useColorModeValue('black', 'white');
  const iconColor = useColorModeValue('black', 'white');
  const activeBg = useColorModeValue('gray.400', 'gray.600');
  const hoverBg = useColorModeValue('gray.500', 'gray.500');
  const sunColor = useColorModeValue('black', 'gray');
  const moonColor = useColorModeValue('gray', 'white');
  const profileBorderColor = useColorModeValue('black', 'white');

  const NavLink = ({ to, icon }) => {
    const isActive = location.pathname === to;
    return (
      <Flex
        as={RouterLink}
        to={to}
        align="center"
        mb={6}
        p="2"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : 'transparent'}
        borderRadius="md"
        _hover={{ bg: hoverBg }}
        width="100%"
        justify="center"
      >
        {icon}
      </Flex>
    );
  };

  return (
    <Flex direction="column" bg={bg} p="4" height="100vh" alignItems="center">
      <IconButton 
        icon={
          user?.profilePicture ? 
          <Avatar size="full" src={`http://localhost:5000/${user.profilePicture}`} /> : 
          <FaUserCircle size="48px" />
        } 
        alignSelf="center" 
        mb="6" 
        borderRadius="full" 
        mt="6" 
        color={profileColor}
        _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
        borderColor={profileBorderColor}
        boxSize="70px"
        zIndex="2"
        onClick={onProfileMenuClick}
      />
      <Box flex="1" mt={10} mb={10}>
        <VStack spacing={6} align="stretch">
          <NavLink to="/" icon={<FiHome size="30px" color={iconColor} label="Home" />} />
          <NavLink to="/Notes" icon={<FiClipboard size="30px" color={iconColor} />} />
          <NavLink to="/TimeTracker" icon={<FiClock size="30px" color={iconColor} />} />
          <NavLink to="/Friends" icon={<FiUsers size="30px" color={iconColor} />} />
        </VStack>
      </Box>
      <Flex mt="auto" justifyContent="center" p="4" alignItems="center">
        <FaSun color={sunColor} />
        <Switch
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
          size="lg"
          mx="2"
        />
        <FaMoon color={moonColor} />
      </Flex>
    </Flex>
  );
}

export default Navbar;
