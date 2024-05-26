import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../nav/Navbar';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/ProfilePage");
    } else {
      navigate("/SignupPage");
    }
  };

  const sidebarWidth = { base: "60px", md: "150px" };
  const sidebarBgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex direction="row" height="100vh" bg={useColorModeValue("#f9fdff", "#1c1c1c")}>
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

      {/* Main Content */}
      <Box flex="1" ml={sidebarWidth} p={{ base: 2, md: 5 }} color={textColor}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
