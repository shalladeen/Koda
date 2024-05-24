import React from 'react';
import { Box, Flex, VStack, IconButton, useColorModeValue, Switch, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faGear, faStopwatch, faGripVertical, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';

function Navbar({ onProfileClick }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const bg = useColorModeValue('#000000', '#1c1c1c');
  const profileColor = useColorModeValue('black', 'white');
  const iconColor = useColorModeValue('white', 'white');
  const textColor = useColorModeValue('white', 'white');
  const activeBg = useColorModeValue('gray.700', 'gray.600');
  const hoverBg = useColorModeValue('gray.600', 'gray.500');
  const sunColor = useColorModeValue('white', 'gray');
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
      <IconButton
        icon={<FaUserCircle />}
        aria-label="User Profile"
        size="lg"
        alignSelf="center"
        mb="6"
        onClick={onProfileClick}
        borderRadius="full"
        mt="6"
        color={profileColor}
      />
      <VStack spacing={4} align="stretch">
        <NavLink to="/" icon={faGripVertical} label="Home" />
        <NavLink to="/Notes" icon={faNotesMedical} label="Notes" />
        <NavLink to="/TimeTracker" icon={faStopwatch} label="Focus Time" />
        <NavLink to="/Friends" icon={faUserGroup} label="Friends" />
        <NavLink to="/Settings" icon={faGear} label="Settings" />
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
