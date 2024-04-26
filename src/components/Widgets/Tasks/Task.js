import React, { useState, useEffect } from 'react';
import { Flex, Checkbox, Text, Box, Button, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Heading, IconButton
} from '@chakra-ui/react';
import { MdMoreVert, MdDelete } from 'react-icons/md';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const [isEditOpen, setIsEditOpen] = useState(false);
  
    useEffect(() => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(savedTasks);
    }, []);
  
    const addTask = (e) => {
      e.preventDefault();
      if (!newTaskTitle) return;
  
      const taskToAdd = {
        id: Date.now(),
        name: newTaskTitle,
        desc: newTaskDesc,
        completed: false,
      };
  
      const updatedTasks = [...tasks, taskToAdd];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      onAddClose(); 
      setNewTaskTitle('');
      setNewTaskDesc('');
    };
  
    const openEditModal = (task) => {
      setCurrentTask(task);
      setNewTaskTitle(task.name);
      setNewTaskDesc(task.desc);
      setIsEditOpen(true);
    };
  
    const handleEditTask = (e) => {
      e.preventDefault();
      const updatedTasks = tasks.map((task) =>
        task.id === currentTask.id ? { ...task, name: newTaskTitle, desc: newTaskDesc } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setIsEditOpen(false); 
      setCurrentTask(null); 
      setNewTaskTitle(''); 
      setNewTaskDesc('');
    };

    const deleteTask = (taskId) => {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      if (isEditOpen) setIsEditOpen(false);
  };

   const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };
    
    const closeEditModal = () => {
      setIsEditOpen(false);
      setCurrentTask(null);
      setNewTaskTitle('');
      setNewTaskDesc('');
    };

  return (
    <Box p={5} pb={20}>
      <Heading as="h2" size="xl" textAlign="center" my={5}>My Tasks</Heading>
      <Button onClick={onAddOpen} colorScheme="teal" mb={4}>Add Task</Button>

      {/* Add Task Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={addTask}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Enter task title" />
              </FormControl>
              <FormControl mt={4} >
                <FormLabel>Description</FormLabel>
                <Textarea value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} placeholder="Enter task description" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">Save</Button>
              <Button onClick={onAddClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit Task Modal */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleEditTask}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Enter task title" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} placeholder="Enter task description" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">Save Changes</Button>
              <Button onClick={closeEditModal}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      

      {tasks.length > 0 ? (
                <Box maxH="350px" overflowY="auto" mt={4} maxWidth="700px">
                    {tasks.map((task) => (
                        <Flex key={task.id} p={5} shadow="md" borderWidth="1px" my={2} alignItems="center">
                            <Checkbox isChecked={task.completed} onChange={() => toggleTaskCompletion(task.id)} mr={2} />
                            <Box flex="1">
                                <Text as={task.completed ? "s" : "span"} fontWeight="bold">{task.name} </Text>
                                <Text as={task.completed ? "s" : "span"}> {task.desc}</Text>
                            </Box>
                            <IconButton icon={<MdMoreVert />} onClick={() => openEditModal(task)} aria-label="Edit task" size="sm" mr={2} />
                            <IconButton icon={<MdDelete />} onClick={() => deleteTask(task.id)} colorScheme="red" aria-label="Delete task" size="sm" />
                        </Flex>
                    ))}
                </Box>
            ) : (
                <Text textAlign="center" mt={5}>There are currently no tasks.</Text>
            )}
        </Box>
    );
}
export default Task;
