import React from 'react';
import { Box, Text, Button, useColorModeValue, HStack, Modal, 
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, ModalFooter } from '@chakra-ui/react';
import { useDisclosure} from '@chakra-ui/hooks';
import moment from 'moment';

const TodaysEvents = ({ events }) => {
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const bgColor = useColorModeValue('#f0f0f0', 'gray.700');
  const todayEvents = events.filter(event => moment().isSame(event.start, 'day'));
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Box key={event.id} p={2} borderRadius="md" bg={('white', 'gray.600')}>
              <Text fontWeight="bold" color={textColor}>{event.title}</Text>
              <Text color={textColor}>
                {event.allDay ? 'All Day' : `${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}`}
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
                <Box key={event.id} p={2} borderRadius="md" bg={('white', 'gray.600')}>
                  <Text fontWeight="bold" color={textColor}>{event.title}</Text>
                  <Text color={textColor}>
                    {event.allDay ? 'All Day' : `${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}`}
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
