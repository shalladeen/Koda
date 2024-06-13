import React from 'react';
import { Box, Heading, Text, Icon } from '@chakra-ui/react';

const AchievementCard = ({ icon, title, description, isCompleted, onClick }) => {
  const cardBgColor = isCompleted ? 'pastelGreen.500' : 'gray.100';
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
      <Icon as={icon} w={12} h={12} mb={2} color={isCompleted ? 'blue.500' : 'gray.500'} />
      <Heading as="h4" size="md" mb={2} color={textColor}>{title}</Heading>
      <Text color={textColor}>{description}</Text>
    </Box>
  );
};

export default AchievementCard;
