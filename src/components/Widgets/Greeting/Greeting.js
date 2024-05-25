import React from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

function WelcomeGreeting({ isLoggedIn }) {
 
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box w="60%" p={10} mt={30} borderRadius="lg">
      <Heading color={textColor} size="lg" textAlign="left">
        Welcome to Koda!
      </Heading>
    </Box>
  );
}

export default WelcomeGreeting;
