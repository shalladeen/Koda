import React, { createContext, useContext, useState, useEffect } from 'react';
import { createFocusSession } from '../../services/focusService';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeInMinutes, setTimeInMinutes] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false); 
  const [tag, setTag] = useState('none');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          if (newElapsed >= timeInMinutes * 60) {
            clearInterval(interval);
            setIsRunning(false);
            if (!isBreak) {
              setIsDialogOpen(true); 
              const endTime = new Date();
              saveFocusSession(startTime, endTime, newElapsed);
            }
          }
          return newElapsed;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeInMinutes, isBreak]);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const resetTimer = () => {
    setTimeInMinutes(0);
    setSecondsElapsed(0);
    setIsRunning(false);
    setTimerStarted(false);
  };

  const saveFocusSession = async (start, end, duration) => {
    try {
      await createFocusSession(start, end, duration);
      console.log('Focus session saved successfully');
    } catch (error) {
      console.error('Error saving focus session:', error);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timeInMinutes,
        setTimeInMinutes,
        secondsElapsed,
        setSecondsElapsed,
        isRunning,
        setIsRunning,
        isBreak,
        setIsBreak,
        tag,
        setTag,
        isDialogOpen,
        setIsDialogOpen,
        closeDialog,
        resetTimer,
        timerStarted,
        setTimerStarted,
        setStartTime, // Add setStartTime to the context
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
