// NoteModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    setEditedNote(note);
  }, [note, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedNote);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editedNote?.id ? 'Edit Note' : 'New Note'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Input name="title" placeholder="Title" value={editedNote?.title || ''} onChange={handleChange} mb={3} />
          <Textarea name="content" placeholder="Content" value={editedNote?.content || ''} onChange={handleChange} mb={3} />
          <Select name="tagColor" value={editedNote?.tagColor || 'gray'} onChange={handleChange}>
            <option value="gray">No Tag</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteModal;
