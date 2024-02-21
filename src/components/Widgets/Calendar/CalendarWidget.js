import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Calendar/CalendarStyle.css';

const localizer = momentLocalizer(moment);

const MyCalendarWidget = (props) => {
  const [myEventsList, setMyEventsList] = useState([
    // Example event data
    {
      title: 'Event 1',
      start: new Date(2024, 1, 15, 10, 0), // year, month (0-indexed), day, hour, minute
      end: new Date(2024, 1, 15, 12, 0),
    },
    {
      title: 'Event 2',
      start: new Date(2024, 1, 20, 14, 0),
      end: new Date(2024, 1, 20, 16, 0),
    },
    // Add more events as needed
  ]);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        views={['month', 'week', 'day', 'agenda']}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default MyCalendarWidget;
