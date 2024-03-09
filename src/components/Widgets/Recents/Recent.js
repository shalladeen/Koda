import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, useColorModeValue, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Input, Textarea } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaStickyNote } from 'react-icons/fa';

const Recent = () => {
  const [recentNotes, setRecentNotes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();
  const hoverBg = useColorModeValue('blue.50', 'gray.600');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const sortedNotes = storedNotes.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
    setRecentNotes(sortedNotes);
  }, []);

  const handleNoteClick = (note) => {
    if (note.type === 'document') {
      navigate("/notepage", { state: { noteId: note.id, type: note.type } });
    } else {
      setEditingNote(note);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEditedNote = (editedFields) => {
    const updatedNotes = recentNotes.map(note => note.id === editingNote.id ? { ...note, ...editedFields } : note);
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
      <Flex overflowX="auto" p={4} minW="0">
        {recentNotes.map((note) => (
          <Box
            key={note.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            width="240px"
            bg="gray.50"
            _hover={{ bg: hoverBg, cursor: 'pointer', transform: 'scale(1.05)', transition: 'transform .2s' }}
            onClick={() => handleNoteClick(note)}
            mr={4}
          >
            <Text isTruncated fontWeight="bold">{note.title || "Untitled Note"}</Text>
            <Flex align="center">
              {note.type === 'document' ? <FaFileAlt size={20} style={{ marginRight: '5px' }} /> : <FaStickyNote size={20} style={{ marginRight: '5px' }} />}
            </Flex>
          </Box>
        ))}
      </Flex>
      {isEditModalOpen && <EditNoteModal />}
    </>
  );
};

export default Recent;
