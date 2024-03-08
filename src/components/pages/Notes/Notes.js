import React, { useState, useEffect } from "react";
import { Flex, Button, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
  ModalBody, ModalFooter, Input, Textarea, Box, Text, Select, Heading, Wrap, Tag, Menu, MenuButton, MenuList, MenuItem, ButtonGroup} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 
import NotePage from "./NotePage";
import Navbar from "../../nav/Navbar";

function Notes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [editNoteId, setEditNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("None");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const handleSaveNote = () => {
    let updatedNotes;
    if (editNoteId) {
      updatedNotes = notes.map(note => note.id === editNoteId ? { ...note, title, content, tag } : note);
    } else {
      const newNote = { id: Date.now(), title, content, tag };
      updatedNotes = [...notes, newNote];
    }
  
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    resetForm(); 
    onClose(); 
  };

  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    onOpen();
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const openModalForNewNote = () => {
    setEditNoteId(null);
    setTitle("");
    setContent("");
    onOpen();
  };

  const handleDocumentNoteClick = () => {
    navigate("/notepage");
  };

  const resetForm = () => {
    setEditNoteId(null);
    setTitle("");
    setContent("");
    setTag("None");
  };

  return (
    <Flex direction="column" align="center" m={4}>
      <Navbar />
      <Heading mb={6}>My Notes</Heading>
      <Menu>
        <MenuButton as={Button} colorScheme="teal" my={4}>
          Create Note
        </MenuButton>
        <MenuList>
          <MenuItem onClick={openModalForNewNote}>Quick Note</MenuItem>
          <MenuItem onClick={handleDocumentNoteClick}>Document Note</MenuItem>
        </MenuList>
      </Menu>
      <Wrap justify="center">
        {notes.map((note) => (
          <Box
            key={note.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            w="300px"
            m="2"
            bg="gray.50"
          >
            <Text fontWeight="bold" mb={2}>
              {note.title}
            </Text>
            <Text mb={2}>{note.content}</Text>
            {note.tag && <Tag colorScheme={getTagColor(note.tag)}>{note.tag}</Tag>}
            <Flex justify="space-between" mt={4}>
              <ButtonGroup>
                <Button size="sm" onClick={() => handleEditNote(note)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteNote(note.id)}>
                  Delete
                </Button>
              </ButtonGroup>
            </Flex>
          </Box>
        ))}
      </Wrap>
      {/* Note Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editNoteId ? "Edit Note" : "New Note"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
              mb={3}
            />
            <Select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="None">None</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Important">Important</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveNote}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

// Helper function to determine the color scheme for tags
function getTagColor(tag) {
  switch (tag) {
    case "Personal":
      return "blue";
    case "Work":
      return "green";
    case "Important":
      return "red";
    default:
      return "gray";
  }
}

export default Notes;