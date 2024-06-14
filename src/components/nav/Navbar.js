import React from 'react';
import {
  Box, Flex, VStack, IconButton, useColorModeValue, Switch, useColorMode, Menu, MenuButton,
  MenuList, MenuItem,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faStopwatch, faGripVertical, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Navbar({ onProfileClick }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { handleLogout } = useAuth();
  const bg = useColorModeValue('gray.100', '#0e0e0e');
  const profileColor = useColorModeValue('black', 'white');
  const iconColor = useColorModeValue('black', 'white');
  const textColor = useColorModeValue('black', 'white');
  const activeBg = useColorModeValue('gray.400', 'gray.600');
  const hoverBg = useColorModeValue('gray.500', 'gray.500');
  const sunColor = useColorModeValue('black', 'gray');
  const moonColor = useColorModeValue('gray', 'white');
  const profileBorderColor = useColorModeValue('black', 'white');

  const NavLink = ({ to, icon, label }) => {
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
      >
        <FontAwesomeIcon icon={icon} size="lg" color={iconColor} />
        <Box ml="4" color={textColor}>{label}</Box>
      </Flex>
    );
  };

  return (
    <Flex direction="column" bg={bg} p="4" height="100vh" alignItems="center">
      <Menu>
        <MenuButton 
          as={IconButton} 
          icon={<FaUserCircle size="48px" />} 
          alignSelf="center" 
          mb="6" 
          borderRadius="full" 
          mt="6" 
          color={profileColor}
          _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
          borderColor={profileBorderColor}
          boxSize="70px"
        />
        <MenuList>
          <MenuItem onClick={onProfileClick}>View Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
      <Box flex="1" mt={10} mb={10}>
        <VStack spacing={6} align="stretch">
          <NavLink to="/" icon={faGripVertical} label="Dashboard" />
          <NavLink to="/Notes" icon={faNotesMedical} label="Notes" />
          <NavLink to="/TimeTracker" icon={faStopwatch} label="Focus" />
          <NavLink to="/Friends" icon={faUserGroup} label="Friends" />
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
