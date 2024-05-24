import React from 'react';
import { Box, Button, Heading, List, ListItem, Text } from '@chakra-ui/react';
import moment from 'moment';

const formatEventTime = (event) => {
  const { allDay, start, end } = event;
  if (allDay) {
    const startDate = moment(start).format('dddd, MMMM D');
    const endDate = end ? moment(end).subtract(1, 'day').format('dddd, MMMM D') : startDate;
    return startDate === endDate ? startDate : `${startDate} - ${endDate}`;
  } else {
    const startTime = moment(start).format('h:mm A');
    const endTime = moment(end).format('h:mm A');
    const startDate = moment(start).format('dddd, MMMM D');
    return `${startDate}, ${startTime} - ${endTime}`;
  }
};

const CalendarEventList = ({ title, events, onAdd, onEdit }) => (
  <Box className="event-list" mt={8}>
    <Heading as="h3" size="md" mb={4}>{title}</Heading>
    <List spacing={3}>
      {events.length > 0 ? (
        events.map((event) => (
          <ListItem
            key={event.id}
            className="event-list-item"
            onClick={() => onEdit(event)}
          >
            <Text className="event-title">{event.title}</Text>
            <Text className="event-time">{formatEventTime(event)}</Text>
          </ListItem>
        ))
      ) : (
        <Text>No events</Text>
      )}
    </List>
    <Button className="add-event-button" mt={4} onClick={onAdd}>Add Event</Button>
  </Box>
);

export default CalendarEventList;
