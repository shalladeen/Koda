import React, { useState, useEffect } from 'react';
import '../Calendar/CalendarStyle.css';
import { IconButton, useDisclosure, useColorMode, Box, Text, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Checkbox, Flex, ChakraProvider } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import '@fullcalendar/react';

const MyFullCalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const { colorMode } = useColorMode();

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem('fullCalendarEvents');
    const parsedEvents = storedEvents ? JSON.parse(storedEvents).map(event => ({
      ...event,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : null
    })) : [];
    setEvents(parsedEvents);
  }, []);

  // Date Select
  const handleDateSelect = (selectInfo) => {
    const { start, end, allDay } = selectInfo;
    setSelectedDate(selectInfo.startStr); 
    setAllDay(selectInfo.allDay);
    setEventTitle(''); 
    setCurrentEvent(null);

    if (!allDay) {
      setStartTime(moment(start).format('HH:mm'));
      setEndTime(moment(end).format('HH:mm'));
    } else {
      setStartTime('09:00');
      setEndTime('17:00');
    }
    onOpen();
  };

  // Event Click
  const handleEventClick = (clickInfo) => {
    setCurrentEvent({
      id: clickInfo.event.id,
      ...clickInfo.event.extendedProps
    });
    setEventTitle(clickInfo.event.title);
    setSelectedDate(clickInfo.event.start);
    setAllDay(clickInfo.event.allDay);

    if (!clickInfo.event.allDay) {
      setStartTime(moment(clickInfo.event.start).format('HH:mm'));
      setEndTime(moment(clickInfo.event.end).format('HH:mm'));
    }
    onOpen();
  };

  // Event Drag and Drop
  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvents = events.map((evt) => {
      if (evt.id === event.id) {
        return { ...evt, start: event.start, end: event.end };
      }
      return evt;
    });

    setEvents(updatedEvents);
    localStorage.setItem('fullCalendarEvents', JSON.stringify(updatedEvents));
  };

  // Event Edit
  const handleEventEdit = (event) => {
    setCurrentEvent(event); 
    setEventTitle(event.title);
    setSelectedDate(event.start);
    setAllDay(event.allDay);
    if (!event.allDay) {
      setStartTime(moment(event.start).format('HH:mm'));
      setEndTime(moment(event.end).format('HH:mm'));
    }
    onOpen();
  };

  // Save Event
  const saveEvent = () => {
    let updatedEvents;
    if (currentEvent) {
      updatedEvents = events.map(event =>
        event.id === currentEvent.id ? {
          ...event,
          title: eventTitle,
          start: selectedDate,
          end: endTime,
          allDay: allDay
        } : event
      );
    } else {
      const newEvent = {
        id: Date.now().toString(), 
        title: eventTitle,
        start: allDay ? selectedDate : moment(selectedDate).set({
          hours: moment(startTime, 'HH:mm').hours(),
          minutes: moment(startTime, 'HH:mm').minutes()
        }).toDate(),
        end: allDay ? moment(selectedDate).add(1, 'day').toDate() : moment(selectedDate).set({
          hours: moment(endTime, 'HH:mm').hours(),
          minutes: moment(endTime, 'HH:mm').minutes()
        }).toDate(),
        allDay
      };
      updatedEvents = [...events, newEvent];
    }

    setEvents(updatedEvents);

    const eventsForStorage = updatedEvents.map(event => ({
      ...event,
      start: event.start instanceof Date ? event.start.toISOString() : event.start,
      end: event.end instanceof Date ? event.end.toISOString() : event.end
    }));
    localStorage.setItem('fullCalendarEvents', JSON.stringify(eventsForStorage));
    onClose(); 
  };

  // Delete Event
  const deleteEvent = () => {
    if (!currentEvent) return;
    const updatedEvents = events.filter(event => event.id !== currentEvent.id);

    setEvents(updatedEvents);

    const eventsForStorage = updatedEvents.map(event => ({
      ...event,
      start: event.start instanceof Date ? event.start.toISOString() : event.start,
      end: event.end instanceof Date ? event.end.toISOString() : event.end
    }));
    localStorage.setItem('fullCalendarEvents', JSON.stringify(eventsForStorage));
    onClose();
  };

  // Today's Events
  const todaysEvents = events.filter((event) => moment().isSame(event.start, 'day'));

  // Add Today's Event
  const handleAddTodayEvent = () => {
    const today = new Date();
    setSelectedDate(today);
    setAllDay(true); 
    setEventTitle(''); 
    setCurrentEvent(null);

    if (!allDay) {
      setStartTime(moment(today).format('HH:mm'));
      setEndTime(moment(today).add(1, 'hours').format('HH:mm')); 
    }

    onOpen();
  };

  // Upcoming Events
  const nextDay = moment().add(1, 'days');
  const upcomingEvents = events.filter(event =>
    moment(event.start).isSame(nextDay, 'day')
  );

  // Add Upcoming Event
  const handleAddUpcomingEvent = () => {
    const tomorrow = moment().add(1, 'day').startOf('day');
    setSelectedDate(tomorrow.toDate());
    setAllDay(true); 
    setEventTitle(''); 
    setCurrentEvent(null);
    onOpen();
  };

  return (
    <ChakraProvider>
      <Box className={colorMode} p={5} maxWidth="800px" mx="auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable
          editable
          selectMirror
          dayMaxEvents
          weekends
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventContent={(eventInfo) => (
            <Box
              p={2}
              borderRadius="md"
              boxShadow="md"
              backgroundColor={colorMode === 'dark' ? 'blue.800' : 'blue.200'}
              border="none"  
              _hover={{ cursor: 'pointer', color: 'white'}}
            >
              <Text>{eventInfo.event.title}</Text>
            </Box>
          )}
          viewDidMount={({ view }) => {
            if (view.type === 'timeGridWeek' || view.type === 'timeGridDay') {
              document.querySelector('.fc').style.maxHeight = '550px';
              document.querySelector('.fc').style.overflow = 'auto';
            } else {
              document.querySelector('.fc').style.maxHeight = '';
              document.querySelector('.fc').style.overflow = '';
            }
          }}
          eventDisplay='block'
          eventBorderColor='transparent'
          height='auto'
          aspectRatio={1.35}
          contentHeight='auto'
          dayCellClassNames='fc-daygrid-day'
          dayHeaderClassNames='fc-day-header'
        />

        {/* Today's Events Banner */}
        <Box borderWidth="1px" borderRadius="lg" p={5} mt={4} boxShadow="base">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">Today's Events:</Text>
            <IconButton
              aria-label="Add event"
              icon={<AddIcon />}
              size="sm"
              onClick={() => handleAddTodayEvent()}
            />
          </Flex>
          <VStack spacing={4} mt={5} maxHeight="160px" overflow="auto">
            {todaysEvents.length > 0 ? (
              todaysEvents.map((event) => (
                <Box
                  key={event.id}
                  p={2}
                  w="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => handleEventEdit(event)}
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold">{event.title}</Text>
                    <Text fontSize="sm">
                      {event.allDay
                        ? 'All day'
                        : `${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}`}
                    </Text>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>No events today.</Text>
            )}
          </VStack>
        </Box>

        {/* Upcoming Events Banner */}
        <Box borderWidth="1px" borderRadius="lg" p={5} mt={4} boxShadow="base">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">Upcoming Events:</Text>
            <IconButton
              aria-label="Add event for next day"
              icon={<AddIcon />}
              size="sm"
              onClick={() => handleAddUpcomingEvent()}
            />
          </Flex>
          <VStack spacing={4} mt={5} maxHeight="160px" overflow="auto">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Box
                  key={event.id}
                  p={2}
                  w="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => handleEventEdit(event)}
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold">{event.title}</Text>
                    <Text fontSize="sm">
                      {event.allDay
                        ? 'All day'
                        : `${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}`}
                    </Text>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>No events tomorrow.</Text>
            )}
          </VStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent borderRadius="lg" boxShadow="xl">
            <ModalHeader>{currentEvent ? 'Edit Event' : 'Add New Event'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Enter event title" />
              </FormControl>
              <Checkbox isChecked={allDay} onChange={(e) => setAllDay(e.target.checked)} mt={4}>All Day Event</Checkbox>
              {!allDay && (
                <Flex mt={4}>
                  <FormControl isRequired flex="1" mr={2}>
                    <FormLabel>Start Time</FormLabel>
                    <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  </FormControl>
                  <FormControl isRequired flex="1">
                    <FormLabel>End Time</FormLabel>
                    <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </FormControl>
                </Flex>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveEvent}>Save</Button>
              {currentEvent && <Button colorScheme="red" onClick={deleteEvent}>Delete</Button>}
              <Button color="white" bg="gray" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default MyFullCalendar;
