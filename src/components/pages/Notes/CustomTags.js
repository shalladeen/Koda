import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Flex, Box, Text, IconButton, Heading, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const CustomTagModal = ({ isOpen, onClose, customTags, setCustomTags, deleteTag }) => {
  const [newTagTitle, setNewTagTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const tagColors = ['#aec6cf', '#77dd77', '#ffd1dc', '#fdfd96', '#ffb6c1', '#c1c1c1'];

  const modalBgColor = useColorModeValue("white", "gray.800");
  const modalTextColor = useColorModeValue("black", "white");
  const inputBgColor = useColorModeValue("gray.100", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "gray.300");
  const buttonColor = useColorModeValue("black", "white");
  const buttonText = useColorModeValue("white", "black");

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
      <ModalContent bg={modalBgColor} color={modalTextColor}>
        <ModalHeader>Customize Tags</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            placeholder="Tag Title" 
            value={newTagTitle} 
            onChange={(e) => setNewTagTitle(e.target.value)} 
            mb={3}
            bg={inputBgColor}
            _placeholder={{ color: placeholderColor }}
          />
          <Flex wrap="wrap">
            {tagColors.map((color, index) => (
              <Box
                key={index}
                w="30px"
                h="30px"
                bg={color}
                m={1}
                borderRadius="full"
                cursor="pointer"
                onClick={() => setSelectedColor(color)}
                border={selectedColor === color ? "3px solid black" : "none"}
              />
            ))}
          </Flex>
          <Heading size="sm" mt={4} mb={2}>Your Tags:</Heading>
          {customTags.map((tag, index) => (
            <Flex key={index} align="center" justify="space-between" mt={2}>
              <Box display="flex" alignItems="center" _hover={{ bg: "gray.200" }}>
                <Box w="15px" h="15px" bg={tag.color} mr={2} borderRadius="full" />
                <Text>{tag.title}</Text>
              </Box>
              <IconButton aria-label="Delete tag" icon={<CloseIcon />} onClick={() => deleteTag(index)} size="sm" />
            </Flex>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button backgroundColor={buttonColor} color={buttonText} mr={3} onClick={handleAddCustomTag}>Add Tag</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomTagModal;
