import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const FocusStats = () => {
  return (
    <Box w="full" p={4} borderRadius="md" bg="gray.200">
      <Heading as="h3" size="lg">Focus Stats</Heading>
      <Text mt={2}>Focus stats will be displayed here.</Text>
    </Box>
  );
};

export default FocusStats;
