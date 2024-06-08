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
  const [isBreak, setIsBreak] = useState(false);
  const [breakSecondsElapsed, setBreakSecondsElapsed] = useState(0);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);

  // Ensure hooks are called unconditionally
  const boxBg = useColorModeValue('white', 'gray.800');
  const breakBoxBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    if (focusTime && !isRunning) {
      setTimeInMinutes(focusTime);
      setSecondsElapsed(0);
      setBreakSecondsElapsed(0);
      setIsBreak(false);
      console.log('Timer initialized with focusTime:', focusTime);
    }
  }, [focusTime, setTimeInMinutes, setSecondsElapsed, setBreakSecondsElapsed, setIsRunning]);

  useEffect(() => {
    if (startTimerInitially && !isRunning) {
      startTimer();
    }
  }, [startTimerInitially, isRunning]);

  useEffect(() => {
    let interval;
    if (isRunning && !isBreak) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          if (newElapsed >= timeInMinutes * 60) {
            clearInterval(interval);
            setIsRunning(false);
            setIsBreak(true);
            setBreakSecondsElapsed(0);
            console.log('Focus time completed, break started');
          }
          return newElapsed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeInMinutes, isBreak]);

  useEffect(() => {
    let interval;
    if (isRunning && isBreak) {
      interval = setInterval(() => {
        setBreakSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          if (newElapsed >= breakTime * 60) {
            clearInterval(interval);
            setIsRunning(false);
            setIsBreak(false);
            setSecondsElapsed(0);
            setTimeInMinutes(focusTime);
            setTimerStarted(false);
            console.log('Break completed, focus time resumed');
          }
          return newElapsed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, breakTime, isBreak, focusTime, setTimerStarted]);

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
    setBreakSecondsElapsed(0);
    setTimeInMinutes(focusTime); // Reset the timer to the initial focus time
    setTimerStarted(false);
    console.log('Timer stopped and reset');
  };

  const progress = isBreak
    ? 100 - ((breakSecondsElapsed / (breakTime * 60)) * 100)
    : 100 - ((secondsElapsed / (timeInMinutes * 60)) * 100);

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

  const progressColor = getProgressColor(100 - progress);

  return (
    <Flex height="100%" direction="column" alignItems="start" justifyContent="center" width="100%">
      <Box p={4} bg={boxBg} borderRadius="lg" position="relative">
        {isRunning && (
          <Text color="red" cursor="pointer" onClick={handleStopClick} position="absolute" right={3} top={2}>
            Stop
          </Text>
        )}
        <Flex direction="column" justifyContent="center" alignItems="center">
          <CircularProgress value={progress} size="230px" thickness="12px" color={progressColor} max={100}>
            <CircularProgressLabel fontSize="4xl">
              {isBreak
                ? `${Math.max(0, Math.floor((breakTime * 60 - breakSecondsElapsed) / 60))}m ${Math.max(0, Math.round((breakTime * 60 - breakSecondsElapsed) % 60))}s`
                : `${Math.max(0, Math.floor((timeInMinutes * 60 - secondsElapsed) / 60))}m ${Math.max(0, Math.round((timeInMinutes * 60 - secondsElapsed) % 60))}s`}
            </CircularProgressLabel>
          </CircularProgress>
          {!focusTime && !isBreak && (
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
        </Flex>
      </Box>
      <Box p={4} bg={breakBoxBg} borderRadius="lg" boxShadow="lg" width="100%" textAlign="center" mt={4}>
        {isBreak ? (
          <Text fontSize="lg">Break Time: {`${Math.max(0, Math.floor((breakTime * 60 - breakSecondsElapsed) / 60))}m ${Math.max(0, Math.round((breakTime * 60 - breakSecondsElapsed) % 60))}s`}</Text>
        ) : (
          <Text fontSize="lg">Next Break in {Math.ceil((breakTime * 60 - secondsElapsed) / 60)} minutes</Text>
        )}
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
