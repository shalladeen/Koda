// src/components/pages/TimeTracker/Timer.js
import React, { useEffect, useState } from 'react';
import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Text,
  HStack,
  Select,
  Box
} from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import TimerDialog from '../../../Dialogs/TimerDialog';

function Timer() {
  const { timeInMinutes, setTimeInMinutes, secondsElapsed, setSecondsElapsed, isRunning, setIsRunning, tag, setTag } = useTimer();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const startTimer = () => {
    if (!isRunning && timeInMinutes > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => setIsRunning(false);

  const progress = 100 - ((secondsElapsed / (timeInMinutes * 60)) * 100);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          if (prev >= timeInMinutes * 60 - 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsDialogOpen(true);
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeInMinutes, setSecondsElapsed, setIsRunning]);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Center minHeight="100vh" flexDirection="column">
      
      <VStack spacing={10}>
        <CircularProgress value={progress} size="400px" thickness="12px" color={getProgressColor(100 - progress)} max={100}>
          <CircularProgressLabel fontSize="4xl">
            {`${Math.floor((timeInMinutes * 60 - secondsElapsed) / 60)}m ${Math.round((timeInMinutes * 60 - secondsElapsed) % 60)}s`}
          </CircularProgressLabel>
        </CircularProgress>
        <Box width="150px">
          <Select value={tag} onChange={(e) => setTag(e.target.value)} size="sm">
            <option value="none">No Tag</option>
            <option value="work">Work</option>
            <option value="school">School</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </Select>
        </Box>
        <Slider
          aria-label="timer-slider"
          defaultValue={0}
          min={0}
          max={120}
          step={1}
          onChange={(val) => {
            if (!isRunning) {
              setTimeInMinutes(val);
              setSecondsElapsed(0);
            }
          }}
          value={timeInMinutes}
          size="lg"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <HStack spacing={6}>
          <Button onClick={isRunning ? pauseTimer : startTimer} isDisabled={timeInMinutes === 0} size="lg">
            {isRunning ? 'Pause' : 'Focus'}
          </Button>
        </HStack>
      </VStack>
      <TimerDialog isOpen={isDialogOpen} onClose={closeDialog} tag={tag} />
    </Center>
  );
}

function getProgressColor(inverseProgress) {
  if (inverseProgress < 33) return "green.400";
  if (inverseProgress < 66) return "yellow.400";
  return "red.400";
}

export default Timer;
