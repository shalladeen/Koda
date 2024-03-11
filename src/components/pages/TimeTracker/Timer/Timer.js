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
    const maxTimeInMinutes = 120; // 2 hours
    const [timeInMinutes, setTimeInMinutes] = useState(0); // Time in minutes set by the slider
    const [secondsLeft, setSecondsLeft] = useState(0); // Countdown in seconds
    const [isRunning, setIsRunning] = useState(false);

    // This effect handles the countdown logic.
    useEffect(() => {
        let interval = null;
        if (isRunning && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (secondsLeft <= 0 && isRunning) {
            setIsRunning(false); // Automatically stop the timer when it reaches 0.
        }
        return () => clearInterval(interval);
    }, [isRunning, secondsLeft]);

    const startTimer = () => {
        if (!isRunning && timeInMinutes > 0) {
            setIsRunning(true);
            setSecondsLeft(timeInMinutes * 60); // Initialize the countdown based on the selected time.
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeInMinutes(0); // Reset the slider position to 0.
        setSecondsLeft(0); // Clear the countdown.
    };

    // Progress calculation for the CircularProgress component to fill up as the countdown proceeds.
    const progress = (secondsLeft / (timeInMinutes * 60)) * 100;

    return (
        <Center minHeight="100vh" flexDirection="column">
            <VStack spacing={8}>
                <Slider aria-label="timer-slider" defaultValue={0} min={0} max={maxTimeInMinutes * 60}
                        onChange={(val) => {
                            setTimeInMinutes(val / 60);
                            // Optionally update secondsLeft here if you want the slider to also act as a manual countdown setter.
                            if (!isRunning) {
                                setSecondsLeft(val);
                            }
                        }}
                        value={timeInMinutes * 60}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <CircularProgress value={isRunning ? progress : 0} size="160px" thickness="12px" color="green.400" max={100}>
                    <CircularProgressLabel>
                        {`${Math.floor(secondsLeft / 60)}m ${secondsLeft % 60}s`}
                    </CircularProgressLabel>
                </CircularProgress>
                <HStack spacing={4}>
                    <Button onClick={startTimer} isDisabled={isRunning || timeInMinutes === 0}>Start</Button>
                    <Button onClick={pauseTimer} isDisabled={!isRunning}>Pause</Button>
                    <Button onClick={resetTimer}>Reset</Button>
                </HStack>
            </VStack>
        </Center>
    );
}

export default Timer;
