import React, { useMemo } from 'react';
import {
  Box, Text, Button, HStack, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, Stack, ModalFooter, useColorMode
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import moment from 'moment';

const TodaysEvents = ({ events }) => {
  const { colorMode } = useColorMode();
  const textClass = colorMode === 'light' ? 'text-light' : 'text-dark';
  const bgClass = colorMode === 'light' ? 'bg-light' : 'bg-dark';

  const todayEvents = useMemo(() => {
    return events.filter(event => {
      const start = moment(event.start).startOf('day');
      const end = moment(event.end).endOf('day');
      return moment().isBetween(start, end, null, '[]');
    });
  }, [events]);

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
      <Box className={`todays-events-container ${bgClass}`} textAlign="left" mt={5}>
        <HStack justify="space-between">
          <Text fontSize="lg" className={textClass} fontWeight="bold">
            Today's Events
          </Text>
          <Button size="sm" onClick={onOpen}>
            View All
          </Button>
        </HStack>
        <Stack mt={2}>
          {todayEvents.length > 0 ? todayEvents.map(event => (
            <Box key={event.id} className={`event-item ${bgClass}`}>
              <Text fontWeight="bold" className={textClass}>{event.title}</Text>
              <Text className={textClass}>
                {formatEventDate(event)}
              </Text>
            </Box>
          )) : (
            <Text className={textClass}>No events for today.</Text>
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
                <Box key={event.id} className={`event-item ${bgClass}`}>
                  <Text fontWeight="bold" className={textClass}>{event.title}</Text>
                  <Text className={textClass}>
                    {formatEventDate(event)}
                  </Text>
                </Box>
              )) : (
                <Text className={textClass}>No events for today.</Text>
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
