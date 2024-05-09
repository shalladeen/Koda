// src/components/Task/TaskListModal.js
import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button,
} from '@chakra-ui/react';
import { useTaskColors } from './TaskSettings';

const TaskListModal = ({
  isOpen, onClose, title, listName, setListName, onSave,
}) => {
  const { modalTextColor, primaryColor, taskTextColor, buttonColor, hoverColor } = useTaskColors();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color={modalTextColor}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>List Name</FormLabel>
            <Input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
              backgroundColor={primaryColor}
              color={taskTextColor}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            type="button"
            onClick={onSave}
            backgroundColor={buttonColor}
            _hover={{ backgroundColor: hoverColor }}
          >
            Save
          </Button>
          <Button onClick={onClose} backgroundColor={hoverColor}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskListModal;
