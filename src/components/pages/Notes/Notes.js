import React, { useState, useEffect } from "react";
import {
  Flex,Button,Input,Textarea,Box,Text,Heading,useDisclosure,Modal,ModalOverlay,
  ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,ButtonGroup,Menu, HStack,
  MenuButton,MenuList,MenuItem,Circle} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import Navbar from "../../nav/Navbar";
import CustomTagModal from "./CustomTags";

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
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [customTags, notes]);


  
  const handleSaveNote = () => {
    const updatedNote = {
      id: editNoteId ? editNoteId : Date.now(),
      title,
      content,
      tag,
      type: editNoteId ? notes.find(note => note.id === editNoteId).type : 'quick',
    };
  
    const updatedNotes = editNoteId ? notes.map(note => note.id === editNoteId ? updatedNote : note) : [...notes, updatedNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    resetForm();
    onClose();
  };

  const handleEditNote = (note) => {
    if (note.type === 'document') {
      navigate("/notepage", { state: { noteId: note.id, type: note.type } });
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

  const deleteTag = (indexToRemove) => {
    const tagToDelete = customTags[indexToRemove];
    const updatedTags = customTags.filter((_, index) => index !== indexToRemove);
    setCustomTags(updatedTags);

    const updatedNotes = notes.map(note => {
      if (note.tag === tagToDelete.title) {
        return { ...note, tag: "None" }; 
      }
      return note;
    });
    setNotes(updatedNotes);

    localStorage.setItem("customTags", JSON.stringify(updatedTags));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  const resetForm = () => {
    setEditNoteId(null);
    setTitle("");
    setContent("");
    setTag("None");
  };

  

  const getTagColor = (tagTitle) => {
    if (tagTitle === "None") return "gray";

    return customTags.find(tag => tag.title === tagTitle)?.color || "gray";
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
          <MenuItem onClick={() => navigate("/notepage")}>Document Note</MenuItem>
        </MenuList>
      </Menu>

      
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

      {/* Display notes */}
      <Heading size="md" my={4}>Quick Notes</Heading>
      <Flex wrap="wrap" justifyContent="center">
        {notes.filter(note => note.type === "quick").map((note) => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="lg" w="300px" m="2">
            <Text fontWeight="bold" mb={2}>{note.title || "Untitled Note"}</Text>
            <Text mb={2}>{note.content}</Text>
            <Flex justify="space-between" mt={4}>
              <ButtonGroup isAttached variant="outline">
                <Button size="sm" onClick={() => handleEditNote(note)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
              </ButtonGroup>
              {note.tag && note.tag !== "None" && (
             <HStack>
                <Text>{note.tag}</Text>
                <Circle size="15px" bg={getTagColor(note.tag)} />
             </HStack>
              )}
            </Flex>
          </Box>
        ))}
      </Flex>

      <Heading size="md" my={4}>Document Notes</Heading>
      <Flex wrap="wrap" justifyContent="center">
        {notes.filter(note => note.type === "document").map((note) => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="lg" w="300px" m="2">
            <Text fontWeight="bold" mb={2}>{note.title || "Untitled Document"}</Text>
            <Flex justify="space-between" mt={4}>
              <ButtonGroup isAttached variant="outline">
                <Button size="sm" onClick={() => handleEditNote(note)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
              </ButtonGroup>
              {note.tag && note.tag !== "None" && (
              <HStack>
                <Text>{note.tag}</Text>
                <Circle size="15px" bg={getTagColor(note.tag)} />
              </HStack>
              )}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}

export default Notes;
