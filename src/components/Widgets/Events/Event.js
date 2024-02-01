import React from 'react';
import '../Events/EventStyle.css';

function EventsWidget({ events, selectedDate }) {
  // Check if events is an array before filtering
  if (!Array.isArray(events)) {
    return <p>No events today</p>;
  }

  // Filter events for the selected date
  const eventsOnSelectedDate = events.filter((event) => {
    const eventStartDate = new Date(event.start);
    const eventEndDate = new Date(event.end);

    return (
      eventStartDate.getFullYear() === selectedDate.getFullYear() &&
      eventStartDate.getMonth() === selectedDate.getMonth() &&
      eventStartDate.getDate() === selectedDate.getDate() &&
      eventEndDate.getFullYear() === selectedDate.getFullYear() &&
      eventEndDate.getMonth() === selectedDate.getMonth() &&
      eventEndDate.getDate() === selectedDate.getDate()
    );
  });

  // Filter events for the next day
  const tomorrow = new Date(selectedDate);
  tomorrow.setDate(selectedDate.getDate() + 1);

  const eventsOnNextDay = events.filter((event) => {
    const eventStartDate = new Date(event.start);
    const eventEndDate = new Date(event.end);

    return (
      eventStartDate.getFullYear() === tomorrow.getFullYear() &&
      eventStartDate.getMonth() === tomorrow.getMonth() &&
      eventStartDate.getDate() === tomorrow.getDate() &&
      eventEndDate.getFullYear() === tomorrow.getFullYear() &&
      eventEndDate.getMonth() === tomorrow.getMonth() &&
      eventEndDate.getDate() === tomorrow.getDate()
    );
  });

  return (
    <div className="events-widget">
      <h2>Events</h2>
      {eventsOnSelectedDate.length === 0 && eventsOnNextDay.length === 0 ? (
        <p>No events today</p>
      ) : (
        <>
          {eventsOnSelectedDate.length > 0 && (
            <>
              <h3>Today's Events</h3>
              <ul>
                {eventsOnSelectedDate.map((event) => (
                  <li key={event.id}>{event.title}</li>
                ))}
              </ul>
            </>
          )}

          {eventsOnNextDay.length > 0 && (
            <>
              <h3>Tomorrow's Events</h3>
              <ul>
                {eventsOnNextDay.map((event) => (
                  <li key={event.id}>{event.title}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default EventsWidget;
