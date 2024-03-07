// src/components/pages/Notes/NoteList.js
import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch stored notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const bg = useColorModeValue('white', 'gray.700'); // Adjust colors for light/dark mode if using

  return (
    <Flex wrap="wrap" justifyContent="center">
      {notes.map(note => (
        <Link key={note.id} to={`/notes/edit/${note.id}`}>
          <Box p="5" m="2" borderWidth="1px" borderRadius="lg" bg={bg} shadow="md" maxWidth="300px">
            <Text fontWeight="bold">{note.title}</Text>
            <Text noOfLines={1} isTruncated>{note.description || 'No description'}</Text>
          </Box>
        </Link>
      ))}
    </Flex>
  );
};

export default NoteList;
