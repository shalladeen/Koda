// src/context/TimerContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export function useTimer() {
  return useContext(TimerContext);
}

export function TimerProvider({ children }) {
  const [timeInMinutes, setTimeInMinutes] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tag, setTag] = useState('work');

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && secondsElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsElapsed]);

  const value = {
    timeInMinutes,
    setTimeInMinutes,
    secondsElapsed,
    setSecondsElapsed,
    isRunning,
    setIsRunning,
    tag,
    setTag
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}
