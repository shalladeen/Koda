import React, { useState, useEffect } from 'react';
import { Box, Text, Checkbox, Stack, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';

const TodaysEvents = ({ events, onToggleComplete }) => {
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const todayEvents = events.filter(event => moment().isSame(event.start, 'day'));
  const currentDate = moment().format('MMMM Do, YYYY');

  return (
    <Box w="40%" p={4} borderRadius="lg" textAlign="left" bg={useColorModeValue("#f9fdff", "#1c1c1c")}>
      <Text color={textColor} mb={3} fontSize="lg">{currentDate}</Text>
      <Stack spacing={3}>
        {todayEvents.length > 0 ? todayEvents.map(event => (
          <Checkbox 
            key={event.id} 
            isChecked={event.completed} 
            onChange={() => onToggleComplete(event.id)}
            size={'sm'}
            colorScheme="black"
          >
            <Text as={event.completed ? 's' : 'span'} color={textColor}>
              {event.title}
            </Text>
          </Checkbox>
        )) : (
          <Text color={textColor}>No events for today.</Text>
        )}
      </Stack>
    </Box>
  );
};

export default TodaysEvents;
