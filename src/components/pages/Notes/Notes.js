import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex, Button, Input, Textarea, Box, Text, Heading, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ButtonGroup, Menu, HStack,
  MenuButton, MenuList, MenuItem, Circle, useColorModeValue
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import Navbar from "../../nav/Navbar";
import CustomTagModal from "./CustomTags";
import { useAuth } from "../../context/AuthContext";

// Define default tags with pastel colors
const defaultTags = [
  { title: "Work", color: "#aec6cf" },  // Pastel blue
  { title: "Personal", color: "#ccd5ae" },  // Pastel gray
  { title: "School", color: "#77dd77" }   // Pastel green
];

function Notes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCustomTagModalOpen,
    onOpen: onCustomTagModalOpen,
    onClose: onCustomTagModalClose
  } = useDisclosure();
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes") || "[]"));
  const [customTags, setCustomTags] = useState(() => {
    const storedTags = JSON.parse(localStorage.getItem("customTags"));
    if (!storedTags || storedTags.length === 0) {
      localStorage.setItem("customTags", JSON.stringify(defaultTags));
      return defaultTags;
    }
    return storedTags;
  });
  const [editNoteId, setEditNoteId] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("None");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("#f9fdff", "#1c1c1c");
  const buttonColor = useColorModeValue("black", "white");
  const buttonText = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "black");
  const modalBgColor = useColorModeValue("white", "gray.700");
  const modalTextColor = useColorModeValue("black", "white");
  const inputBgColor = useColorModeValue("gray.100", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "gray.300");
  const noneTagColor = useColorModeValue("gray.300", "gray.300");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("customTags", JSON.stringify(customTags));
  }, [notes, customTags]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
        navigate("/ProfilePage");
    } else {
        navigate("/SignupPage");
    }
  };

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
    setFilteredNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteTag = (indexToRemove) => {
    const updatedTags = customTags.filter((_, index) => index !== indexToRemove);
    setCustomTags(updatedTags);
    localStorage.setItem("customTags", JSON.stringify(updatedTags));
  };

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
    if (tagTitle === "None") return noneTagColor;
    return customTags.find(tag => tag.title === tagTitle)?.color || defaultTags.find(tag => tag.title === tagTitle)?.color || noneTagColor;
  };

  const sidebarWidth = { base: "60px", md: "150px" };

  return (
    <Flex direction="row" height="100vh" backgroundColor={bgColor}>
      {/* Sidebar */}
      <Box
        position="fixed"
        left="0"
        top="0"
        bottom="0"
        width={sidebarWidth}
        height="100vh"
        zIndex="10"
        bg={bgColor}
      >
        <Navbar onProfileClick={handleProfileClick}/>
      </Box>
      <Flex direction="column" m={5} w="full" ml={sidebarWidth} p={{ base: 2, md: 5 }}>
        <Heading mb={6}>My Notes</Heading>
        <Box>
          <HStack>
            <Button background={buttonColor} color={buttonText} my={4} onClick={openModalForNewNote} mr={6}>New Note</Button>
            {/* Note Listing and Filtering */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>{tag === "None" ? "Filter by Tag" : tag}</MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleTagFilterChange("None")}>
                  <HStack>
                    <Text>All Notes</Text>
                  </HStack>
                </MenuItem>
                {customTags.map((customTag, index) => (
                  <MenuItem 
                  key={index} 
                  onClick={() => handleTagFilterChange(customTag.title)} 
                  bg={tag === customTag.title ? "blue.100" : "inherit"}
                  _hover={{ bg: hoverBgColor}}
                >
                    <HStack>
                      <Text >{customTag.title}</Text>
                      <Circle size="15px" bg={customTag.color} />
                    </HStack>
                  </MenuItem>
                ))}
                <MenuItem onClick={onCustomTagModalOpen}>+ Customize Tags</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Box>
        <Flex wrap="wrap">
          {filteredNotes.map((note) => (
            <Box key={note.id} p={4} borderWidth="1px" borderRadius="lg" w="300px" m={2}
              backgroundColor={getTagColor(note.tag)} boxShadow="md" h="250px" color={textColor} position="relative"
              _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
              >
              <Text fontWeight="bold" mb={2}>{note.title}</Text>
              <Text mb={2}>{note.content}</Text>
              <ButtonGroup position="absolute" bottom={2} left={2}>
                <Button size="sm" backgroundColor={buttonColor} color={buttonText} onClick={() => handleEditNote(note)}>Edit</Button>
                <Button size="sm" backgroundColor="red.400" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
              </ButtonGroup>
            </Box>
          ))}
        </Flex>

        {/* Note Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={modalBgColor} color={modalTextColor}>
            <ModalHeader>{editNoteId ? "Edit Note" : "New Note"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                mb={3} 
                bg={inputBgColor}
                _placeholder={{ color: placeholderColor }}
              />
              <Textarea 
                placeholder="Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                mb={3} 
                bg={inputBgColor}
                _placeholder={{ color: placeholderColor }}
              />
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Select Tag: {tag}</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setTag("None")}>
                    <HStack>
                      <Text>None</Text>
                    </HStack>
                  </MenuItem>
                  {customTags.map((customTag, index) => (
                    <MenuItem 
                    key={index} 
                    onClick={() => setTag(customTag.title)} 
                    bg={tag === customTag.title ? "blue.100" : "inherit"}
                    _hover={{ bg: hoverBgColor}}
                  >
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
              <Button backgroundColor={buttonColor} color={buttonText} mr={3} onClick={handleSaveNote}>Save</Button>
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
