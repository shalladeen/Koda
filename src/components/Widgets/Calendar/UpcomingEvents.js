import React, { useState, useEffect } from 'react';
import { useDisclosure, Box, Text, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Stack, useColorMode } from '@chakra-ui/react';
import moment from 'moment';

const UpcomingEventsWidget = ({ events }) => {
  const { colorMode } = useColorMode();
  const textClass = colorMode === 'light' ? 'text-light' : 'text-dark';
  const bgClass = colorMode === 'light' ? 'bg-light' : 'bg-dark';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [limitedEvents, setLimitedEvents] = useState([]);

  useEffect(() => {
    const filteredEvents = events.filter(event => moment(event.start).isAfter(moment(), 'day'));
    setUpcomingEvents(filteredEvents);
    setLimitedEvents(filteredEvents.slice(0, 4));
  }, [events]);

  const formatEventDate = (event) => {
    if (event.allDay) {
      return moment(event.start).format('MMMM Do');
    }
    const start = moment(event.start).format('h:mm A');
    const end = moment(event.end).format('h:mm A');
    const date = moment(event.start).format('MMMM Do');
    return `${start} - ${end} | ${date}`;
  };

  return (
    <>
      <Box className={`upcoming-events-container ${bgClass}`} textAlign="left" mt={4} borderTop="1px">
        <HStack justify="space-between" mt={5}>
          <Text fontSize="lg" className={textClass} fontWeight="bold">
            Upcoming Events
          </Text>
          {upcomingEvents.length > 0 && (
            <Button size="sm" onClick={onOpen}>
              View All
            </Button>
          )}
        </HStack>
        <Stack mt={2}>
          {limitedEvents.length > 0 ? limitedEvents.map(event => (
            <Box key={event.id} className={`event-item ${bgClass}`}>
              <Text fontWeight="bold" className={textClass}>{event.title}</Text>
              <Text className={textClass}>
                {formatEventDate(event)}
              </Text>
            </Box>
          )) : (
            <Text className={textClass}>No upcoming events.</Text>
          )}
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upcoming Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                <Box key={event.id} className={`event-item ${bgClass}`}>
                  <Text fontWeight="bold" className={textClass}>{event.title}</Text>
                  <Text className={textClass}>
                    {formatEventDate(event)}
                  </Text>
                </Box>
              )) : (
                <Text className={textClass}>No upcoming events.</Text>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpcomingEventsWidget;
