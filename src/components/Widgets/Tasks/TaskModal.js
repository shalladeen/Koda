// src/components/Task/TaskModal.js
import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button,
} from '@chakra-ui/react';
import { useTaskColors } from './TaskSettings';

const TaskModal = ({
  isOpen, onClose, onSave, title, taskTitle, setTaskTitle,
  taskDesc, setTaskDesc, selectedList, setSelectedList,
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
            <FormLabel>Title</FormLabel>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              backgroundColor={primaryColor}
              color={taskTextColor}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>List</FormLabel>
            <Input
              value={selectedList || ''}
              onChange={(e) => setSelectedList(e.target.value)}
              placeholder="Enter list name or leave empty"
              backgroundColor={primaryColor}
              color={taskTextColor}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              placeholder="Enter task description"
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

export default TaskModal;
