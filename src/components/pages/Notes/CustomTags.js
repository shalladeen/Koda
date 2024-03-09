import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Flex, Box, Text } from '@chakra-ui/react';

const CustomTagModal = ({ isOpen, onClose, customTags, setCustomTags }) => {
  const [newTagTitle, setNewTagTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const tagColors = ['blue', 'green', 'red', 'gray'];

  const handleAddCustomTag = () => {
    if (!newTagTitle || !selectedColor) {
      alert('Please provide both a title and a color for the custom tag.');
      return;
    }
    const newTag = { title: newTagTitle, color: selectedColor };
    setCustomTags([...customTags, newTag]);
    setNewTagTitle('');
    setSelectedColor('');
    onClose(); // Close the modal after adding the tag
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Custom Tag</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Tag Title" value={newTagTitle} onChange={(e) => setNewTagTitle(e.target.value)} mb={3} />
          <Flex wrap="wrap">
            {tagColors.map((color) => (
              <Box key={color} w="30px" h="30px" bg={color} onClick={() => setSelectedColor(color)} m={1} borderRadius="full" cursor="pointer" />
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddCustomTag}>Add Custom Tag</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomTagModal;
