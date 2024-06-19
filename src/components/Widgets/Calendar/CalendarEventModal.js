import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input,
  Checkbox, Button, Flex, useColorModeValue,
} from '@chakra-ui/react';

const CalendarEventModal = ({
  isOpen, onClose, title, eventTitle, setEventTitle,
  allDay, setAllDay, startDate, setStartDate, endDate, setEndDate,
  startTime, setStartTime, endTime, setEndTime,
  onSave, onDelete, isEditing,
}) => {
  const [isEndTimeManuallySet, setIsEndTimeManuallySet] = useState(false);

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'gray.100');
  const saveBg = useColorModeValue('black', 'white');
  const saveColor = useColorModeValue('white', 'black');
  const placeholderColor = useColorModeValue('#a0a0a0', '#606060');

  useEffect(() => {
    if (allDay) {
      setStartTime('00:00');
      setEndTime('23:59');
      setIsEndTimeManuallySet(true); // Set manually to avoid auto-adjustment
    }
  }, [allDay]);

  useEffect(() => {
    if (!isEndTimeManuallySet) {
      const startDateTime = new Date(`1970-01-01T${startTime}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
      const endHours = String(endDateTime.getHours()).padStart(2, '0');
      const endMinutes = String(endDateTime.getMinutes()).padStart(2, '0');
      setEndTime(`${endHours}:${endMinutes}`);
    }
  }, [startTime, isEndTimeManuallySet]);

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setIsEndTimeManuallySet(false);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    setIsEndTimeManuallySet(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="xl" bg={bg} color={textColor}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Event Title</FormLabel>
            <Input
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>
          <Checkbox isChecked={allDay} onChange={(e) => setAllDay(e.target.checked)} mt={4}>
            All Day Event
          </Checkbox>
          <Flex mt={4}>
            <FormControl isRequired flex="1" mr={2}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                disabled={allDay}
              />
            </FormControl>
            <FormControl isRequired flex="1">
              <FormLabel>End Time</FormLabel>
              <Input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                disabled={allDay}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button backgroundColor={saveBg} color={saveColor} mr={3} onClick={onSave}>Save</Button>
          {isEditing && <Button colorScheme="red" onClick={onDelete}>Delete</Button>}
          <Button color="white" bg="gray" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CalendarEventModal;
