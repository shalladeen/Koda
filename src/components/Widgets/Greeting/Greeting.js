import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

function WelcomeGreeting({ isLoggedIn }) {
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "Ready to be productive today?",
        "Let's focus! Start a timer.",
        "Any new tasks today?",
        "Keep up the great work!",
        "Stay positive and productive!",
        "You're doing great, keep going!",
    ];

    useEffect(() => {
        const storedMessageIndex = localStorage.getItem('messageIndex');
        if (storedMessageIndex !== null) {
            setMessageIndex(parseInt(storedMessageIndex, 10));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('messageIndex', messageIndex);
    }, [messageIndex]);

    const getGreetingMessage = () => {
        if (isLoggedIn) {
            return messageIndex === 0 ? "Welcome back to Koda!" : messages[messageIndex];
        } else {
            return messageIndex === 0 ? " " : messages[messageIndex];
        }
    };

    const toggleMessageIndex = () => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                toggleMessageIndex();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <Box w="40%" p={10} mt={30} borderRadius="lg" textAlign="center">
            <Heading color={textColor} size="lg">
                {isLoggedIn ? "Welcome back to Koda!" : "Welcome to Koda!"}
            </Heading>
            <Text mt={4} color={textColor}>
                {getGreetingMessage()}
            </Text>
        </Box>
    );
}

export default WelcomeGreeting;
