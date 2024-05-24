// src/components/pages/TimeTracker/Timer.js
import React from 'react';
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
  HStack,
} from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
function Timer() {
    const { timeInMinutes, setTimeInMinutes, secondsElapsed, setSecondsElapsed, isRunning, setIsRunning } = useTimer();

    const startTimer = () => {
        if (!isRunning && timeInMinutes > 0) {
            setIsRunning(true);
            setSecondsElapsed(0);
        }
    };

    const pauseTimer = () => setIsRunning(false);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeInMinutes(0);
        setSecondsElapsed(0);
    };

    const progress = 100 - ((secondsElapsed / (timeInMinutes * 60)) * 100);

    const setPresetTime = (minutes) => {
        if (!isRunning) {
            setTimeInMinutes(minutes);
            setSecondsElapsed(0);
        }
    };

    return (
        <Center minHeight="100vh" flexDirection="column">
            <VStack spacing={10}>
                <CircularProgress value={progress} size="400px" thickness="12px"
                                  color={getProgressColor(100 - progress)} max={100}>
                    <CircularProgressLabel fontSize="4xl">
                        {`${Math.floor((timeInMinutes * 60 - secondsElapsed) / 60)}m ${Math.round((timeInMinutes * 60 - secondsElapsed) % 60)}s`}
                    </CircularProgressLabel>
                </CircularProgress>
                <HStack spacing={4}>
                    <Button onClick={() => setPresetTime(30)} size="md">30m</Button>
                    <Button onClick={() => setPresetTime(60)} size="md">1h</Button>
                    <Button onClick={() => setPresetTime(90)} size="md">1h 30m</Button>
                    <Button onClick={() => setPresetTime(120)} size="md">2h</Button>
                </HStack>
                <Slider aria-label="timer-slider" defaultValue={0} min={0} max={120}
                        step={1}
                        onChange={(val) => {
                            if (!isRunning) {
                                setTimeInMinutes(val);
                                setSecondsElapsed(0);
                            }
                        }}
                        value={timeInMinutes} size="lg">
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <HStack spacing={6}>
                    <Button onClick={startTimer} isDisabled={isRunning || timeInMinutes === 0} size="lg">Start</Button>
                    <Button onClick={pauseTimer} isDisabled={!isRunning} size="lg">Pause</Button>
                    <Button onClick={resetTimer} size="lg">Reset</Button>
                </HStack>
            </VStack>
        </Center>
    );
}

function getProgressColor(inverseProgress) {
    if (inverseProgress < 33) return "green.400";
    if (inverseProgress < 66) return "yellow.400";
    return "red.400";
}

export default Timer;
