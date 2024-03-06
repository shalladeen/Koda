import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, input, FormControl, FormLabel, ChakraProvider, VStack, Text } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

const localizer = momentLocalizer(moment);

const MyCalendarWidget = () => {
  const [events, setEvents] = useState(() => {
    // Load events from localStorage on initial load
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');

  useEffect(() => {
    // Save events to localStorage whenever they change
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleSelectSlot = (slotInfo) => {
    onOpen();
    setSelectedDate(slotInfo.start);
    setCurrentEvent(null); // Reset current event for new event creation
    setEventTitle(''); // Reset event title
  };

  const handleSelectEvent = (event) => {
    onOpen();
    setSelectedDate(event.start);
    setCurrentEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = () => {
    if (currentEvent) {
      // Edit existing event
      const updatedEvents = events.map((evt) =>
        evt === currentEvent ? { ...evt, title: eventTitle, start: selectedDate, end: selectedDate } : evt
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        title: eventTitle,
        start: selectedDate,
        end: selectedDate,
        id: Math.random(), // Simple ID generation for demo purposes
      };
      setEvents([...events, newEvent]);
    }
    onClose();
  };

  const deleteEvent = () => {
    const filteredEvents = events.filter((evt) => evt !== currentEvent);
    setEvents(filteredEvents);
    onClose();
  };

  // Function to filter today's events
  const todaysEvents = events.filter((event) => moment().isSame(event.start, 'day'));

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4}>
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: 500, width: '100%' }}
          />
          <Box borderWidth="1px" borderRadius="lg" p={4} width="100%">
            <Text fontSize="xl">Today's Events:</Text>
            {todaysEvents.map((event, index) => (
              <Text key={index}>{event.title}</Text>
            ))}
          </Box>
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{currentEvent ? 'Edit Event' : 'Add New Event'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Event Title</FormLabel>
                <Input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Enter event title" />
              </FormControl>
              <SingleDatepicker
                name="event-date"
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveEvent}>
                Save Event
              </Button>
              {currentEvent && (
                <Button colorScheme="red" mr={3} onClick={deleteEvent}>
                  Delete Event
                </Button>
              )}
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default MyCalendarWidget;
