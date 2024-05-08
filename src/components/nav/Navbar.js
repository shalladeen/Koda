import React from 'react';
import { Box, Flex, VStack, IconButton, useColorModeValue, Switch, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faGear, faStopwatch, faGripVertical, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';

function Navbar({ onProfileClick }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const bg = useColorModeValue('blue.800', 'gray.800');

  const NavLink = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Flex as={RouterLink} to={to} align="center" p="2" role="group" cursor="pointer">
        <FontAwesomeIcon icon={icon} size="lg" color="white" />
        <Box ml="4" color="white">{label}</Box>
      </Flex>
    );
  };

  return (
    <Flex direction="column" bg={bg} p="2" boxShadow="xl" height="full">
      <IconButton
        icon={<FaUserCircle />}
        aria-label="User Profile"
        size="lg"
        alignSelf="center"
        mb="6"
        onClick={onProfileClick}
        borderRadius="full"
        mt="6"
      />
      <VStack spacing={4} align="stretch">
        <NavLink to="/" icon={faGripVertical} label="Home" />
        <NavLink to="/Notes" icon={faNotesMedical} label="Notes" />
        <NavLink to="/TimeTracker" icon={faStopwatch} label="Focus Time" />
        <NavLink to="/Friends" icon={faUserGroup} label="Friends" />
        <NavLink to="/Settings" icon={faGear} label="Settings" />
      </VStack>
      <Flex mt="auto" justifyContent="center" p="4">
        <FaSun color={colorMode === 'light' ? '#EDF2F7' : 'gray'} />
        <Switch
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
          colorScheme="blue"
          size="lg"
          mx="2"
        />
        <FaMoon color={colorMode === 'dark' ? 'slateblue' : 'gray'} />
      </Flex>
    </Flex>
  );
}

export default Navbar;
