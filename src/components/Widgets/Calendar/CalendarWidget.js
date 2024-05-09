// src/components/Calendar/Calendar.js
import React, { useState, useEffect } from 'react';
import {Box, ChakraProvider, useDisclosure, useColorMode,} from '@chakra-ui/react';
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  // Load events from localStorage
  useEffect(() => {
    setEvents(loadEvents());
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
      ...clickInfo.event.extendedProps,
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

  // Event Drop
  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
    const updatedEvents = addOrUpdateEvent(events, updatedEvent);
    setEvents(updatedEvents);
  };

  // Save Event
  const saveEvent = () => {
    let updatedEvents;
    if (currentEvent) {
      updatedEvents = events.map(event => (event.id === currentEvent.id ? {
        ...event,
        title: eventTitle,
        start: selectedDate,
        end: allDay ? null : moment(endTime, 'HH:mm').toDate(),
        allDay,
      } : event));
    } else {
      const newEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: allDay ? selectedDate : moment(selectedDate).set({
          hours: moment(startTime, 'HH:mm').hours(),
          minutes: moment(startTime, 'HH:mm').minutes(),
        }).toDate(),
        end: allDay ? moment(selectedDate).add(1, 'day').toDate() : moment(selectedDate).set({
          hours: moment(endTime, 'HH:mm').hours(),
          minutes: moment(endTime, 'HH:mm').minutes(),
        }).toDate(),
        allDay,
      };
      updatedEvents = [...events, newEvent];
    }

    setEvents(updatedEvents);
    addOrUpdateEvent(updatedEvents, { id: currentEvent ? currentEvent.id : Date.now().toString(), title: eventTitle });
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
          eventDrop={handleEventDrop}
        />

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
