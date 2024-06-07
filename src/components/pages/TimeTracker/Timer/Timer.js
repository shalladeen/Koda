import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Box,
  Flex,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import TimerDialog from '../../../Dialogs/TimerDialog';

function Timer({ focusTime, breakTime, isFreeTimer, startTimerInitially, setTimerStarted }) {
  const { timeInMinutes, setTimeInMinutes, secondsElapsed, setSecondsElapsed, isRunning, setIsRunning, isDialogOpen, closeDialog, resetTimer, tag, setIsDialogOpen } = useTimer();
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);

  useEffect(() => {
    if (focusTime) {
      setTimeInMinutes(focusTime);
      setSecondsElapsed(0);
      setIsRunning(false); // Ensure timer is not running initially
      console.log('Timer initialized with focusTime:', focusTime);
    }
  }, [focusTime, setTimeInMinutes, setSecondsElapsed, setIsRunning]);

  useEffect(() => {
    if (startTimerInitially && !isRunning) {
      setIsRunning(true);
      setTimerStarted(true);
      console.log('Timer started initially');
    }
  }, [startTimerInitially, isRunning, setIsRunning, setTimerStarted]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          if (newElapsed >= timeInMinutes * 60) {
            clearInterval(interval);
            setIsRunning(false);
            setIsDialogOpen(true); // Show completion dialog
            console.log('Timer completed');
          }
          return newElapsed;
        });
      }, 1000);
    } else if (!isRunning && secondsElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsElapsed, timeInMinutes, setIsDialogOpen]);

  const startTimer = () => {
    if (!isRunning && timeInMinutes > 0) {
      setIsRunning(true);
      setTimerStarted(true);
      console.log('Timer started');
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    console.log('Timer paused');
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
    setTimeInMinutes(focusTime); // Reset the timer to the initial focus time
    setTimerStarted(false);
    console.log('Timer stopped and reset');
  };

  const progress = 100 - ((secondsElapsed / (timeInMinutes * 60)) * 100);

  const handleSliderChange = (val) => {
    if (!isRunning) {
      setTimeInMinutes(Math.max(0, val));
      setSecondsElapsed(0);
      console.log('Slider changed to:', val);
    }
  };

  const handleStopClick = () => {
    setIsStopDialogOpen(true);
    console.log('Stop button clicked');
  };

  const handleStopConfirm = () => {
    stopTimer();
    setIsStopDialogOpen(false);
    console.log('Stop confirmed');
  };

  const handleStopCancel = () => {
    setIsStopDialogOpen(false);
    console.log('Stop cancelled');
  };

  return (
    <Flex height="100%" direction="column" alignItems="start" justifyContent="center" width="100%">
      <Box p={4} bg={useColorModeValue('white', 'gray.800')} borderRadius="lg" >
        <Flex direction="column" justifyContent="center" alignItems="center">
          <CircularProgress value={progress} size="230px" thickness="12px" color={getProgressColor(100 - progress)} max={100}>
            <CircularProgressLabel fontSize="4xl">
              {`${Math.max(0, Math.floor((timeInMinutes * 60 - secondsElapsed) / 60))}m ${Math.max(0, Math.round((timeInMinutes * 60 - secondsElapsed) % 60))}s`}
            </CircularProgressLabel>
          </CircularProgress>
          {!focusTime && (
            <Slider
              aria-label="timer-slider"
              defaultValue={0}
              min={0}
              max={120}
              step={1}
              onChange={handleSliderChange}
              value={timeInMinutes}
              size="md"
              mt={4}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          )}
          <Button onClick={isRunning ? pauseTimer : startTimer} isDisabled={timeInMinutes === 0} size="lg" mt={4}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Text color="red" cursor="pointer" onClick={handleStopClick} mt={4}>
            Stop
          </Text>
        </Flex>
      </Box>
      <TimerDialog isOpen={isDialogOpen} onClose={closeDialog} type="complete" tag={tag} />
      <TimerDialog
        isOpen={isStopDialogOpen}
        onClose={handleStopCancel}
        onConfirm={handleStopConfirm}
        type="stop"
      />
    </Flex>
  );
}

function getProgressColor(inverseProgress) {
  if (inverseProgress < 33) return "green.400";
  if (inverseProgress < 66) return "yellow.400";
  return "red.400";
}

export default Timer;
