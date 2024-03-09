import React, { useState, useEffect } from "react";
import { Flex, Button, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
  ModalBody, ModalFooter, Input, Textarea, Box, Text, Select, Heading, Wrap, Tag, Menu, MenuButton, MenuList, MenuItem, ButtonGroup} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../../nav/Navbar";

function Notes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const navigate = useNavigate();
  const [editNoteId, setEditNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("None");
  const [selectedTag, setSelectedTag] = useState("None"); // State for selected tag filter
  const quickNotes = filteredNotes.filter(note => note.type === "quick"); // Filtered notes based on selected tag
  const documentNotes = filteredNotes.filter(note => note.type === "document");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
    setFilteredNotes(storedNotes); // Initialize filteredNotes with all notes
  }, []);

  useEffect(() => {
    if (selectedTag === "None") {
      setFilteredNotes(notes); // If no tag selected, display all notes
    } else {
      const filtered = notes.filter(note => note.tag === selectedTag);
      setFilteredNotes(filtered); // Filter notes based on selected tag
    }
  }, [selectedTag, notes]);

  const handleSaveNote = () => {
    let updatedNotes;
    const timestamp = Date.now();
  
    if (editNoteId) {
      updatedNotes = notes.map(note =>
        note.id === editNoteId ? { ...note, title, content, tag, type: note.type, updatedAt: timestamp } : note
      );
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        tag,
        type: "quick",
        createdAt: timestamp
      };
      updatedNotes = [...notes, newNote];
    }
  
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    resetForm();
    onClose();
  };

  const handleEditNote = (note) => {
    if (note.type === 'document') {
      navigate("/notepage", { state: { noteId: note.id, type: "document" } });
    } else {
      setEditNoteId(note.id);
      setTitle(note.title);
      setContent(note.content);
      setTag(note.tag);
      onOpen();
    }
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
       {/* End of Note Modal */}

      {/* Dropdown menu for tag filter */}
      <Select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} mb={4}>
        <option value="None">Filter by Tag</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Important">Important</option>
      </Select>

      {/* Display Quick Notes */}
      <Heading size="md" my={4}>Quick Notes</Heading>
      <Flex wrap="wrap" justifyContent="center">
        {quickNotes.map((note) => (
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
              {note.title || "Untitled Note"}
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
      </Flex>

      {/* Display Document Notes */}
      <Heading size="md" my={4}>Document Notes</Heading>
      <Wrap justify="center">
        {documentNotes.map((note) => (
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
              {note.title || "Untitled Note"}
            </Text>
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
