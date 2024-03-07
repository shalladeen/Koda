// src/components/pages/Notes/Notes.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import Navbar from '../../nav/Navbar';
import NoteList from '../Notes/NoteList';
import CreateNote from '../Notes/CreateNote';
import NoteDetailPage from '../Notes/NotePage';

const Notes = () => {
  return (
    <Box>
      <Navbar />
      {/* Title and Create Note Button */}
      <Flex alignItems="center" mt={8} mb={4} px={5}>
        <Heading alignItems="center" as="h1" size="xl">Notes</Heading>
        <Spacer /> {/* This pushes the button to the right */}
        <Link to="create">
          <Button colorScheme="teal">Create Note</Button>
        </Link>
      </Flex>

      {/* Notes List */}
      <Box maxWidth="800px" mx="auto" px={5}>
        <Routes>
          <Route index element={<NoteList />} />
          <Route path="create" element={<CreateNote />} />
          <Route path="edit/:noteId" element={<NoteDetailPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Notes;
