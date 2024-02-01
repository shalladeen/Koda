import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../Calendar/CalendarStyle.css';

function MyCalendarWidget({ onDateClick, events }) {
  const handleDateClick = (arg) => {
    onDateClick(arg.date);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dateClick={handleDateClick}
        aspectRatio={2.5} 
        height="auto" 
      />
    </div>
  );
}

export default MyCalendarWidget;
