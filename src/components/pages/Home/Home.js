import React from "react";
import Todo from "../../Widgets/Todo/Todo";
import MyCalendar from "../../Widgets/Calendar/MyCalendar";
import '../Home/HomeStyle.css';

function Home() {
    return (

        <div className="main-page">
            {/*placeholder for navabr*/}
            <div className="navbar-placeholder"></div>

            <div className="home-calendar">
             
            </div>
            <div className="home-components">
               <Todo/>
            </div>
        </div> 
    )
}


export default Home;