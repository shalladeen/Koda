// src/components/Calendar/Calendar.js
import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, useDisclosure, useColorMode } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import { calendarPlugins, calendarToolbar, calendarInitialView } from './CalendarSettings';
import { loadEvents, addOrUpdateEvent, deleteEvent } from './CalendarEvents';
import CalendarEventList from './CalendarEventList';
import CalendarEventModal from './CalendarEventModal';
import moment from 'moment';
import '../Calendar/CalendarStyle.css';

const CalendarWidget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  // Load events from localStorage
  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  // Date Select
  const handleDateSelect = (selectInfo) => {
    const { start, end, allDay } = selectInfo;
    setStartDate(moment(start).format('YYYY-MM-DD'));
    setEndDate(moment(end).subtract(1, 'day').format('YYYY-MM-DD'));
    setAllDay(allDay);
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
    const event = clickInfo.event;
    setCurrentEvent({
      id: event.id,
      ...event.extendedProps,
    });
    setEventTitle(event.title);
    setStartDate(moment(event.start).format('YYYY-MM-DD'));
    setEndDate(event.end ? moment(event.end).format('YYYY-MM-DD') : moment(event.start).format('YYYY-MM-DD'));
    setAllDay(event.allDay);

    if (!event.allDay) {
      setStartTime(moment(event.start).format('HH:mm'));
      setEndTime(moment(event.end).format('HH:mm'));
    } else {
      setStartTime('09:00');
      setEndTime('17:00');
    }
    onOpen();
  };

  // Event Drop or Resize
  const handleEventChange = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.allDay
        ? moment(event.start).format('YYYY-MM-DD')
        : moment(event.start).toISOString(),
      end: event.allDay
        ? moment(event.end).subtract(1, 'day').format('YYYY-MM-DD')
        : event.end ? moment(event.end).toISOString() : null,
      allDay: event.allDay,
    };
    const updatedEvents = addOrUpdateEvent(events, updatedEvent);
    setEvents(updatedEvents);
  };

  // Save Event
  const saveEvent = () => {
    const start = allDay
      ? moment(startDate).format('YYYY-MM-DD')
      : moment(startDate)
          .set({
            hours: moment(startTime, 'HH:mm').hours(),
            minutes: moment(startTime, 'HH:mm').minutes(),
          })
          .toISOString();

    const end = allDay
      ? moment(endDate).add(1, 'day').format('YYYY-MM-DD')
      : moment(endDate)
          .set({
            hours: moment(endTime, 'HH:mm').hours(),
            minutes: moment(endTime, 'HH:mm').minutes(),
          })
          .toISOString();

    const newEvent = {
      id: currentEvent ? currentEvent.id : Date.now().toString(),
      title: eventTitle,
      start,
      end,
      allDay,
    };

    const updatedEvents = addOrUpdateEvent(events, newEvent);
    setEvents(updatedEvents);
    onClose();
  };

  // Delete Event
  const handleDeleteEvent = () => {
    if (!currentEvent) return;
    const updatedEvents = deleteEvent(events, currentEvent.id);
    setEvents(updatedEvents);
    onClose();
  };

  // Today's Events
  const todaysEvents = events.filter((event) =>
    moment().isSame(event.start, 'day')
  );

  // Add Today's Event
  const handleAddTodayEvent = () => {
    const today = new Date();
    setStartDate(moment(today).format('YYYY-MM-DD'));
    setEndDate(moment(today).format('YYYY-MM-DD'));
    setAllDay(true);
    setEventTitle('');
    setCurrentEvent(null);

    setStartTime('09:00');
    setEndTime('17:00');

    onOpen();
  };

  // Upcoming Events
  const nextDay = moment().add(1, 'days');
  const upcomingEvents = events.filter((event) =>
    moment(event.start).isSame(nextDay, 'day')
  );

  // Add Upcoming Event
  const handleAddUpcomingEvent = () => {
    const tomorrow = moment().add(1, 'day').startOf('day');
    setStartDate(tomorrow.format('YYYY-MM-DD'));
    setEndDate(tomorrow.format('YYYY-MM-DD'));
    setAllDay(true);
    setEventTitle('');
    setCurrentEvent(null);
    onOpen();
  };

  return (
    <ChakraProvider>
      <Box className={colorMode} p={5} maxWidth="800px" mx="auto">
        <Box
          borderRadius="15px"
          overflow="hidden"
          border="2px solid"
          borderColor="gray.300"
          boxShadow="lg"
        >
          <FullCalendar
            plugins={calendarPlugins}
            initialView={calendarInitialView}
            headerToolbar={calendarToolbar}
            selectable
            editable
            selectMirror
            dayMaxEvents
            weekends
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={handleEventChange}
            eventResize={handleEventChange}
          />
        </Box>

        <CalendarEventList
          title="Today's Events"
          events={todaysEvents}
          onAdd={handleAddTodayEvent}
          onEdit={(event) => setCurrentEvent(event)}
        />

        <CalendarEventList
          title="Upcoming Events"
          events={upcomingEvents}
          onAdd={handleAddUpcomingEvent}
          onEdit={(event) => setCurrentEvent(event)}
        />

        <CalendarEventModal
          isOpen={isOpen}
          onClose={onClose}
          title={currentEvent ? 'Edit Event' : 'Add New Event'}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          allDay={allDay}
          setAllDay={setAllDay}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onSave={saveEvent}
          onDelete={handleDeleteEvent}
          isEditing={!!currentEvent}
        />
      </Box>
    </ChakraProvider>
  );
};

export default CalendarWidget;
