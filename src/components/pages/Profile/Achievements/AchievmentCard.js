import React from 'react';
import { Box, Heading, Text, Icon } from '@chakra-ui/react';

const AchievementCard = ({ icon, title, description }) => {
  return (
    <Box
      p={5}
      borderWidth={1}
      borderRadius="md"
      bg="gray.100"
      textAlign="center"
      boxShadow="md"
      width="250px"
    >
      <Icon as={icon} w={12} h={12} mb={2} color="blue.500" />
      <Heading as="h4" size="md" mb={2}>{title}</Heading>
      <Text>{description}</Text>
    </Box>
  );
};

export default AchievementCard;
