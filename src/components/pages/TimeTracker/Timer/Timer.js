import React, { useEffect, useState, useRef } from 'react';
import {
  Button, CircularProgress, CircularProgressLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Box, Flex, useColorModeValue, Text
} from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import TimerDialog from '../../../Dialogs/TimerDialog';
import { createFocusSession } from '../../../../services/focusService';

function Timer({ focusTime, breakTime, presetFocusTime, presetBreakTime, isFreeTimer, startTimerInitially, setTimerStarted, progressColor }) {
  const { timeInMinutes, setTimeInMinutes, secondsElapsed, setSecondsElapsed, isRunning, setIsRunning, isBreak, setIsBreak, isDialogOpen, closeDialog, resetTimer, tag, setIsDialogOpen, setStartTime, startTime, saveFocusSession } = useTimer();
  const [breakSecondsElapsed, setBreakSecondsElapsed] = useState(0);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('continue'); 
  const [currentBreakTime, setCurrentBreakTime] = useState(breakTime); 
  const [isPaused, setIsPaused] = useState(false); 
  const [isPresetActive, setIsPresetActive] = useState(false); 
  const [showNextBreakText, setShowNextBreakText] = useState(false);

  const breakBoxBg = useColorModeValue('gray.100', 'gray.700');
  const emptySpaceColor = useColorModeValue('white', '#1a1a1a'); 

  // Refs to store interval IDs
  const focusIntervalRef = useRef(null);
  const breakIntervalRef = useRef(null);

  // Ref to track if the focus session has been saved
  const hasSavedFocusSession = useRef(false);

  // Use effect for resetting the timer
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
      hasSavedFocusSession.current = false; 
      console.log('Timer initialized with focusTime:', effectiveFocusTime, 'and breakTime:', effectiveBreakTime);
    }
  }, [presetFocusTime, presetBreakTime, focusTime, breakTime, isRunning, isBreak, isPaused, setTimeInMinutes, setSecondsElapsed, setBreakSecondsElapsed]);

  // Use effect for starting the timer
  useEffect(() => {
    if (startTimerInitially && !isRunning && !isBreak) {
      startFocusTimer();
    }
  }, [startTimerInitially, isRunning, isBreak]);

  // Use effect for handling the timer
  useEffect(() => {
    if (isRunning && !isBreak) {
      // Clear any existing interval
      if (focusIntervalRef.current) {
        clearInterval(focusIntervalRef.current);
      }
      focusIntervalRef.current = setInterval(() => {
        setSecondsElapsed(prev => {
          const newElapsed = prev;
          if (newElapsed >= timeInMinutes * 60) {
            clearInterval(focusIntervalRef.current);
            setIsRunning(false);
            setIsDialogOpen(true); 
            setBreakSecondsElapsed(0);
            if (!hasSavedFocusSession.current) {
              const endTime = new Date();
              // Save the focus session to the backend
              createFocusSession(startTime, endTime, newElapsed)
                .then(() => {
                  hasSavedFocusSession.current = true; 
                  console.log('Focus session saved to backend');
                })
                .catch(error => {
                  console.error('Error saving focus session:', error);
                });
              console.log('Focus time completed, break started');
            }
          }
          return newElapsed;
        });
      }, 1000);
    }
    return () => {
      if (focusIntervalRef.current) {
        clearInterval(focusIntervalRef.current);
      }
    };
  }, [isRunning, timeInMinutes, isBreak, setIsDialogOpen, setSecondsElapsed, startTime]);

  // Use effect for handling the break timer
  useEffect(() => {
    if (isBreak && isRunning) {
      // Clear any existing interval
      if (breakIntervalRef.current) {
        clearInterval(breakIntervalRef.current);
      }
      breakIntervalRef.current = setInterval(() => {
        setBreakSecondsElapsed(prev => {
          const newElapsed = prev + 1;
          if (newElapsed >= currentBreakTime * 60) {
            clearInterval(breakIntervalRef.current);
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
    return () => {
      if (breakIntervalRef.current) {
        clearInterval(breakIntervalRef.current);
      }
    };
  }, [isBreak, isRunning, currentBreakTime, presetFocusTime, focusTime, setTimeInMinutes, setSecondsElapsed, setTimerStarted]);

  const startFocusTimer = () => {
    if (!isRunning && !isBreak) {
      setIsRunning(true);
      setTimerStarted(true);
      setStartTime(new Date()); // Capture the start time
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
    setShowNextBreakText(false); 
    hasSavedFocusSession.current = false; 
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
      setShowNextBreakText(false); 
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
      <Box p={4} borderRadius="lg" position="relative" width="100%" mb={6} flex="1">
        {isRunning && !isBreak && (
          <Text color="red" cursor="pointer" onClick={handleStopClick} position="absolute" left={4} top={2}>
            Reset
          </Text>
        )}
        {isPresetActive && (
          <>
            {isBreak ? (
              <Text fontSize="md" p={4} bg={breakBoxBg} borderRadius="lg" width={{ base: '90%', md: '80%' }} textAlign="center" mt={4}>
                Timer will start again in {`${Math.max(0, Math.floor((currentBreakTime * 60 - breakSecondsElapsed) / 60))}m ${Math.max(0, Math.round((currentBreakTime * 60 - breakSecondsElapsed) % 60))}s`}. Enjoy your break!
              </Text>
            ) : (
              <Text fontSize="md" position="absolute" right={4} top={2}>
                Next Break in {nextBreakIn} minutes
              </Text>
            )}
          </>
      )}
        <Flex direction="column" justifyContent="center" alignItems="center" gap={5} p={10}>
          <CircularProgress value={progress} size="230px" thickness="12px" color={progressColor} trackColor={emptySpaceColor} max={100} mb={6} mt={5}>
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
              mb={6}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          )}
          <Button onClick={isRunning ? pauseTimer : startFocusTimer} isDisabled={timeInMinutes === 0} size="lg" mt={4} mb={6}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
        </Flex>
      </Box>
      
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
