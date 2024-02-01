// EventsWidget.js
import React from 'react';
import '../Events/EventStyle.css';

function EventsWidget({ events, selectedDate }) {
  const eventsOnSelectedDate = events.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="events-widget">
      <h2>Events</h2>
      {eventsOnSelectedDate.length === 0 ? (
        <p>No events today</p>
      ) : (
        <ul>
          {eventsOnSelectedDate.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsWidget;
