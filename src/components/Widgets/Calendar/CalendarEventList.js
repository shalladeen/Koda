// src/components/Calendar/CalendarEventList.js
import { Box, Text, Flex, IconButton, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import moment from 'moment';

const CalendarEventList = ({ title, events, onAdd, onEdit }) => (
  <Box borderWidth="1px" borderRadius="lg" p={5} mt={4} boxShadow="base">
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontSize="xl" fontWeight="bold">{title}</Text>
      <IconButton aria-label={`Add ${title}`} icon={<AddIcon />} size="sm" onClick={onAdd} />
    </Flex>
    <VStack spacing={4} mt={5} maxHeight="160px" overflow="auto">
      {events.length > 0 ? (
        events.map(event => (
          <Box
            key={event.id}
            p={2}
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            _hover={{ bg: 'gray.100', cursor: 'pointer' }}
            onClick={() => onEdit(event)}
          >
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold">{event.title}</Text>
              <Text fontSize="sm">
                {event.allDay
                  ? 'All day'
                  : `${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}`}
              </Text>
            </Flex>
          </Box>
        ))
      ) : (
        <Text>No events available.</Text>
      )}
    </VStack>
  </Box>
);

export default CalendarEventList;
