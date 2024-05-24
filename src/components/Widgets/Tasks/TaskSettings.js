import { useColorModeValue } from '@chakra-ui/react';

export const useTaskColors = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1A202C'); // White for light mode, dark gray for dark mode
  const primaryColor = useColorModeValue('#000000', '#FFFFFF'); // Black for light mode, white for dark mode
  const secondaryColor = useColorModeValue('#4A5568', '#A0AEC0'); // Dark gray for light mode, light gray for dark mode
  const buttonColor = useColorModeValue('#000000', '#FFFFFF'); // Black for light mode, white for dark mode
  const hoverColor = useColorModeValue('#E2E8F0', '#2D3748'); // Light gray for light mode, darker gray for dark mode
  const modalBgColor = useColorModeValue('#F7FAFC', '#2D3748'); // Very light gray for light mode, dark gray for dark mode
  const modalTextColor = useColorModeValue('#1A202C', '#E2E8F0'); // Dark gray for light mode, light gray for dark mode
  const taskTextColor = useColorModeValue('#1A202C', '#E2E8F0'); // Dark gray for light mode, light gray for dark mode

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
