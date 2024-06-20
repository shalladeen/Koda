import React, { useState, useEffect } from 'react';
import { Box, Flex, useColorModeValue, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../nav/Navbar';
import Notification from '../Widgets/Notifications/Notification'; // Import Notification component

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

  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // State for new notifications indicator

  useEffect(() => {
    // Mock data for notifications, replace with actual API call
    const notificationsData = [
      { message: 'New friend request from John Doe', time: '2h ago', link: '/friend-requests' },
      { message: 'Jane Doe accepted your friend request', time: '1d ago', link: '/friends' },
      { message: 'You earned a new achievement!', time: '3d ago', link: '/achievements' },
    ];
    setNotifications(notificationsData);
  }, []);

  const markNotificationsAsRead = () => {
    setHasNewNotifications(false);
  };

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
        {/* Notification Bell */}
        <HStack position="absolute" top="4" right="4" spacing={4} zIndex="20">
          <Notification notifications={notifications} hasNewNotifications={hasNewNotifications} markNotificationsAsRead={markNotificationsAsRead} />
        </HStack>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
