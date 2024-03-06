import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Flex, Box, IconButton, Image, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGroup,
  faRightToBracket,
  faGear,
  faStopwatch,
  faGripVertical,
  faNotesMedical,
} from '@fortawesome/free-solid-svg-icons';
import koda2 from './images/koda2.svg'; 
import './NavbarStyle.css'; 

function Navbar() {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('#f9fdff', 'gray.800');

  const NavLink = ({ to, icon }) => {
    const isActive = location.pathname === to;
    const variant = isActive ? 'solid' : 'ghost';
    const colorScheme = isActive ? 'blue' : 'gray';

    return (
      <IconButton
        as={RouterLink}
        to={to}
        aria-label={icon.iconName}
        icon={<FontAwesomeIcon icon={icon} />}
        variant={variant}
        colorScheme={colorScheme}
        size="lg"
        isRound={true}
        my={2} 
      />
    );
  };

  return (
    <Flex
      className="navbar"
      direction="column"
      align="center"
      justify="flex-start"
      bg={bg}
      height="100vh"
      p={{ base: 4, md: 6 }} 
      width={{ base: "75px", md: "150px" }} 
    >
      <Box className="logo-image" my={4}> 
        <RouterLink to="/">
          <Image src={koda2} alt="logo" boxSize={{ base: "75px", md: "100px" }} /> 
        </RouterLink>
      </Box>
      <Flex direction="column" as="nav" align="center" justify="center" gap={4}>
        <NavLink to="/" icon={faGripVertical} />
        <NavLink to="/Notes" icon={faNotesMedical} />
        <NavLink to="/TimeTracker" icon={faStopwatch} />
        <NavLink to="/Friends" icon={faUserGroup} />
        <NavLink to="/Settings" icon={faGear} />
        <NavLink to="/signup" icon={faRightToBracket} />
      </Flex>


      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        position="absolute"
        bottom="4"
        right="4"
        isRound={true}
      />
    </Flex>
  );
}

export default Navbar;
