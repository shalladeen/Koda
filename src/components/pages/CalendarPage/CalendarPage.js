import React, { useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import MyCalendarWidget from '../../Widgets/Calendar/CalendarWidget';
import Layout from '../../Layout/Layout';
import { loadEvents, addOrUpdateEvent, deleteEvent, saveEvents } from '../../Widgets/Calendar/CalendarEvents';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const handleAddOrUpdateEvent = (newEvent) => {
    const updatedEvents = addOrUpdateEvent(events, newEvent);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = deleteEvent(events, eventId);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  return (
    <Layout>
      <Box
        bg={useColorModeValue("#f9fdff", "#1c1c1c")}
        p={4}
        borderRadius="lg"
        textAlign="left"
        w="full"
        h="full"
      >
        <MyCalendarWidget
          events={events}
          onAddOrUpdateEvent={handleAddOrUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </Box>
    </Layout>
  );
};

export default CalendarPage;
