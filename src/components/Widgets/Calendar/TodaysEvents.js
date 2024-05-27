import React from 'react';
import { Checkbox, useDisclosure } from '@chakra-ui/react';
import { Box, Text, Button, useColorModeValue, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, ModalFooter } from '@chakra-ui/react';
import moment from 'moment';

const TodaysEvents = ({ events, onToggleComplete }) => {
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
            <Checkbox 
              key={event.id} 
              isChecked={event.completed} 
              onChange={() => onToggleComplete(event.id)}
              size={'sm'}
              colorScheme="blue"
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Today's Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              {todayEvents.length > 0 ? todayEvents.map(event => (
                <Checkbox 
                  key={event.id} 
                  isChecked={event.completed} 
                  onChange={() => onToggleComplete(event.id)}
                  size={'sm'}
                  colorScheme="blue"
                >
                  <Text as={event.completed ? 's' : 'span'} color={textColor}>
                    {event.title}
                  </Text>
                </Checkbox>
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
