import React, { useEffect, useState } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useTimer } from '../../../context/TimerContext';
import { useNavigate } from 'react-router-dom';
import TimerDialog from '../../../Dialogs/TimerDialog';

function MiniTimer() {
  const { timeInMinutes, secondsElapsed, isRunning, isBreak, tag, isDialogOpen, closeDialog } = useTimer();
  const [remainingTime, setRemainingTime] = useState(timeInMinutes * 60 - secondsElapsed);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setRemainingTime(timeInMinutes * 60 - secondsElapsed);
  }, [timeInMinutes, secondsElapsed]);

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");

  if (remainingTime <= 0) return null;

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
        onClick={() => navigate('/TimeTracker')}
        position="fixed"
        top={2}
        right={14}
        cursor="pointer"
      >
        <Text fontSize="lg" fontWeight="bold">
          {isBreak ? "Break Time" : `${Math.floor(remainingTime / 60)}m ${Math.round(remainingTime % 60)}s`}
        </Text>
      </Box>
      <TimerDialog isOpen={isDialogOpen} onClose={closeDialog} tag={tag} />
    </>
  );
}

export default MiniTimer;
