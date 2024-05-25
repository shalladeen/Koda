import React, { useState, useEffect } from 'react';
import { Box, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import { FaPause, FaPlay } from 'react-icons/fa';

function MiniTimer() {
    const { timeInMinutes, secondsElapsed, isRunning, setIsRunning } = useTimer();
    const [remainingTime, setRemainingTime] = useState(timeInMinutes * 60 - secondsElapsed);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
                if (remainingTime <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, remainingTime]);

    const bgColor = useColorModeValue("white", "gray.800");
    const hoverBgColor = useColorModeValue("gray.200", "gray.600");
    const textColor = useColorModeValue("black", "white");
    const buttonHoverBgColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

    const handlePauseResume = () => {
        setIsRunning(!isRunning);
    };

    if (!isRunning && remainingTime <= 0) return null;

    return (
        <Box
            bg={isHovered ? hoverBgColor : bgColor}
            color={textColor}
            borderRadius="md"
            p={4}
            boxShadow="md"
            transition="all 0.5s ease-in-out"
            style={{ transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform' }}
            width="150px"
            height="80px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative" // Ensure relative positioning for the button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Text fontSize="2xl" fontWeight="bold">
                {`${Math.floor(remainingTime / 60)}m ${Math.round(remainingTime % 60)}s`}
            </Text>
            {isHovered && (
                <IconButton
                    aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
                    icon={isRunning ? <FaPause /> : <FaPlay />}
                    onClick={handlePauseResume}
                    position="absolute" // Position absolutely within the Box
                    top="50%" // Center vertically
                    left="50%" // Center horizontally
                    transform="translate(-50%, -50%)" // Offset to center
                    bg={textColor}
                    color={bgColor}
                    _hover={{ bg: buttonHoverBgColor }}
                />
            )}
        </Box>
    );
}

export default MiniTimer;
