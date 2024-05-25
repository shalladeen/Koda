// src/components/pages/TimeTracker/MiniTimer.js
import React, { useState, useEffect } from 'react';
import { Box, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import { FaPause, FaPlay } from 'react-icons/fa';
import TimerDialog from '../../../Dialogs/TimerDialog';

function MiniTimer() {
  const { timeInMinutes, secondsElapsed, isRunning, setIsRunning, tag } = useTimer();
  const [remainingTime, setRemainingTime] = useState(timeInMinutes * 60 - secondsElapsed);
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsDialogOpen(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, setIsRunning]);

  useEffect(() => {
    setRemainingTime(timeInMinutes * 60 - secondsElapsed);
  }, [timeInMinutes, secondsElapsed]);

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");
  const buttonHoverBgColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Box
        bg={isHovered ? hoverBgColor : 'transparent'}
        color={textColor}
        borderRadius="md"
        p={4}
        transition="all 0.5s ease-in-out"
        style={{ transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform' }}
        width="120px"
        height="60px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        position="fixed"
        top="20px"
        right="20px"
      >
        <Text fontSize="lg" fontWeight="bold">
          {`${Math.floor(remainingTime / 60)}m ${Math.round(remainingTime % 60)}s`}
        </Text>
        {isHovered && (
          <IconButton
            aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
            icon={isRunning ? <FaPause /> : <FaPlay />}
            onClick={handlePauseResume}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg={textColor}
            color={bgColor}
            _hover={{ bg: buttonHoverBgColor }}
          />
        )}
      </Box>
      <TimerDialog isOpen={isDialogOpen} onClose={closeDialog} tag={tag} />
    </>
  );
}

export default MiniTimer;
