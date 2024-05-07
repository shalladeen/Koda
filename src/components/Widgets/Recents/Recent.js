import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Input, Textarea, Wrap, WrapItem, Circle, useColorModeValue
} from '@chakra-ui/react';

const Recent = () => {
  const [recentNotes, setRecentNotes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const hoverBg = useColorModeValue('blue.50', 'gray.600');
  const defaultColor = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const sortedNotes = storedNotes.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
    setRecentNotes(sortedNotes.slice(0, 5));
  }, []);

  const handleNoteClick = (note) => {
    setEditingNote(note);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedNote = (editedFields) => {
    const updatedNotes = recentNotes.map(note => note.id === editingNote.id ? { ...note, ...editedFields, updatedAt: Date.now() } : note);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setRecentNotes(updatedNotes);
    setIsEditModalOpen(false);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = recentNotes.filter(note => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setRecentNotes(updatedNotes);
    setIsEditModalOpen(false);
  };

  const getTagColor = (tagTitle) => {
    const customTags = JSON.parse(localStorage.getItem('customTags')) || [];
    if (tagTitle === "None") return defaultColor;
    return customTags.find(tag => tag.title === tagTitle)?.color || defaultColor;
  };

  const EditNoteModal = () => {
    const [title, setTitle] = useState(editingNote?.title || '');
    const [content, setContent] = useState(editingNote?.content || '');

    useEffect(() => {
      setTitle(editingNote?.title || '');
      setContent(editingNote?.content || '');
    }, [editingNote]);

    return (
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Quick Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb={3}
            />
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalBody>
          <ModalBody>
            <Button colorScheme="blue" mr={3} onClick={() => handleSaveEditedNote({ title, content })}>
              Save
            </Button>
            <Button colorScheme="red" mr={3} onClick={() => handleDeleteNote(editingNote.id)}>
              Delete
            </Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <Heading size="lg" my={2}>Recent Notes</Heading>
      <Wrap spacing="20px" p={4} minW="0">
        {recentNotes.map((note) => (
          <WrapItem key={note.id}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              width={{ base: "180px", sm: "240px" }}
              bg={getTagColor(note.tag || "None")}
              boxShadow="md"
              minHeight="150px"
              maxHeight="250px"
              overflowY="auto"
              _hover={{
                bg: hoverBg,
                cursor: 'pointer',
                transform: 'scale(1.05)',
                transition: 'transform .2s'
              }}
              onClick={() => handleNoteClick(note)}
            >
              <Text fontWeight="bold" mb={2}>{note.title || "Untitled Note"}</Text>
              <Text mb={2} noOfLines={4}>{note.content}</Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
      {isEditModalOpen && <EditNoteModal />}
    </>
  );
};

export default Recent;
