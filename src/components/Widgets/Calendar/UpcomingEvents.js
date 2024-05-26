import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Box, Text, useColorModeValue, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Stack } from '@chakra-ui/react';
import moment from 'moment';

const UpcomingEventsWidget = ({ events }) => {
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const filteredEvents = events.filter(event => moment(event.start).isAfter(moment(), 'day'));
    setUpcomingEvents(filteredEvents);
  }, [events]);

  return (
    <>
      <Box w="40%"borderRadius="lg" textAlign="left" bg={useColorModeValue("#f9fdff", "#1c1c1c")}>
        <HStack>
          <Text fontSize="sm" color={textColor}>
            {upcomingEvents.length > 0 ? `You have ${upcomingEvents.length} ${upcomingEvents.length === 1 ? 'event' : 'events'} coming up.` : 'There are no upcoming events.'}
          </Text>
          {upcomingEvents.length > 0 && (
            <Button size="sm" ml={4} onClick={onOpen}>
              View Events
            </Button>
          )}
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upcoming Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              {upcomingEvents.map(event => (
                <Text key={event.id} as={event.completed ? 's' : 'span'} color={textColor}>
                  {moment(event.start).format('MMMM Do')}: {event.title}
                </Text>
              ))}
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
