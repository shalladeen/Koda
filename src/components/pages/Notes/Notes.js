import React, { useState, useEffect } from "react";
import {
  Flex, Button, Input, Textarea, Box, Text, Heading, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ButtonGroup, Menu, HStack,
  MenuButton, MenuList, MenuItem, Circle
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import Navbar from "../../nav/Navbar";
import CustomTagModal from "./CustomTags";

function Notes() {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const {
    isOpen: isCustomTagModalOpen,
    onOpen: onCustomTagModalOpen,
    onClose: onCustomTagModalClose
  } = useDisclosure(); 
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes") || "[]"));
  const [customTags, setCustomTags] = useState(() => JSON.parse(localStorage.getItem("customTags") || "[]"));
  const [editNoteId, setEditNoteId] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("None");

  useEffect(() => {
    setFilteredNotes(notes); 
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("customTags", JSON.stringify(customTags));
  }, [notes, customTags]);

  useEffect(() => {
    localStorage.setItem("customTags", JSON.stringify(customTags));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [customTags, notes]);

  const handleSaveNote = () => {
    const timestamp = Date.now();
    let updatedNotes;
    if (editNoteId) {
      updatedNotes = notes.map(note =>
        note.id === editNoteId ? { ...note, title, content, tag, updatedAt: timestamp } : note
      );
    } else {
      const newNote = {
        id: timestamp,
        title,
        content,
        tag,
        type: "quick",
        createdAt: timestamp
      };
      updatedNotes = [...notes, newNote];
    }
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    resetForm();
    onClose();
  };

  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setTag(note.tag);
    onOpen();
  };


  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteTag = (indexToRemove) => {
    const tagToDelete = customTags[indexToRemove];
    const updatedTags = customTags.filter((_, index) => index !== indexToRemove);
    setCustomTags(updatedTags);
  }

  const openModalForNewNote = () => {
    setEditNoteId(null);
    setTitle("");
    setContent("");
    setTag("None");
    onOpen();
  };

  const resetForm = () => {
    setEditNoteId(null);
    setTitle("");
    setContent("");
    setTag("None");
  };

  const handleTagFilterChange = (selectedTag) => {
    setTag(selectedTag);
    if (selectedTag === "None") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(note => note.tag === selectedTag);
      setFilteredNotes(filtered);
    }
  };

  const getTagColor = (tagTitle) => {
    if (tagTitle === "None") return "gray";
    return customTags.find(tag => tag.title === tagTitle)?.color || "gray";
  };

  return (
    <Flex height="100vh">
      <Navbar />
      <Flex direction="column" m={5}>
        <Heading mb={6}>My Notes</Heading>
        <Box>
          <HStack >
        <Button colorScheme="blue" my={4} onClick={openModalForNewNote} mr={6}>New Note</Button>

        {/* Note Listing and Filtering */}
        <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>{tag === "None" ? "Filter by Tag" : tag}</MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleTagFilterChange("None")}>All Notes</MenuItem>
            {customTags.map((tag) => (
              <MenuItem key={tag.title} onClick={() => handleTagFilterChange(tag.title)}>{tag.title}</MenuItem>
            ))}
          </MenuList>
        </Menu>
        </HStack>
        </Box>
        <Flex wrap="wrap" justifyContent="center">
          {filteredNotes.map((note) => (
            <Box key={note.id} p={4} borderWidth="1px" borderRadius="lg" w="300px" m={2}
            backgroundColor={getTagColor(note.tag)} boxShadow="md" h="250px">
              <Text fontWeight="bold" mb={2}>{note.title}</Text>
              <Text mb={2}>{note.content}</Text>
              <Flex justify="space-between">
                <ButtonGroup isAttached variant="outline" position="fixed" h="300px">
                  <Button size="sm" onClick={() => handleEditNote(note)} >Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
                </ButtonGroup>
               
              </Flex>
            </Box>
          ))}
          </Flex>

        {/* Note Modal */}
     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editNoteId ? "Edit Note" : "New Note"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={3} />
            <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} mb={3} />
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Select Tag</MenuButton>
                <HStack>
                    <Text p={5}>{tag === "None" ? "No Tag" : tag}</Text>
                      {tag !== "None" && (
                        <Circle size="15px" bg={getTagColor(tag)} />
                      )}
                  </HStack>
              <MenuList>
                <MenuItem onClick={() => setTag("None")}>
                  <HStack>
                    <Text>None</Text>
                  </HStack>
                </MenuItem>
                {customTags.map((customTag, index) => (
                  <MenuItem key={index} onClick={() => setTag(customTag.title)}>
                    <HStack>
                      <Text>{customTag.title}</Text>
                      <Circle size="15px" bg={customTag.color} />
                    </HStack>
                  </MenuItem>
                ))}
                <MenuItem onClick={onCustomTagModalOpen}>+ Customize Tags</MenuItem>
              </MenuList>
            </Menu>
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
        deleteTag={deleteTag}
      />

        
      </Flex>
    </Flex>
  );
}

export default Notes;
