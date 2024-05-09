import moment from 'moment';

export const loadEvents = () => {
  const storedEvents = localStorage.getItem('fullCalendarEvents');
  return storedEvents ? JSON.parse(storedEvents).map(event => ({
    ...event,
    start: new Date(event.start),
    end: event.end ? new Date(event.end) : null,
  })) : [];
};

export const saveEvents = (events) => {
  const sanitizedEvents = events.map(({ __typename, ...event }) => ({
    ...event,
    start: event.start instanceof Date ? event.start.toISOString() : event.start,
    end: event.end instanceof Date ? event.end.toISOString() : event.end,
  }));
  localStorage.setItem('fullCalendarEvents', JSON.stringify(sanitizedEvents));
};

export const addOrUpdateEvent = (events, newEvent) => {
  const updatedEvents = events.map(event => event.id === newEvent.id ? newEvent : event);
  if (!updatedEvents.some(event => event.id === newEvent.id)) {
    updatedEvents.push(newEvent);
  }
  saveEvents(updatedEvents);
  return updatedEvents;
};

export const deleteEvent = (events, eventId) => {
  const updatedEvents = events.filter(event => event.id !== eventId);
  saveEvents(updatedEvents);
  return updatedEvents;
};
