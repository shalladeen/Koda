import React from 'react';
import { Checkbox, useDisclosure } from '@chakra-ui/react';
import { Box, Text, Button, useColorModeValue, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, ModalFooter } from '@chakra-ui/react';
import moment from 'moment';

const TodaysEvents = ({ events, onToggleComplete }) => {
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const todayEvents = events.filter(event => moment().isSame(event.start, 'day'));
  const currentDate = moment().format('MMMM Do, YYYY');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box borderRadius="lg" textAlign="left" bg={useColorModeValue("#f9fdff", "#1c1c1c")}>
        <HStack>
          <Text fontSize="sm" color={textColor}>
          {todayEvents.length > 0 ? `You have ${todayEvents.length} ${todayEvents.length === 1 ? 'event' : 'events'} today.` : 'There are no events today.'}
          </Text>
          {todayEvents.length > 0 && (
            <Button size="sm" ml={4} onClick={onOpen}>
              View Events
            </Button>
          )}
        </HStack>
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
