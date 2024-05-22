import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Select,
} from '@chakra-ui/react';
import { useTaskColors } from './TaskSettings';

const TaskModal = ({
  isOpen, onClose, title, taskTitle, setTaskTitle, taskDesc, setTaskDesc, selectedList, setSelectedList, onSave, lists, onCreateNewList
}) => {
  const { modalTextColor, taskTextColor, buttonColor, hoverColor } = useTaskColors();

  const handleListChange = (e) => {
    if (e.target.value === 'createNew') {
      onCreateNewList();
    } else {
      setSelectedList(e.target.value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color={modalTextColor}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton /> 
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Task Title</FormLabel>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              backgroundColor={hoverColor}
              color={taskTextColor}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Task Description</FormLabel>
            <Input
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              placeholder="Enter task description"
              backgroundColor={hoverColor}
              color={taskTextColor}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Task List</FormLabel>
            <Select
              value={selectedList}
              onChange={handleListChange}
              placeholder="Select list"
              backgroundColor={hoverColor}
              color={taskTextColor}
            >
              {lists.map((list, index) => (
                <option key={index} value={list}>{list}</option>
              ))}
              <option value="createNew">Create new list</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
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