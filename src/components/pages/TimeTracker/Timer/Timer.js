import React, { useState, useEffect } from 'react';
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

function Timer() {
    const maxTimeInMinutes = 120;
    const [timeInMinutes, setTimeInMinutes] = useState(0);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const totalTimeInSeconds = timeInMinutes * 60;

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setSecondsElapsed(prevSeconds => {
                    const nextSeconds = prevSeconds + 1;
                    if (nextSeconds >= timeInMinutes * 60) {
                        clearInterval(interval);
                        setIsRunning(false);
                    }
                    return nextSeconds;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, secondsElapsed, timeInMinutes]);

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

    return (
        <Center minHeight="100vh" flexDirection="column">
            <VStack spacing={10}>
                
                <CircularProgress value={progress} size="400px" thickness="12px"
                                  color={getProgressColor(100 - progress)} max={100}>
                    <CircularProgressLabel fontSize="4xl">
                        {`${Math.floor((totalTimeInSeconds - secondsElapsed) / 60)}m ${Math.round((totalTimeInSeconds - secondsElapsed) % 60)}s`}
                    </CircularProgressLabel>
                </CircularProgress>
                <Slider aria-label="timer-slider" defaultValue={0} min={0} max={maxTimeInMinutes * 60}
                    onChange={(val) => {
                        const newTimeInMinutes = Math.max(0, Math.min(val / 60, maxTimeInMinutes));
                        if (!isRunning) {
                            setTimeInMinutes(newTimeInMinutes);
                            setSecondsElapsed(0);
                        }
                    }}
                    value={timeInMinutes * 60} size="lg">
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

// Adjusted to use the inverse of the progress for color determination
function getProgressColor(inverseProgress) {
    if (inverseProgress < 33) return "blue.400";
    if (inverseProgress < 66) return "blue.400";
    return "blue.400";
}

export default Timer;
