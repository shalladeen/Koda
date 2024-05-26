import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeInMinutes, setTimeInMinutes] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tag, setTag] = useState('none');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          if (newElapsed >= timeInMinutes * 60) {
            clearInterval(interval);
            setIsRunning(false);
            setIsDialogOpen(true);
          }
          return newElapsed;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeInMinutes]);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <TimerContext.Provider
      value={{
        timeInMinutes,
        setTimeInMinutes,
        secondsElapsed,
        setSecondsElapsed,
        isRunning,
        setIsRunning,
        tag,
        setTag,
        isDialogOpen,
        closeDialog
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
