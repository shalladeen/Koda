import React, { useState, useEffect } from 'react';
import { Box, Flex, Stack, useColorModeValue, VStack, HStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Recent from '../../Widgets/Recents/Recent';
import Task from '../../Widgets/Tasks/Task';
import Navbar from '../../nav/Navbar';
import { useAuth } from '../../context/AuthContext';
import { loadEvents, saveEvents, addOrUpdateEvent, deleteEvent } from '../../Widgets/Calendar/CalendarEvents';
import moment from 'moment';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import MyCalendarWidget from '../../Widgets/Calendar/CalendarWidget';
import WelcomeGreeting from '../../Widgets/Greeting/Greeting';
import Notification from '../../Widgets/Notifications/Notification'; // Import Notification component

function Home() {
  const bgColor = useColorModeValue("#f9fdff", "#1c1c1c");
  const sidebarBgColor = useColorModeValue("gray.200", "gray.700");
  const mainContentBgColor = useColorModeValue("#f9fdff", "#1c1c1c");
  const textColor = useColorModeValue("black", "white");

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/ProfilePage");
    } else {
      navigate("/SignupPage");
    }
  };

  const sidebarWidth = { base: "60px", md: "150px" };

  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // State for new notifications indicator

  useEffect(() => {
    setEvents(loadEvents());

    // Mock data for notifications, replace with actual API call
    const notificationsData = [
      { message: 'New friend request from John Doe', time: '2h ago', link: '/friend-requests' },
      { message: 'Jane Doe accepted your friend request', time: '1d ago', link: '/friends' },
      { message: 'You earned a new achievement!', time: '3d ago', link: '/achievements' },
    ];
    setNotifications(notificationsData);
  }, []);

  const handleToggleComplete = (eventId) => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, completed: !event.completed } : event
    );
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  const handleAddOrUpdateEvent = (newEvent) => {
    const updatedEvents = addOrUpdateEvent(events, newEvent);
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = deleteEvent(events, eventId);
    setEvents(updatedEvents);
  };

  const markNotificationsAsRead = () => {
    setHasNewNotifications(false);
  };

  const handleNotificationClick = () => {
    markNotificationsAsRead();
  };

  const currentDate = moment().format('MMMM Do, YYYY');

  return (
    <Flex direction="row" bg={bgColor} height="100vh">
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

      {/* Main Content Container */}
      <Box flex="1" ml={sidebarWidth}>
        <Flex
          direction="column"
          alignItems="flex-start"
          p={{ base: 2, md: 5 }}
          w="full"
          h="full"
          bg={mainContentBgColor}
          color={textColor}
        >
          {/* Notification Bell */}
          <HStack position="absolute" top="4" right="4" spacing={4} zIndex="20">
            <Notification notifications={notifications} hasNewNotifications={hasNewNotifications} onNotificationClick={handleNotificationClick} />
          </HStack>

          {/* Dashboard Greeting */}
          <WelcomeGreeting isLoggedIn={isLoggedIn} compact={true} />

          {/* Main Layout */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems="start"
            w="full"
            gap={5}
            mt={3}
          >
            {/* Left Column: Task and Recent Notes */}
            <Stack spacing={5} w={{ base: "full", lg: "45%" }} flexShrink={0}>
              <Box mt={10}>
                <Task />
              </Box>
              <Box mt={7}>
                <Recent />
              </Box>
            </Stack>

            {/* Right Column: Calendar */}
            <Box flex={1} w={{ base: "full" }} h="auto" minH="500px" mt={{ base: 0, lg: -10 }}>
              <MyCalendarWidget
                events={events}
                onAddOrUpdateEvent={handleAddOrUpdateEvent}
                onDeleteEvent={handleDeleteEvent}
                onToggleComplete={handleToggleComplete}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Calendar Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calendar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyCalendarWidget
              events={events}
              onAddOrUpdateEvent={handleAddOrUpdateEvent}
              onDeleteEvent={handleDeleteEvent}
              onToggleComplete={handleToggleComplete}
              style={{ height: 'auto', minHeight: '400px' }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Home;
