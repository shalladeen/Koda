import { useState } from 'react';
import ReactCalendar from 'react-calendar';

function MyCalendarWidget() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <h1 className="header">React Calendar</h1>
      <div className="calendar-container">
        <ReactCalendar onChange={setDate} value={date} />
      </div>
      <div className="text-center">
        Selected date: {date.toDateString()}
      </div>
    </div>
  );
}

export default MyCalendarWidget;
