// NoteDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Textarea, Button, Flex } from '@chakra-ui/react';
import Navbar from '../../nav/Navbar';

function NoteDetailPage({ setNotes }) {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId === 'new') {
      setNote({ title: '', description: '', content: '' });
    } else {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const existingNote = storedNotes.find(n => n.id.toString() === noteId);
      if (existingNote) {
        setNote(existingNote);
      }
    }
  }, [noteId]);
  

  // NoteDetailPage.js adjustment for handling note saving
const handleSave = () => {
    let storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    if (noteId === 'new') {
      // For a new note, assign an ID now
      const newNoteWithId = { ...note, id: Date.now() };
      storedNotes.push(newNoteWithId);
    } else {
      // For existing notes, find and update the note
      storedNotes = storedNotes.map(n => n.id.toString() === noteId ? { ...note } : n);
    }
    localStorage.setItem("notes", JSON.stringify(storedNotes));
    navigate("/notes"); // Navigate back to the notes listing page
  };
  

  if (!note) return <div>Loading...</div>;

  return (
    <Flex direction="column" align="center">
      <Navbar />
      <Box p={5} w="80%" maxW="800px">
        <Textarea
          placeholder="Write your note here..."
          value={note.content || ''}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          minHeight="400px"
        />
        <Button colorScheme="blue" mt={4} onClick={handleSave}>
          Save Note
        </Button>
      </Box>
    </Flex>
  );
}

export default NoteDetailPage;
