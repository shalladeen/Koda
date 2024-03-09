import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Recent = () => {
  const [recentNotes, setRecentNotes] = useState([]);
  const navigate = useNavigate();
  const hoverBg = useColorModeValue('blue.50', 'gray.600');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const sortedNotes = storedNotes.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
    setRecentNotes(sortedNotes.slice(0, 5)); // Adjust as needed
  }, []);

  const handleNoteClick = (noteId, noteType) => {
    if (noteType === 'document') {
        navigate("/notepage", { state: { noteId: noteId, type: noteType } });
    } else {
      navigate(`/notes`, { state: { selectedNoteId: noteId } }); 
    }
  };

  return (
    <>
      <Heading size="md" my={4}>Recent Notes</Heading>
      <Flex overflowX="auto" p={4} gap="20px" minW="0">
        {recentNotes.map((note) => (
          <Box
            key={note.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            width="240px"
            bg="gray.50"
            _hover={{ bg: hoverBg, cursor: 'pointer', transform: 'scale(1.05)', transition: 'transform .2s' }}
            onClick={() => handleNoteClick(note.id, note.type)}
          >
            <Text isTruncated fontWeight="bold">{note.title || "Untitled Note"}</Text>
            {note.type === 'document' ? (
              <Text fontSize="sm">Document Note...</Text>
            ) : (
              <Text isTruncated noOfLines={3}>{note.content}</Text>
            )}
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default Recent;
