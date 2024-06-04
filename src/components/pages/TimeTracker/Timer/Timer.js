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
  FormControl,
  FormLabel,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import TimerDialog from '../../../Dialogs/TimerDialog';

function Timer({ focusTime, breakTime, isFreeTimer, handleToggleMode, startTimerInitially, setTimerStarted }) {
  const { timeInMinutes, setTimeInMinutes, secondsElapsed, setSecondsElapsed, isRunning, setIsRunning, isDialogOpen, closeDialog } = useTimer();
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);

  useEffect(() => {
    if (focusTime) {
      setTimeInMinutes(focusTime);
      setSecondsElapsed(0);
    }
  }, [focusTime, setTimeInMinutes, setSecondsElapsed]);

  useEffect(() => {
    if (startTimerInitially && !isRunning) {
      setIsRunning(true);
      setTimerStarted(true);
    }
  }, [startTimerInitially, isRunning, setIsRunning, setTimerStarted]);

  const startTimer = () => {
    if (!isRunning && timeInMinutes > 0) {
      setIsRunning(true);
      setTimerStarted(true);
    }
  };

  const pauseTimer = () => setIsRunning(false);

  const stopTimer = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
    setTimerStarted(false);
  };

  const progress = 100 - ((secondsElapsed / (timeInMinutes * 60)) * 100);

  const handleSliderChange = (val) => {
    if (!isRunning) {
      setTimeInMinutes(Math.max(0, val));
      setSecondsElapsed(0);
    }
  };

  const handleStopClick = () => {
    setIsStopDialogOpen(true);
  };

  const handleStopConfirm = () => {
    stopTimer();
    setIsStopDialogOpen(false);
  };

  const handleStopCancel = () => {
    setIsStopDialogOpen(false);
  };

  return (
    <Flex height="100%" direction="column" alignItems="start" width="100%">
      <Box p={4} bg={useColorModeValue('white', 'gray.800')}>
        <Flex direction="row" justifyContent="space-between" alignItems="start">
          <VStack spacing={3} alignItems="center">
            <CircularProgress value={progress} size="230px" thickness="12px" color={getProgressColor(100 - progress)} max={100}>
              <CircularProgressLabel fontSize="4xl">
                {`${Math.max(0, Math.floor((timeInMinutes * 60 - secondsElapsed) / 60))}m ${Math.max(0, Math.round((timeInMinutes * 60 - secondsElapsed) % 60))}s`}
              </CircularProgressLabel>
              <Text fontSize="md">{focusTime ? `${focusTime} min` : ''}</Text>
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
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            )}
            <Button onClick={isRunning ? pauseTimer : startTimer} isDisabled={timeInMinutes === 0} size="lg">
              {isRunning ? 'Pause' : 'Focus'}
            </Button>
          </VStack>
          {isRunning && (
            <Text color="red" cursor="pointer" onClick={handleStopClick}>
              Stop
            </Text>
          )}
        </Flex>
      </Box>
      <TimerDialog isOpen={isDialogOpen} onClose={closeDialog} />
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
