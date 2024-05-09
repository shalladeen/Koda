// src/components/Task/TaskSettings.js
import { useColorModeValue } from '@chakra-ui/react';

export const useTaskColors = () => {
  const bgColor = useColorModeValue('#f9fdff', '#1A252F');
  const primaryColor = useColorModeValue('#2C3E50', '#B5C5D6');
  const secondaryColor = useColorModeValue('#74808D', '#B5C5D6');
  const buttonColor = useColorModeValue('#269BC0', '#B5C5D6');
  const hoverColor = useColorModeValue('#B5C5D6', '#269BC0');
  const modalBgColor = useColorModeValue('#EDF2F7', '#2C3E50');
  const modalTextColor = useColorModeValue('#2C3E50', '#f9fdff');
  const taskTextColor = useColorModeValue('#2C3E50', 'white');

  return {
    bgColor,
    primaryColor,
    secondaryColor,
    buttonColor,
    hoverColor,
    modalBgColor,
    modalTextColor,
    taskTextColor,
  };
};
