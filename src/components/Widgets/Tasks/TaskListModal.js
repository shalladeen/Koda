import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Box, Text, IconButton, Flex, useToast
} from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useTaskColors } from './TaskSettings';

const TaskListModal = ({
  isOpen, onClose, title, listName, setListName, onSave, onDelete, lists, onEditList, onSelectList
}) => {
  const { modalTextColor, buttonColor, hoverColor, taskTextColor } = useTaskColors();
  const toast = useToast();

  const handleSave = () => {
    if (title === 'Select List') {
      if (listName) {
        console.log('Selected list:', listName);
        onSelectList(listName);
        onClose();
      } else {
        toast({
          title: "Please select a list.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
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
    }
  };

  const handleDelete = (list) => {
    console.log('Deleting list:', list);
    onDelete(list);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color={modalTextColor}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {title === 'Select List' ? (
            <Box mt={4}>
              <Text fontWeight="bold">Existing Lists:</Text>
              {lists.map((list, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  mt={2}
                  _hover={{ backgroundColor: hoverColor, cursor: 'pointer' }}
                  onClick={() => { setListName(list); }}
                >
                  <Text flex="1" color={taskTextColor}>{list}</Text>
                </Flex>
              ))}
            </Box>
          ) : (
            <>
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
                  <Flex
                    key={index}
                    alignItems="center"
                    mt={2}
                    _hover={{ backgroundColor: hoverColor, cursor: 'pointer' }}
                    onClick={() => setListName(list)}
                  >
                    <Text flex="1" color={taskTextColor}>{list}</Text>
                    <IconButton
                      icon={<MdEdit />}
                      size="sm"
                      mr={2}
                      onClick={(e) => { e.stopPropagation(); onEditList(list); }}
                      backgroundColor={buttonColor}
                      _hover={{ backgroundColor: hoverColor }}
                    />
                    <IconButton
                      icon={<MdDelete />}
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleDelete(list); }}
                      backgroundColor="red.500"
                      _hover={{ backgroundColor: "red.600" }}
                    />
                  </Flex>
                ))}
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {title !== 'Select List' && (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSave}
              backgroundColor={buttonColor}
              _hover={{ backgroundColor: hoverColor }}
            >
              Save
            </Button>
          )}
          <Button onClick={onClose} backgroundColor={hoverColor}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskListModal;
