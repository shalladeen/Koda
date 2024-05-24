import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';

function MiniTimer() {
    const { timeInMinutes, secondsElapsed, isRunning } = useTimer();
    const remainingTime = timeInMinutes * 60 - secondsElapsed;

    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");

    if (!isRunning) return null;

    return (
        <Box
            bg={bgColor}
            color={textColor}
            borderRadius="md"
            p={4}
            boxShadow="md"
            bottom="20px"
            right="20px"
            transition="all 0.5s ease-in-out"
            style={{ transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform' }}
        >
            <Text fontSize="2xl" fontWeight="bold">
                {`${Math.floor(remainingTime / 60)}m ${Math.round(remainingTime % 60)}s`}
            </Text>
        </Box>
    );
}

export default MiniTimer;
