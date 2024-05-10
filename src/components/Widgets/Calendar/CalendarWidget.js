import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, useDisclosure, useColorMode } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import { calendarPlugins, calendarToolbar, calendarInitialView } from './CalendarSettings';
import { loadEvents, addOrUpdateEvent, deleteEvent } from './CalendarEvents';
import CalendarEventList from './CalendarEventList';
import CalendarEventModal from './CalendarEventModal';
import '../Calendar/CalendarStyle.css';
import moment from 'moment';

const CalendarWidget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const handleDateSelect = (selectInfo) => {
    setStartDate(moment(selectInfo.start).format('YYYY-MM-DD'));
    setEndDate(moment(selectInfo.end).subtract(1, 'days').format('YYYY-MM-DD'));
    setAllDay(selectInfo.allDay);
    setEventTitle('');
    setCurrentEvent(null);
    if (!selectInfo.allDay) {
      setStartTime(moment(selectInfo.start).format('HH:mm'));
      setEndTime(moment(selectInfo.end).format('HH:mm'));
    }
    onOpen();
  };

  const handleEventClick = (clickInfo) => {
    // Logging the event data for debugging
    console.log("Event clicked:", clickInfo.event);
  
    setCurrentEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay
    });
    setEventTitle(clickInfo.event.title);
    setAllDay(clickInfo.event.allDay);
    setStartDate(moment(clickInfo.event.start).format('YYYY-MM-DD'));
    setEndDate(clickInfo.event.end ? moment(clickInfo.event.end).format('YYYY-MM-DD') : moment(clickInfo.event.start).format('YYYY-MM-DD'));
    setStartTime(moment(clickInfo.event.start).format('HH:mm'));
    setEndTime(clickInfo.event.end ? moment(clickInfo.event.end).format('HH:mm') : moment(clickInfo.event.start).format('HH:mm'));
    onOpen();
  };
  

  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
    updateEvent(updatedEvent);
  };

  const handleEventResize = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
    updateEvent(updatedEvent);
  };

  const updateEvent = (updatedEvent) => {
    const updatedEvents = addOrUpdateEvent(events, updatedEvent);
    setEvents(updatedEvents);
  };

  const saveEvent = () => {
    const newEvent = {
      id: currentEvent ? currentEvent.id : Date.now().toString(),
      title: eventTitle,
      start: allDay ? startDate : moment(startDate + 'T' + startTime).toISOString(),
      end: allDay ? moment(endDate).add(1, 'day').toISOString() : moment(endDate + 'T' + endTime).toISOString(),
      allDay: allDay,
    };
    const updatedEvents = addOrUpdateEvent(events, newEvent);
    setEvents(updatedEvents);
    onClose();
  };

  const handleDeleteEvent = () => {
    if (currentEvent && currentEvent.id) {
      const updatedEvents = deleteEvent(events, currentEvent.id);
      setEvents(updatedEvents);
      onClose(); // Close the modal after deletion
    } else {
      console.error("No event selected or event ID is missing");
    }
  };
  

  const handleAddTodayEvent = () => {
    const today = moment().format('YYYY-MM-DD');
    setStartDate(today);
    setEndDate(today);
    setAllDay(true);
    setEventTitle('');
    setCurrentEvent(null);
    onOpen();
  };

  const handleAddUpcomingEvent = () => {
    const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
    setStartDate(tomorrow);
    setEndDate(tomorrow);
    setAllDay(true);
    setEventTitle('');
    setCurrentEvent(null);
    onOpen();
  };

  const todaysEvents = events.filter(event => moment().isSame(event.start, 'day'));
  const upcomingEvents = events.filter(event => moment(event.start).isAfter(moment()));

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
          eventResize={handleEventResize}
        />
        <CalendarEventList title="Today's Events" events={todaysEvents} onAdd={handleAddTodayEvent} onEdit={handleEventClick} />
        <CalendarEventList title="Upcoming Events" events={upcomingEvents} onAdd={handleAddUpcomingEvent} onEdit={handleEventClick} />
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
