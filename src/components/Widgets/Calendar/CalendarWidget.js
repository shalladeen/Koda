import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Box,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,
  useDisclosure,Input,FormControl,FormLabel,ChakraProvider,VStack,Text,Checkbox, Flex} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

const localizer = momentLocalizer(moment);

const MyCalendarWidget = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleSelectSlot = (slotInfo) => {
    onOpen();
    setSelectedDate(slotInfo.start);
    setCurrentEvent(null);
    setEventTitle('');
    setAllDay(false);
    setStartTime('');
    setEndTime('');
  };

  const handleSelectEvent = (event) => {
    onOpen();
    setSelectedDate(new Date(event.start));
    setCurrentEvent(event);
    setEventTitle(event.title);
    setAllDay(event.allDay || false);
    setStartTime(event.start ? moment(event.start).format("HH:mm") : '');
    setEndTime(event.end ? moment(event.end).format("HH:mm") : '');
  };

  const saveEvent = () => {
    const startDateTime = allDay ? moment(selectedDate).startOf('day').toDate() : moment(selectedDate).set({
      hour: moment(startTime, "HH:mm").get('hour'),
      minute: moment(startTime, "HH:mm").get('minute'),
    }).toDate();

    const endDateTime = allDay ? moment(selectedDate).endOf('day').toDate() : moment(selectedDate).set({
      hour: moment(endTime, "HH:mm").get('hour'),
      minute: moment(endTime, "HH:mm").get('minute'),
    }).toDate();

    if (currentEvent) {
      const updatedEvents = events.map((evt) =>
        evt === currentEvent ? { ...evt, title: eventTitle, start: startDateTime, end: endDateTime, allDay } : evt
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
        allDay,
        id: Math.random(),
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
          <Box borderWidth="1px" borderRadius="lg" p={4} width="100%" maxHeight="200px" overflow="auto">
            <Text fontSize="xl" fontWeight="bold">Today's Events:</Text>
            {todaysEvents.map((event, index) => (
               <Box as="button" display="block" textAlign="left" width="100%" p={2} _hover={{ bg: "gray.100" }}
               key={index}
               onClick={() => handleSelectEvent(event)}
             >
             <Flex justify="space-between" align="center">
                <Text fontWeight="semibold" textAlign="left">
                  {event.title}
                </Text>
                <Text textAlign="right">
                  {event.allDay ? "All Day" : `${moment(event.start).format("HH:mm")} to ${moment(event.end).format("HH:mm")}`}
                </Text>
              </Flex>
              </Box>
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
              <Checkbox isChecked={allDay} onChange={(e) => setAllDay(e.target.checked)}>All Day Event</Checkbox>
              {!allDay && (
                <>
                  <FormControl>
                    <FormLabel>Start Time</FormLabel>
                    <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End Time</FormLabel>
                    <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </FormControl>
                </>
              )}
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
