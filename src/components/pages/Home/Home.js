import React, {useState} from "react";
import TaskAdd from "../../Widgets/Tasks/Add/TaskAdd";
import MyCalendarWidget from "../../Widgets/Calendar/CalendarWidget";
import WelcomeGreeting from "../../Widgets/Greeting/Greeting";
import EventsWidget from "../../Widgets/Events/Event";
import '../Home/HomeStyle.css';

function Home() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [events, setEvents] = useState([
        { id: 1, title: 'Meeting', start: new Date('2024-02-01T10:00:00') },
        { id: 2, title: 'Conference', start: new Date('2024-02-15T14:00:00') },
        // Add more events as needed
      ]);
    
      const handleDateClick = (date) => {
        // Add a new event on the clicked date
        const newEvent = {
          id: events.length + 1,
          title: 'New Event',
          start: date,
        };
    
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      };
    
      const handleDeleteEvent = (eventId) => {
        // Delete the event with the given ID
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      };

    return (

        <div className="main-page">
            {/*placeholder for navbar*/}
            <div className="navbar-placeholder"></div>

            <div className ="home-greeting">
                <WelcomeGreeting/>
            </div>

            {/*Todo list and calendar together*/}
            <div className = "main-widgets">
                <div className="home-tasks">
                    <TaskAdd/>
                </div>
                <div className = "main-calendar">
                <div className="home-calendar">
                <MyCalendarWidget onDateClick={handleDateClick} events={events}/>
                 </div>
                 <div className="home-events">
                 <EventsWidget events={events} selectedDate={selectedDate} />
                 </div>
                 </div>
            </div>
        </div> 
    )
}


export default Home;