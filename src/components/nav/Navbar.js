import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Flex,
  Box,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGroup,
  faGear,
  faStopwatch,
  faGripVertical,
  faNotesMedical,
} from '@fortawesome/free-solid-svg-icons';
import koda2 from './images/koda2.svg';

function Navbar() {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const bg = useColorModeValue('#f9fdff', 'gray.800');

  const NavLink = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    const iconElement = <FontAwesomeIcon icon={icon} size="lg" />;
    const textColor = isActive ? 'blue.500' : 'gray.500';

    return (
      <Button
        as={RouterLink}
        to={to}
        leftIcon={iconElement}
        justifyContent="start"
        onClick={() => setIsDrawerOpen(false)}
        variant="ghost"
        colorScheme={isActive ? 'blue' : 'gray'}
        width="full"
      >
        <Text fontSize="md">{label}</Text>
      </Button>
    );
  };

  return (
    <>
      <IconButton
        icon={<FaBars />}
        onClick={() => setIsDrawerOpen(true)}
        position="fixed"
        top="1rem"
        left="1rem"
        zIndex="overlay"
        aria-label="Open menu"
      />
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setIsDrawerOpen(false)} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <Flex direction="column" h="full" bg={bg}>
            <Box p="4" borderBottomWidth="1px">
              <RouterLink to="/" onClick={() => setIsDrawerOpen(false)}>
                <Image src={koda2} alt="logo" boxSize="50px" mx="auto" />
              </RouterLink>
            </Box>
            <DrawerBody p={0} alignItems="center">
              <VStack spacing={4} >
                <NavLink to="/" icon={faGripVertical} label="Home" />
                <NavLink to="/Notes" icon={faNotesMedical} label="Notes" />
                <NavLink to="/TimeTracker" icon={faStopwatch} label="Focus Time" />
                <NavLink to="/Friends" icon={faUserGroup} label="Friends" />
                <NavLink to="/Settings" icon={faGear} label="Settings" />
              </VStack>
            </DrawerBody>
            <Box p="4" mt="auto">
              <IconButton
                aria-label="Toggle dark mode"
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                isRound={true}
                size="lg"
                alignSelf="end"
              />
            </Box>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
