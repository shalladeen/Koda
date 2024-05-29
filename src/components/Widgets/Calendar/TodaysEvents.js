import React from 'react';
import { Box, Text, Button, useColorModeValue, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, ModalFooter } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import moment from 'moment';

const TodaysEvents = ({ events }) => {
  const textColor = useColorModeValue('black', 'gray.100');
  const bgColor = useColorModeValue('#f0f0f0', 'gray.700');
  const todayEvents = events.filter(event => {
    const start = moment(event.start).startOf('day');
    const end = moment(event.end).endOf('day');
    return moment().isBetween(start, end, null, '[]');
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatEventDate = (event) => {
    if (event.allDay) {
      if (moment(event.start).isSame(moment(event.end), 'day')) {
        return 'All Day';
      }
      return `${moment(event.start).format('MMM DD')} - ${moment(event.end).subtract(1, 'days').format('MMM DD')}`;
    }
    if (moment(event.start).isSame(moment(event.end), 'day')) {
      return `${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}`;
    }
    return `${moment(event.start).format('MMM DD, h:mm A')} - ${moment(event.end).format('MMM DD, h:mm A')}`;
  };

  return (
    <>
      <Box borderRadius="lg" textAlign="left" bg={bgColor} p={4}>
        <HStack justify="space-between">
          <Text fontSize="lg" color={textColor}>
            Today's Events
          </Text>
          <Button size="sm" onClick={onOpen}>
            View All
          </Button>
        </HStack>
        <Stack mt={2}>
          {todayEvents.length > 0 ? todayEvents.map(event => (
            <Box key={event.id} p={2} borderRadius="md" bg={bgColor}>
              <Text fontWeight="bold" color={textColor}>{event.title}</Text>
              <Text color={textColor}>
                {formatEventDate(event)}
              </Text>
            </Box>
          )) : (
            <Text color={textColor}>No events for today.</Text>
          )}
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Today's Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              {todayEvents.length > 0 ? todayEvents.map(event => (
                <Box key={event.id} p={2} borderRadius="md" bg={bgColor}>
                  <Text fontWeight="bold" color={textColor}>{event.title}</Text>
                  <Text color={textColor}>
                    {formatEventDate(event)}
                  </Text>
                </Box>
              )) : (
                <Text color={textColor}>No events for today.</Text>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodaysEvents;
