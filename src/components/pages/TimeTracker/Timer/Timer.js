import React, { useEffect, useState } from 'react';
import {
  Button, CircularProgress, CircularProgressLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Box, Flex, useColorModeValue, Text} from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import TimerDialog from '../../../Dialogs/TimerDialog';

function Timer({ focusTime, breakTime, presetFocusTime, presetBreakTime, isFreeTimer, startTimerInitially, setTimerStarted, progressColor }) {
  const { timeInMinutes, setTimeInMinutes, secondsElapsed, setSecondsElapsed, isRunning, setIsRunning, isBreak, setIsBreak, isDialogOpen, closeDialog, resetTimer, tag, setIsDialogOpen } = useTimer();
  const [breakSecondsElapsed, setBreakSecondsElapsed] = useState(0);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('continue'); 
  const [currentBreakTime, setCurrentBreakTime] = useState(breakTime); 
  const [isPaused, setIsPaused] = useState(false); 
  const [isPresetActive, setIsPresetActive] = useState(false); 

  // Ensure hooks are called unconditionally
  const breakBoxBg = useColorModeValue('gray.100', 'gray.700');
  const emptySpaceColor = useColorModeValue('white', '#1a1a1a'); 

  // Effect to initialize timer
  useEffect(() => {
    const effectiveFocusTime = presetFocusTime || focusTime || 0; 
    const effectiveBreakTime = presetBreakTime || breakTime || 0; 

    if (!isRunning && !isBreak && !isPaused) {
      setTimeInMinutes(effectiveFocusTime);
      setSecondsElapsed(0);
      setBreakSecondsElapsed(0);
      setIsBreak(false);
      setCurrentBreakTime(effectiveBreakTime); 
      setIsPresetActive(!!presetFocusTime && !!presetBreakTime); 
      console.log('Timer initialized with focusTime:', effectiveFocusTime, 'and breakTime:', effectiveBreakTime);
    }
  }, [presetFocusTime, presetBreakTime, focusTime, breakTime, isRunning, isBreak, isPaused, secondsElapsed, setTimeInMinutes, setSecondsElapsed, setBreakSecondsElapsed]);

  // Effect to handle initial timer start
  useEffect(() => {
    if (startTimerInitially && !isRunning && !isBreak) {
      startFocusTimer();
    }
  }, [startTimerInitially, isRunning, isBreak]);

  // Effect to run focus timer
  useEffect(() => {
    let interval;
    if (isRunning && !isBreak) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          console.log(`Elapsed Time: ${newElapsed} seconds, Time In Minutes: ${timeInMinutes} minutes`);
          if (newElapsed >= timeInMinutes * 60) {
            clearInterval(interval);
            setIsRunning(false);
            if (!isBreak) {
              console.log('This line is opening the dialog in Timer component focus timer');
              setDialogType('continue'); 
              setIsDialogOpen(true); 
              setBreakSecondsElapsed(0);
              console.log('Focus time completed, break started');
            }
          }
          return newElapsed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeInMinutes, isBreak, setIsDialogOpen, setSecondsElapsed]);

  // Effect to run break timer
  useEffect(() => {
    let interval;
    if (isBreak && isRunning) {
      interval = setInterval(() => {
        setBreakSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          console.log(`Break Elapsed Time: ${newElapsed} seconds, Break Time In Minutes: ${currentBreakTime} minutes`);
          if (newElapsed >= currentBreakTime * 60) {
            clearInterval(interval);
            setIsBreak(false);
            setSecondsElapsed(0);
            setTimeInMinutes(presetFocusTime || focusTime);
            setTimerStarted(true);
            startFocusTimer(); 
            console.log('Break completed, focus time resumed');
          }
          return newElapsed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreak, currentBreakTime, presetBreakTime, breakTime, presetFocusTime, focusTime, isRunning, setTimeInMinutes, setSecondsElapsed, setTimerStarted]);

  const startFocusTimer = () => {
    if (!isRunning && !isBreak) {
      setIsRunning(true);
      setTimerStarted(true);
      console.log('Focus timer started');
    }
  };

  const startBreakTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTimerStarted(true); 
      console.log('Break timer started');
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true); 
    console.log(`Timer paused at ${secondsElapsed} seconds (Time In Minutes: ${timeInMinutes} minutes)`);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
    setBreakSecondsElapsed(0);
    setTimeInMinutes(0);
    setTimerStarted(false);
    setIsBreak(false); 
    setIsPresetActive(false); 
    console.log('Timer stopped and reset');
  };

  const handleContinueConfirm = () => {
    setIsDialogOpen(false);
    setIsBreak(true);
    setBreakSecondsElapsed(0);
    setCurrentBreakTime(presetBreakTime || breakTime); 
    console.log('Break started');
    startBreakTimer(); 
  };

  const handleContinueCancel = () => {
    setIsDialogOpen(false);
    stopTimer();
    console.log('Timer stopped after focus time completed');
  };

  const progress = isBreak
    ? 100 - ((breakSecondsElapsed / (currentBreakTime * 60)) * 100)
    : 100 - ((secondsElapsed / (timeInMinutes * 60)) * 100);

  const handleSliderChange = (val) => {
    if (!isRunning) {
      setTimeInMinutes(Math.max(0, val));
      setSecondsElapsed(0);
      setIsPresetActive(false);
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

  const nextBreakIn = !isBreak ? Math.ceil((timeInMinutes * 60 - secondsElapsed) / 60) : Math.ceil((currentBreakTime * 60 - breakSecondsElapsed) / 60);

  return (
    <Flex height="100%" direction="column" alignItems="center" justifyContent="center" width="100%">
      <Box p={4} borderRadius="lg" position="relative" width="100%">
        {isRunning && !isBreak && (
          <Text color="red" cursor="pointer" onClick={handleStopClick} position="absolute" ml={10} top={2}>
            Reset
          </Text>
        )}
        <Flex direction="column" justifyContent="center" alignItems="center">
          <CircularProgress value={progress} size="230px" thickness="12px" color={progressColor} trackColor={emptySpaceColor} max={100}>
            <CircularProgressLabel fontSize="4xl">
              {isBreak
                ? `${Math.max(0, Math.floor((currentBreakTime * 60 - breakSecondsElapsed) / 60))}m ${Math.max(0, Math.round((currentBreakTime * 60 - breakSecondsElapsed) % 60))}s`
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
              width="80%"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          )}
          <Button onClick={isRunning ? pauseTimer : startFocusTimer} isDisabled={timeInMinutes === 0} size="lg" mt={4}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
        </Flex>
      </Box>
      {isPresetActive && (
        <Box p={4} bg={breakBoxBg} borderRadius="lg" width={{ base: '90%', md: '80%' }} textAlign="center" mt={4}>
          {isBreak ? (
            <Text fontSize="md">Timer will start again in {`${Math.max(0, Math.floor((currentBreakTime * 60 - breakSecondsElapsed) / 60))}m ${Math.max(0, Math.round((currentBreakTime * 60 - breakSecondsElapsed) % 60))}s`}. Enjoy your break!</Text>
          ) : (
            <Text fontSize="md">Next Break in {nextBreakIn} minutes</Text>
          )}
        </Box>
      )}
      <TimerDialog
        isOpen={isDialogOpen}
        onClose={handleContinueCancel}
        onConfirm={handleContinueConfirm}
        type={dialogType}
        tag={tag}
        breakTime={currentBreakTime}
      />
      <TimerDialog
        isOpen={isStopDialogOpen}
        onClose={handleStopCancel}
        onConfirm={handleStopConfirm}
        type="stop"
      />
    </Flex>
  );
}

export default Timer;
