import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Flex } from '@chakra-ui/react';

const NoteFolder = ({ isOpen, onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [folderTag, setFolderTag] = useState('');

  const handleCreateFolder = () => {
    // Handle logic to create folder and associate with user
    console.log('Creating folder:', { folderName, folderTag });
    // Close modal after creating folder
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Folder</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Folder Name" value={folderName} onChange={(e) => setFolderName(e.target.value)} mb={4} />
          <Input placeholder="Folder Tag" value={folderTag} onChange={(e) => setFolderTag(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateFolder}>
            Create Folder
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NoteFolder;
