import React, {useState} from "react";
import TaskAdd from "../../Widgets/Tasks/Add/TaskAdd";
import MyCalendarWidget from "../../Widgets/Calendar/CalendarWidget";
import WelcomeGreeting from "../../Widgets/Greeting/Greeting";
import '../Home/HomeStyle.css';

function Home() {

  // placeholder for now
  const myEventsList = [
    {
        id: 1,
        title: 'Event 1',
        start: new Date(2024, 1, 10, 10, 0),
        end: new Date(2022, 1, 10, 12, 0),
    },
   
];

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
                <MyCalendarWidget events={myEventsList} />
                 </div>
                 </div>
            </div>
        </div> 
    )
}


export default Home;