import React, { useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Select,
} from '@chakra-ui/react';
import { useTaskColors } from './TaskSettings';
import './TaskModal.css';

const TaskModal = ({
  isOpen, onClose, title, taskTitle, setTaskTitle, taskDesc, setTaskDesc, selectedList, setSelectedList, onSave, lists, onCreateNewList
}) => {
  const { modalBgColor, modalTextColor, taskTextColor, buttonColor, hoverColor } = useTaskColors();

  useEffect(() => {
    console.log('Selected List:', selectedList); // Log selected list to ensure it's being set
  }, [selectedList]);

  const handleListChange = (e) => {
    if (e.target.value === 'createNew') {
      onCreateNewList();
    } else {
      setSelectedList(lists.find(list => list._id === e.target.value));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={modalBgColor} color={modalTextColor}>
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
              value={selectedList ? selectedList._id : ''}
              onChange={handleListChange}
              placeholder="Select list"
              backgroundColor={hoverColor}
              color={taskTextColor}
              className="custom-select"
            >
              {lists.map((list, index) => (
                <option key={index} value={list._id}>{list.name}</option>
              ))}
              <option value="createNew" className="create-new-option">Create new list</option>
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
