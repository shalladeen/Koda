import React, { useState, useEffect } from 'react';
import { Box, Flex, Stack, useColorModeValue, Text, VStack, HStack, IconButton, useDisclosure } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Recent from '../../Widgets/Recents/Recent';
import Task from '../../Widgets/Tasks/Task';
import Navbar from '../../nav/Navbar';
import { useAuth } from '../../context/AuthContext';
import TodaysEvents from '../../Widgets/Calendar/TodaysEvents';
import UpcomingEventsWidget from '../../Widgets/Calendar/UpcomingEvents';
import { loadEvents, saveEvents, addOrUpdateEvent, deleteEvent } from '../../Widgets/Calendar/CalendarEvents';
import moment from 'moment';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import MyCalendarWidget from '../../Widgets/Calendar/CalendarWidget';

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

  useEffect(() => {
    setEvents(loadEvents());
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
          {/* Date with Calendar Icon */}
          <HStack mb={4}>
            <Text fontSize="lg">{currentDate}</Text>
            <IconButton
              icon={<CalendarIcon />}
              aria-label="Open Calendar"
              onClick={onOpen}
              variant="ghost"
              size="md"
            />
          </HStack>

          {/* Events Section */}
          <VStack w="full" align="left">
            <TodaysEvents events={events} onToggleComplete={handleToggleComplete} />
            <UpcomingEventsWidget events={events} />
          </VStack>

          {/* Main Layout */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems="start"
            w="full"
            gap={5}
            mt={5}
          >
            {/* Left Column: Task */}
            <Stack spacing={5} w={{ base: "full", lg: "45%" }} flexShrink={0}>
              <Task />
            </Stack>

            {/* Right Column: Recent Notes */}
            <Box flex={1} w={{ base: "full" }} mt={4}>
              <Recent />
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
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Home;
