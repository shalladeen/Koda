import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Box, Text, IconButton, Flex
} from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useTaskColors } from './TaskSettings';

const TaskListModal = ({
  isOpen, onClose, title, listName, setListName, onSave, onDelete, lists, onEditList
}) => {
  const { modalTextColor, buttonColor, hoverColor, taskTextColor } = useTaskColors();

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
              backgroundColor={hoverColor}
              color={taskTextColor}
            />
          </FormControl>
          <Box mt={4}>
            <Text fontWeight="bold">Existing Lists:</Text>
            {lists.map((list, index) => (
              <Flex key={index} alignItems="center" mt={2}>
                <Text flex="1" color={taskTextColor}>{list}</Text>
                <IconButton
                  icon={<MdEdit />}
                  size="sm"
                  mr={2}
                  onClick={() => onEditList(list)}
                  backgroundColor={buttonColor}
                  _hover={{ backgroundColor: hoverColor }}
                />
                <IconButton
                  icon={<MdDelete />}
                  size="sm"
                  onClick={() => onDelete(list)}
                  backgroundColor="red.500"
                  _hover={{ backgroundColor: "red.600" }}
                />
              </Flex>
            ))}
          </Box>
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

export default TaskListModal;
