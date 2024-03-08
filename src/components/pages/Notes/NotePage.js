import React, { useState } from "react";
import { Flex, Input, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../../nav/Navbar";

function NotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    const updatedNotes = [...notes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    navigate("/"); 
  };

  return (
    <Flex direction="column" align="center" m={4}>
      <Navbar />
      <Flex direction="column" w="80%" maxW="800px">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="flushed"
          fontSize="2xl"
          fontWeight="bold"
          mb={4}
        />
        <Textarea
          placeholder="Type your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          size="lg"
          resize="vertical"
          h="500px"
          mb={4}
        />
        <Button colorScheme="teal" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </Flex>
  );
}

export default NotePage;
