// src/components/context/TimerContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [timeInMinutes, setTimeInMinutes] = useState(0);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSecondsElapsed(prevSeconds => {
                    const nextSeconds = prevSeconds + 1;
                    if (nextSeconds >= timeInMinutes * 60) {
                        clearInterval(interval);
                        setIsRunning(false);
                        return timeInMinutes * 60;
                    }
                    return nextSeconds;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeInMinutes]);

    return (
        <TimerContext.Provider value={{ timeInMinutes, setTimeInMinutes, secondsElapsed, setSecondsElapsed, isRunning, setIsRunning }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);
