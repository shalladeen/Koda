import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeInMinutes, setTimeInMinutes] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false); // New state for break time
  const [tag, setTag] = useState('none');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

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
              console.log('This line is opening the dialog in TimerContext');
              setIsDialogOpen(true); // Ensure this is the desired logic
              console.log('Timer finished. Setting dialog open.');
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
    console.log('Dialog closed.');
    setIsDialogOpen(false);
  };

  const resetTimer = () => {
    setTimeInMinutes(0);
    setSecondsElapsed(0);
    setIsRunning(false);
    setTimerStarted(false);
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
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
