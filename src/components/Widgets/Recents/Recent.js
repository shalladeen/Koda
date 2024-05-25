import React, { useState, useEffect } from 'react';
import {
  Box, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Input, 
  Textarea, Wrap, WrapItem, useColorModeValue
} from '@chakra-ui/react';

const Recent = () => {
  const [recentNotes, setRecentNotes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const hoverBg = useColorModeValue('gray.200', 'gray.500');
  const defaultColor = useColorModeValue('gray.300', 'gray.300');
  const buttonColor = useColorModeValue("black", "white");
  const buttonText = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "black");
  const modalBgColor = useColorModeValue("white", "black");
  const modalTextColor = useColorModeValue("black", "white");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const sortedNotes = storedNotes.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
    setRecentNotes(sortedNotes.slice(0, 6));
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

  const EditNoteModal = ({ note }) => {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');

    useEffect(() => {
      setTitle(note?.title || '');
      setContent(note?.content || '');
    }, [note]);

    return (
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent backgroundColor={modalBgColor} color={modalTextColor}>
          <ModalHeader>Edit Note</ModalHeader>
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
            <Button backgroundColor={buttonColor} color={buttonText} mr={3} onClick={() => handleSaveEditedNote({ title, content })}>
              Save
            </Button>
            <Button colorScheme="red" mr={3} onClick={() => handleDeleteNote(note.id)}>
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
              color={textColor}
              bg={getTagColor(note.tag || "None")}
              boxShadow="md"
              minHeight="150px"
              maxHeight="250px"
              overflowY="auto"
              _hover={{
                bg: note.tag ? hoverBg : getTagColor(note.tag || "None"),
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
      {isEditModalOpen && <EditNoteModal note={editingNote} />}
    </>
  );
};

export default Recent;
