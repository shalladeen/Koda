import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaStickyNote } from 'react-icons/fa';

const Recent = () => {
  const [recentNotes, setRecentNotes] = useState([]);
  const navigate = useNavigate();
  const hoverBg = useColorModeValue('blue.50', 'gray.600');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const sortedNotes = storedNotes.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
    setRecentNotes(sortedNotes); // Remove slicing to show all notes
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
      <Heading size="lg" my={2}>Recent Notes</Heading>
      <Flex overflowX="auto" p={4} minW="0"> {/* Set minimum width to allow overflow */}
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
            mr={4} 
          >
            
            <Text isTruncated fontWeight="bold">{note.title || "Untitled Note"}</Text>
            {note.type === 'document' ? (
              <Flex align="center">
                <FaFileAlt size={20} style={{ marginRight: '5px' }} />
                
              </Flex>
            ) : (
              <Flex align="center">
                <FaStickyNote size={20} style={{ marginRight: '5px' }} />
                
              </Flex>
            )}
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default Recent;
