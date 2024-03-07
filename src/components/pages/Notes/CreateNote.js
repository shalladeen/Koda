// CreateNote.js
import React, { useState } from 'react';
import { Box, Input, Textarea, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../nav/Navbar';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title,
      description,
      content: '',
    };
    
    localStorage.setItem("newNote", JSON.stringify(newNote));
    navigate(`/notes/edit/new`);
  };

  return (
    <Flex direction="column" align="center" p={5}>
      <Navbar />
      <Box p={5} w="80%" maxW="500px">
        <Input 
          placeholder="Note Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={3}
        />
        <Textarea 
          placeholder="Short Description (Optional)" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb={3}
        />
        <Button colorScheme="blue" onClick={handleCreateNote}>
          Create Note
        </Button>
      </Box>
    </Flex>
  );
}

export default CreateNote;
