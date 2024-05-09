// src/components/Calendar/CalendarEventModal.js
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, FormControl, FormLabel, Input,
    Checkbox, Button, Flex,
  } from '@chakra-ui/react';
  
  const CalendarEventModal = ({
    isOpen, onClose, title, eventTitle, setEventTitle,
    allDay, setAllDay, startTime, setStartTime, endTime, setEndTime,
    onSave, onDelete, isEditing,
  }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="xl">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Event Title</FormLabel>
            <Input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Enter event title" />
          </FormControl>
          <Checkbox isChecked={allDay} onChange={(e) => setAllDay(e.target.checked)} mt={4}>All Day Event</Checkbox>
          {!allDay && (
            <Flex mt={4}>
              <FormControl isRequired flex="1" mr={2}>
                <FormLabel>Start Time</FormLabel>
                <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel>End Time</FormLabel>
                <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </FormControl>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>Save</Button>
          {isEditing && <Button colorScheme="red" onClick={onDelete}>Delete</Button>}
          <Button color="white" bg="gray" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  
  export default CalendarEventModal;
  