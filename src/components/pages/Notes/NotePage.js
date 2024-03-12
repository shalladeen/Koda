import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Input,
  Box,
  Select,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
  Circle
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../nav/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomTagModal from "./CustomTags";

function NotePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("None");
  const [editNoteId, setEditNoteId] = useState(null);
  const [customTags, setCustomTags] = useState(
    () => JSON.parse(localStorage.getItem("customTags")) || []
  );

  useEffect(() => {
    if (location.state?.noteId) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const note = notes.find(n => n.id === location.state.noteId);
      if (note) {
        setEditNoteId(location.state.noteId);
        setTitle(note.title);
        setContent(note.content);
        setTag(note.tag);
      }
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("customTags", JSON.stringify(customTags));
  }, [customTags]);

  const handleSave = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNote = {
      id: editNoteId || Date.now(),
      title,
      content,
      tag,
      type: "document",
      createdAt: !editNoteId ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    };

    const newNotes = editNoteId ? notes.map(note => note.id === editNoteId ? updatedNote : note) : [...notes, updatedNote];
    localStorage.setItem("notes", JSON.stringify(newNotes));

    navigate(-1);
  };

   const deleteTag = (indexToRemove) => {
    const tagToDelete = customTags[indexToRemove];
    const updatedTags = customTags.filter((_, index) => index !== indexToRemove);
    setCustomTags(updatedTags);
    localStorage.setItem("customTags", JSON.stringify(updatedTags));

    const updatedNotes = notes.map(note => {
      if (note.tag === tagToDelete.title) {
        return { ...note, tag: "None" }; 
      }
      return note;
    });
    setNotes(updatedNotes);

    localStorage.setItem("customTags", JSON.stringify(updatedTags));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  

  const handleTagChange = (selectedTag) => {
    if (isOpen) onClose();
    setTag(selectedTag);
  };

  return (
    <Flex direction="column" align="center" m={4}>
      <Navbar />
      <Flex direction="column" w="80%" maxW="800px" mb={4}>
        <Input
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="lg"
          mb={3}
        />
        {/* Custom tag selection with preview */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="full">
            {tag === "None" ? "Select Tag" : tag}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleTagChange("None")}>
              <Text>No Tag</Text>
            </MenuItem>
            {customTags.map((customTag, index) => (
              <MenuItem key={index} onClick={() => handleTagChange(customTag.title)}>
                <HStack>
                  <Text>{customTag.title}</Text>
                  <Circle size="15px" bg={customTag.color} />
                </HStack>
              </MenuItem>
            ))}
            <MenuItem onClick={onOpen}>
              <Text>+ Add New Tag</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Box w="80%" maxW="800px" >
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ height: "600px", width: "100%" }}
          
        />
        <Button colorScheme="teal" onClick={handleSave} mt={14}>
          Save
        </Button>
      </Box>
      {/* Custom Tag Modal */}
      <CustomTagModal
        isOpen={isOpen}
        onClose={onClose}
        customTags={customTags}
        setCustomTags={setCustomTags}
        deleteTag={deleteTag}
      />
    </Flex>
  );
}

export default NotePage;
