import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Select, Box } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../nav/Navbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS

function NotePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("None");
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    if (location.state?.noteId) {
      setEditNoteId(location.state.noteId);
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const noteToEdit = notes.find(n => n.id === location.state.noteId);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        setTag(noteToEdit.tag);
      }
    }
  }, [location]);

  const handleSave = () => {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteData = {
      id: editNoteId || Date.now(),
      title,
      content,
      tag,
      type: "document",
    };

    if (editNoteId) {
      notes = notes.map(note => note.id === editNoteId ? noteData : note);
    } else {
      notes.push(noteData);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    navigate("/Notes");
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
          maxW="600px"
        />
        <Select
          placeholder="Select tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          size="lg"
          mb={3}
          maxW="600px"
        >
          <option value="None">None</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Important">Important</option>
        </Select>
     
      </Flex>
      <Box w="80%" maxW="800px">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={NotePage.modules}
          formats={NotePage.formats}
          bounds={'.app'}
          placeholder="Type your note here..."
          style={{ height: "600px", width: "100%" }}
        />
        <Button colorScheme="teal" onClick={handleSave} mt={4}>
          Save
        </Button>
      </Box>
    </Flex>
  );
}


NotePage.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

NotePage.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default NotePage;
