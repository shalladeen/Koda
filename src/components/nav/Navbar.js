import React from 'react';
import {
  Box,
  Flex,
  VStack,
  IconButton,
  useColorModeValue,
  Switch,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faStopwatch, faGripVertical, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import WelcomeGreeting from '../Widgets/Greeting/Greeting';

function Navbar({ onProfileClick }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useAuth();
  const bg = useColorModeValue('gray.100', '#0e0e0e');
  const profileColor = useColorModeValue('black', 'white');
  const iconColor = useColorModeValue('black', 'white');
  const textColor = useColorModeValue('black', 'white');
  const activeBg = useColorModeValue('gray.400', 'gray.600');
  const hoverBg = useColorModeValue('gray.500', 'gray.500');
  const sunColor = useColorModeValue('black', 'gray');
  const moonColor = useColorModeValue('gray', 'white');

  const NavLink = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Flex
        as={RouterLink}
        to={to}
        align="center"
        p="2"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : 'transparent'}
        borderRadius="md"
        _hover={{ bg: hoverBg }}
      >
        <FontAwesomeIcon icon={icon} size="lg" color={iconColor} />
        <Box ml="4" color={textColor}>{label}</Box>
      </Flex>
    );
  };

  return (
    <Flex direction="column" bg={bg} p="2" height="full">
      {isLoggedIn ? (
        <Menu>
          
          <MenuButton as={IconButton} icon={<FaUserCircle />} size="lg" alignSelf="center" mb="6" borderRadius="full" mt="6" color={profileColor} />
          <MenuList>
            <MenuItem onClick={onProfileClick}>View Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        
        <IconButton
          icon={<FaUserCircle />}
          aria-label="User Profile"
          size="lg"
          alignSelf="center"
          mb="6"
          backgroundColor="gray.300"
          onClick={() => navigate('/SignupPage')}
          borderRadius="full"
          mt="6"
          color={profileColor}
        />
      )}
      
      <VStack spacing={4} align="stretch">
        <NavLink to="/" icon={faGripVertical} label="Dashboard" />
        <NavLink to="/Notes" icon={faNotesMedical} label="Notes" />
        <NavLink to="/TimeTracker" icon={faStopwatch} label="Focus Time" />
        <NavLink to="/Friends" icon={faUserGroup} label="Friends" />
      </VStack>
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
