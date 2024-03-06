import React from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

function WelcomeGreeting({ isLoggedIn }) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';

  return (
    <Box bg={bgColor} w="60%" p={10} mt={30} boxShadow={boxShadow} borderRadius="lg">
      <Heading color={textColor} size="lg" textAlign="left">
        {isLoggedIn ? 'Welcome Back!' : 'Welcome to Your Dashboard'}
      </Heading>
    </Box>
  );
}

export default WelcomeGreeting;
