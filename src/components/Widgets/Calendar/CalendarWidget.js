import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Calendar/CalendarStyle.css';
import AddEventPopup from './EventPopup/AddEventPopup';

const localizer = momentLocalizer(moment);

const MyCalendarWidget = () => {
  const [events, setEvents] = useState([]);

  const handleAddEvent = ({ title, start, end }) => {
    const newEvent = {
      id: events.length + 1,
      title,
      start: new Date(),
      end: new Date(),
    };
    setEvents([...events, newEvent]);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleSelectSlot = ({ start, end }) => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        views={['month', 'week', 'day', 'agenda']}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelectSlot}
      />
      {showPopup && (
        <AddEventPopup onSubmit={handleAddEvent} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default MyCalendarWidget;
