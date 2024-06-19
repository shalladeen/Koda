import React from 'react';
import { Box, Heading, Text, Icon } from '@chakra-ui/react';
import { FaClock, FaPlay } from 'react-icons/fa';

const AchievementCard = ({ icon, title, description, isCompleted, type, onClick }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'focus':
        return {
          bgColor: 'blue.100',
          icon: FaClock,
        };
      case 'session':
        return {
          bgColor: 'green.100',
          icon: FaPlay,
        };
      default:
        return {
          bgColor: 'gray.100',
          icon: icon,
        };
    }
  };

  const { bgColor, icon: TypeIcon } = getTypeStyles(type);
  const cardBgColor = isCompleted ? bgColor : 'gray.100';
  const textColor = isCompleted ? 'black' : 'gray.500';

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      bg={cardBgColor}
      textAlign="center"
      boxShadow="md"
      cursor="pointer"
      onClick={onClick}
    >
      <Icon as={TypeIcon} w={12} h={12} mb={2} color={isCompleted ? 'blue.500' : 'gray.500'} />
      <Heading as="h4" size="md" mb={2} color={textColor}>{title}</Heading>
      <Text color={textColor}>{description}</Text>
    </Box>
  );
};

export default AchievementCard;
