import React from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

function WelcomeGreeting({ compact = false }) {
    const textColor = useColorModeValue('gray.800', 'gray.100');

    return (
        <Box textAlign="left" py={compact ? 1 : 10} px={compact ? 2 : 10} borderRadius="lg">
            <Heading color={textColor} size={compact ? 'sm' : 'lg'}>
                Dashboard
            </Heading>
        </Box>
    );
}

export default WelcomeGreeting;
