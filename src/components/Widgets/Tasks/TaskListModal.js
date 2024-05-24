import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Box, Text, IconButton, Flex, useToast
} from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useTaskColors } from './TaskSettings';

const TaskListModal = ({
  isOpen, onClose, title, listName, setListName, onSave, onDelete, lists, onEditList
}) => {
  const { modalBgColor, modalTextColor, taskTextColor, buttonColor, hoverColor } = useTaskColors();
  const toast = useToast();

  const handleSave = () => {
    if (!listName.trim()) {
      toast({
        title: "List name is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log('Saving list:', listName);
    onSave();
    onClose();
  };

  const handleDelete = (list, e) => {
    e.stopPropagation();
    console.log('Deleting list:', list);
    onDelete(list);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={modalBgColor} color={modalTextColor}>
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
            <Text fontWeight="bold">{title === 'Edit List' ? 'Delete Existing Lists:' : 'Existing Lists:'}</Text>
            {lists.map((list, index) => (
              <Flex
                key={index}
                alignItems="center"
                mt={2}
                borderRadius="md"
              >
                <Box
                  flex="1"
                  _hover={{ backgroundColor: hoverColor, cursor: 'pointer' }}
                  p={2}
                  borderRadius="md"
                  onClick={() => setListName(list)}
                >
                  <Text color={taskTextColor}>{list}</Text>
                </Box>
                {title === 'Add List' && (
                  <IconButton
                    icon={<MdEdit />}
                    size="sm"
                    mr={2}
                    onClick={(e) => { e.stopPropagation(); onEditList(list); }}
                    backgroundColor={buttonColor}
                    _hover={{ backgroundColor: hoverColor }}
                  />
                )}
                {title === 'Edit List' && (
                  <IconButton
                    icon={<MdDelete />}
                    size="sm"
                    onClick={(e) => handleDelete(list, e)}
                    backgroundColor="red.500"
                    _hover={{ backgroundColor: "red.600" }}
                  />
                )}
              </Flex>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSave}
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
