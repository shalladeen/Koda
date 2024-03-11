import React, { useState } from 'react';
import Timer from './Timer/Timer';
import Navbar from '../../nav/Navbar';


function TimeTracker() {
    return (
        <div className="time-tracker-page">
            <Navbar/>
            <Timer />
        </div>
    );
}

export default TimeTracker;
