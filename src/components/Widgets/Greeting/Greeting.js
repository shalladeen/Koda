import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

function WelcomeGreeting({ compact = false }) {
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const { user } = useAuth();
    const [subtextIndex, setSubtextIndex] = useState(0);
    const messages = [
        "Let's focus!",
        "Welcome back!",
        "Ready to achieve your goals?",
        "Let's be productive!",
        "Keep up the good work!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setSubtextIndex((prevIndex) => (prevIndex + 1) % messages.length);
        },  600000);
        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <Box textAlign="left" py={compact ? 1 : 10} px={compact ? 2 : 10} borderRadius="lg">
            <Heading color={textColor} size={compact ? 'lg' : '2xl'} mt={16}>
                Hello, {user ? user.username : 'Guest'}
            </Heading>
            <Text color={textColor} fontSize={compact ? 'md' : 'xl'} mt={2}>
                {messages[subtextIndex]}
            </Text>
        </Box>
    );
}

export default WelcomeGreeting;
