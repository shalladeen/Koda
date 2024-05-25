import moment from 'moment';

export const loadEvents = () => {
  const storedEvents = localStorage.getItem('fullCalendarEvents');
  return storedEvents
    ? JSON.parse(storedEvents).map((event) => ({
        ...event,
        start: event.allDay
          ? moment(event.start).format('YYYY-MM-DD')
          : new Date(event.start),
        end: event.end ? new Date(event.end) : null,
        allDay: !!event.allDay,
        completed: !!event.completed,
      }))
    : [];
};

export const saveEvents = (events) => {
  const sanitizedEvents = events.map(({ __typename, ...event }) => ({
    ...event,
    start: event.allDay ? event.start : moment(event.start).toISOString(),
    end: event.end ? moment(event.end).toISOString() : null,
    completed: !!event.completed,
  }));
  localStorage.setItem('fullCalendarEvents', JSON.stringify(sanitizedEvents));
};

export const addOrUpdateEvent = (events, newEvent) => {
  const updatedEvents = events.map((event) =>
    event.id === newEvent.id ? newEvent : event
  );
  if (!updatedEvents.some((event) => event.id === newEvent.id)) {
    updatedEvents.push(newEvent);
  }
  saveEvents(updatedEvents);
  return updatedEvents;
};

export const deleteEvent = (events, eventId) => {
  const updatedEvents = events.filter((event) => event.id !== eventId);
  saveEvents(updatedEvents);
  return updatedEvents;
};
