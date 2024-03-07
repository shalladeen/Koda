import React, { useState, useEffect } from 'react';
import '../Calendar/CalendarStyle.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useColorMode, Box, Text, VStack, Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Checkbox, Flex, ChakraProvider } from '@chakra-ui/react';
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

  useEffect(() => {
    const savedEvents = localStorage.getItem('fullCalendarEvents');
    setEvents(savedEvents ? JSON.parse(savedEvents) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('fullCalendarEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('fullCalendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);
  

  const handleDateSelect = (selectInfo) => {
    const { start, end, allDay } = selectInfo;

    setSelectedDate(start);
    setAllDay(allDay);

    if (!allDay) {
        setStartTime(moment(start).format("HH:mm"));
        setEndTime(moment(end).format("HH:mm"));
    } else {
        setStartTime('09:00');
        setEndTime('17:00');
    }

    setCurrentEvent(null);
    setEventTitle(''); 
    onOpen(); 
};

  const handleEventClick = (clickInfo) => {
    setCurrentEvent({
        id: clickInfo.event.id,
        ...clickInfo.event.extendedProps,
    });
    setEventTitle(clickInfo.event.title);
    setSelectedDate(clickInfo.event.start);
    setAllDay(clickInfo.event.allDay);

    if (!clickInfo.event.allDay) {
        setStartTime(moment(clickInfo.event.start).format("HH:mm"));
        setEndTime(moment(clickInfo.event.end).format("HH:mm"));
    }
    
    onOpen();
};

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

const handleEventEdit = (event) => {
  setCurrentEvent(event); 
  setEventTitle(event.title);
  setSelectedDate(event.start);
  setAllDay(event.allDay);
  if (!event.allDay) {
    setStartTime(moment(event.start).format("HH:mm"));
    setEndTime(moment(event.end).format("HH:mm"));
  }
  onOpen();
};

  const saveEvent = () => {
    const startDateTime = allDay ? 
        selectedDate : 
        moment(selectedDate).set({
            hours: moment(startTime, "HH:mm").hours(),
            minutes: moment(startTime, "HH:mm").minutes(),
        }).toDate();

    const endDateTime = allDay ? 
        moment(selectedDate).add(1, 'day').toDate() :
        moment(selectedDate).set({
            hours: moment(endTime, "HH:mm").hours(),
            minutes: moment(endTime, "HH:mm").minutes(),
        }).toDate();

    let newEvent = {
        id: currentEvent ? currentEvent.id : Date.now().toString(),
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
        allDay,
    };

    if (currentEvent) {
        setEvents(events.map(event => event.id === currentEvent.id ? newEvent : event));
    } else {
        setEvents([...events, newEvent]);
    }

    onClose();
};

  const deleteEvent = () => {
    const filteredEvents = events.filter(event => currentEvent.id !== event.id);
    setEvents(filteredEvents);
    onClose();
  };

  const todaysEvents = events.filter((event) => moment().isSame(event.start, 'day'));


  return (
    <ChakraProvider>
      <Box className={colorMode} p={5} maxWidth="1000px" mx="auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable={true}
          editable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          viewDidMount={({ view }) => {
            if (view.type === 'timeGridWeek' || view.type === 'timeGridDay') {
              document.querySelector('.fc').style.maxHeight = '550px';
              document.querySelector('.fc').style.overflow = 'auto';
            } else {
              document.querySelector('.fc').style.maxHeight = '';
              document.querySelector('.fc').style.overflow = '';
            }
          }}
          height="auto"
         
        />
          <Box borderWidth="1px" borderRadius="lg" p={5} mt={4} boxShadow="base">
          <Text fontSize="xl" fontWeight="bold">Today's Events:</Text>
          <VStack spacing={4} mt={5} maxHeight="160px" overflow="auto">
            {todaysEvents.length > 0 ? (
              todaysEvents.map((event) => (
                <Box
                  key={event.id}
                  p={2}
                  w="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => handleEventEdit(event)}
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold">{event.title}</Text>
                    <Text fontSize="sm">
                      {event.allDay
                        ? "All day"
                        : `${moment(event.start).format("HH:mm")} - ${moment(event.end).format("HH:mm")}`}
                    </Text>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>No events today.</Text>
            )}
    </VStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
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
              <Button colorScheme="gray" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default MyFullCalendar;
