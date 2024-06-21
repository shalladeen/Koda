import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Text,
} from '@chakra-ui/react';
import { useTaskColors } from './TaskSettings';

const TaskDetailModal = ({
  isOpen, onClose, task, onSave, onDelete,
}) => {
  const { modalBgColor, modalTextColor, taskTextColor, buttonColor, hoverColor } = useTaskColors();
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  useEffect(() => {
    if (task) {
      setTaskTitle(task.name);
      setTaskDesc(task.desc);
    }
  }, [task]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onSave(taskTitle, taskDesc);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task._id);
    onClose();
  };

  if (!task) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={modalBgColor} color={modalTextColor}>
        <ModalHeader>{isEditing ? 'Edit Task' : 'Task Details'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isEditing ? (
            <>
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
            </>
          ) : (
            <>
              <Text><strong>Title:</strong> {task.name}</Text>
              <Text mt={4}><strong>Description:</strong> {task.desc}</Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {isEditing ? (
            <>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleSave}
                backgroundColor={buttonColor}
                _hover={{ backgroundColor: hoverColor }}
              >
                Save
              </Button>
              <Button onClick={handleEditToggle} backgroundColor={hoverColor}>Cancel</Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleEditToggle}
                backgroundColor={buttonColor}
                _hover={{ backgroundColor: hoverColor }}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                mr={3}
                onClick={handleDelete}
                backgroundColor="red.500"
                _hover={{ backgroundColor: "red.600" }}
              >
                Delete
              </Button>
              <Button onClick={onClose} backgroundColor={hoverColor}>Close</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetailModal;
