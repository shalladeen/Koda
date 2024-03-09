// CustomTagModal.js
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Flex, Box, Text, IconButton, Heading } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const CustomTagModal = ({ isOpen, onClose, customTags, setCustomTags, deleteTag }) => {
  const [newTagTitle, setNewTagTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const tagColors = ['#aec6cf', '#77dd77', '#ffd1dc',]; 

  const handleAddCustomTag = () => {
    if (!newTagTitle || !selectedColor) {
      alert('Please provide both a title and a color for the custom tag.');
      return;
    }
    const newTag = { title: newTagTitle, color: selectedColor };
    setCustomTags([...customTags, newTag]);
    setNewTagTitle('');
    setSelectedColor('');
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customize Tags</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Tag Title" value={newTagTitle} onChange={(e) => setNewTagTitle(e.target.value)} mb={3} />
          <Flex wrap="wrap">
            {tagColors.map((color, index) => (
              <Box key={index} w="30px" h="30px" bg={color} onClick={() => setSelectedColor(color)} m={1} borderRadius="full" cursor="pointer" />
            ))}
          </Flex>
          {/* List existing tags with a delete option */}
         <ModalHeader>Your Tags:</ModalHeader>
          {customTags.map((tag, index) => (
            <Flex key={index} align="center" justify="space-between" mt={2}>
              <Text>{tag.title}</Text>
              <IconButton aria-label="Delete tag" icon={<CloseIcon />} onClick={() => deleteTag(index)} size="sm" />
            </Flex>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddCustomTag}>Add Tag</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomTagModal;
