import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Calendar/CalendarStyle.css';
const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const handleViewChange = (view) => {
    toolbar.onView(view);
  };

  return (
    <div className="rbc-toolbar">
      <button onClick={goToBack}>&lt;</button>
      <button onClick={goToToday}>Today</button>
      <button onClick={goToNext}>&gt;</button>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <div className="rbc-btn-group">
        <button onClick={() => handleViewChange('day')}>Day</button>
        <button onClick={() => handleViewChange('week')}>Week</button>
        <button onClick={() => handleViewChange('month')}>Month</button>
        <button onClick={() => handleViewChange('agenda')}>Agenda</button>
      </div>
    </div>
  );
};

function MyCalendarWidget() {
  const events = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2022, 1, 10, 10, 0),
      end: new Date(2022, 1, 10, 12, 0),
    },
    // Add more events as needed
  ];

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        views={['month', 'week', 'day', 'agenda']}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

export default MyCalendarWidget;
