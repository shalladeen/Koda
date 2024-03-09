import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Input,
  Textarea,
  Box,
  Text,
  Select,
  Heading,
  Wrap,
  Tag,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ButtonGroup, // Make sure ButtonGroup is imported
  Menu, // Import Menu components
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'; // For the menu button icon
import { useNavigate } from "react-router-dom";
import Navbar from "../../nav/Navbar";
import CustomTagModal from "./CustomTags"; // Adjust the import path as needed

function Notes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [customTags, setCustomTags] = useState(() => JSON.parse(localStorage.getItem("customTags")) || []);
  const [editNoteId, setEditNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("None");
  const navigate = useNavigate();

  const {
    isOpen: isCustomTagModalOpen,
    onOpen: onCustomTagModalOpen,
    onClose: onCustomTagModalClose,
  } = useDisclosure();

  useEffect(() => {
    localStorage.setItem("customTags", JSON.stringify(customTags));
  }, [customTags]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    const updatedNote = {
      id: editNoteId ? editNoteId : Date.now(),
      title,
      content,
      tag,
      type: editNoteId ? notes.find(note => note.id === editNoteId).type : 'quick', // Default to 'quick' if new
    };
  
    const updatedNotes = editNoteId ? notes.map(note => note.id === editNoteId ? updatedNote : note) : [...notes, updatedNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  
    // Reset form and close modal
    resetForm();
    onClose();
  };

  const handleEditNote = (note) => {
    if (note.type === 'document') {
      navigate("/notepage", { state: { noteId: note.id, type: note.type } });
    } else {
      // It's a quick note, show the modal for editing
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


  
  const resetForm = () => {
    setEditNoteId(null);
    setTitle("");
    setContent("");
    setTag("None");
  };

  function getTagColor(tagTitle) {
    const predefinedColors = {
      "Personal": "blue",
      "Work": "green",
      "Important": "red",
    };
    const customTagColor = customTags.find(tag => tag.title === tagTitle)?.color;
    return predefinedColors[tagTitle] || customTagColor || "gray";
  }

  const handleSelectTag = (value) => {
    if (value === "addCustom") {
      onCustomTagModalOpen();
    } else {
      setTag(value);
    }
  };

  return (
    <Flex direction="column" align="center" m={4}>
      <Navbar />
      <Heading mb={6}>My Notes</Heading>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="teal" my={4}>
          Create Note
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Quick Note</MenuItem>
          <MenuItem onClick={() => navigate("/Notepage")}>Document Note</MenuItem>
        </MenuList>
      </Menu>

      {/* Note Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editNoteId ? "Edit Note" : "New Note"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={3} />
            <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <Select placeholder="Select tag" value={tag} onChange={(e) => handleSelectTag(e.target.value)} mt={3}>
              <option value="None">None</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Important">Important</option>
              {customTags.map((customTag, index) => (
                <option key={index} value={customTag.title}>{customTag.title}</option>
              ))}
              <option value="addCustom">+ Add Custom Tag</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveNote}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Custom Tag Modal */}
      <CustomTagModal
        isOpen={isCustomTagModalOpen}
        onClose={onCustomTagModalClose}
        customTags={customTags}
        setCustomTags={setCustomTags}
      />

{/*QUICK NOTES */}
<Heading size="md" my={4}>Quick Notes</Heading>
<Flex wrap="wrap" justifyContent="center">
  {notes.filter(note => note.type === "quick").map((note) => (
    <Box
      key={note.id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      w="300px"
      m="2"
      bg={getTagColor(note.tag)}
    >
      <Text fontWeight="bold" mb={2}>{note.title || "Untitled Note"}</Text>
      <Text mb={2}>{note.content}</Text>
      <Flex justify="space-between" mt={4}>
        <ButtonGroup isAttached variant="outline">
          <Button size="sm" onClick={() => handleEditNote(note)}>Edit</Button>
          <Button size="sm" colorScheme="red" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
        </ButtonGroup>
      </Flex>
    </Box>
  ))}
</Flex>

{/*DOCUMENT NOTES */}
<Heading size="md" my={4}>Document Notes</Heading>
<Flex wrap="wrap" justifyContent="center">
  {notes.filter(note => note.type === "document").map((note) => (
    <Box
      key={note.id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      w="300px"
      m="2"
      bg={getTagColor(note.tag)}
    >
      <Text fontWeight="bold" mb={2}>{note.title || "Untitled Document"}</Text>
    
      <Text mb={2}>{note.content}</Text>
      <Flex justify="space-between" mt={4}>
        <ButtonGroup isAttached variant="outline">
          <Button size="sm" onClick={() => handleEditNote(note)}>Edit</Button>
          <Button size="sm" colorScheme="red" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
        </ButtonGroup>
      </Flex>
    </Box>
  ))}
</Flex>
    </Flex>
  );
}

export default Notes;
