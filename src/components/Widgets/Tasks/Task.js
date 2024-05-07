import React, { useState, useEffect } from 'react';
import {
  Flex,
  Checkbox,
  Text,
  Box,
  Button,
  Input,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react';
import { MdMoreVert, MdDelete } from 'react-icons/md';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [lists, setLists] = useState(['Work', 'School', 'Personal']);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedLists = JSON.parse(localStorage.getItem('lists')) || ['Work', 'School', 'Personal'];
    setTasks(savedTasks);
    setLists(savedLists);
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const taskToAdd = {
      id: Date.now(),
      name: newTaskTitle,
      desc: newTaskDesc,
      completed: false,
      list: selectedList || ''
    };

    const updatedTasks = [...tasks, taskToAdd];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onAddClose();
    setNewTaskTitle('');
    setNewTaskDesc('');
    setSelectedList(null);
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
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    if (isEditOpen) setIsEditOpen(false);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
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

  const addList = (e) => {
    e.preventDefault();
    if (!newListName) return;
    const updatedLists = [...lists, newListName];
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
    setNewListName('');
  };

  const addTaskToList = (task, listName) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, list: listName } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onListClose();
  };

  const openListModal = (task) => {
    setCurrentTask(task);
    onListOpen();
  };

  const filterTasksByList = (listName) => {
    setSelectedList(listName === 'All' ? null : listName);
  };

  const filteredTasks = selectedList ? tasks.filter((task) => task.list === selectedList) : tasks;

  return (
    <Box p={5} pb={20}>
      <Heading as="h2" size="xl" textAlign="center" my={5}>
        My Tasks
      </Heading>
      <Button onClick={onAddOpen} colorScheme="teal" mb={4}>
        Add Task
      </Button>
      <Text mb={4}>
        {['All', ...lists].map((listName, index) => (
          <Button
            key={index}
            variant="link"
            colorScheme="teal"
            onClick={() => filterTasksByList(listName)}
            mx={1}
          >
            {listName}
          </Button>
        )).reduce((acc, x) => acc === null ? [x] : [...acc, '|', x], null)}
      </Text>

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
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Enter task description"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>List</FormLabel>
                <Input
                  value={selectedList || ''}
                  onChange={(e) => setSelectedList(e.target.value)}
                  placeholder="Enter list name or leave empty"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
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
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Enter task description"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save Changes
              </Button>
              <Button onClick={closeEditModal}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Add to List Modal */}
      <Modal isOpen={isListOpen} onClose={onListClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task to List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {lists.map((list, index) => (
              <Button
                key={index}
                width="full"
                my={2}
                onClick={() => addTaskToList(currentTask, list)}
              >
                {list}
              </Button>
            ))}
            <form onSubmit={addList}>
              <FormControl mt={4}>
                <FormLabel>New List</FormLabel>
                <Input
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter new list name"
                />
              </FormControl>
              <Button colorScheme="blue" mt={2} type="submit">
                Add New List
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onListClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {filteredTasks.length > 0 ? (
        <Box maxH="350px" overflowY="auto" mt={4} maxWidth="700px">
          {filteredTasks.map((task) => (
            <Flex key={task.id} p={5} shadow="md" borderWidth="1px" my={2} alignItems="center">
              <Checkbox
                isChecked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                mr={2}
              />
              <Box flex="1">
                <Text as={task.completed ? 's' : 'span'} fontWeight="bold">
                  {task.name}
                </Text>
                <Text as={task.completed ? 's' : 'span'}>
                  {' '}
                  {task.desc} {task.list && `| ${task.list}`}
                </Text>
              </Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdMoreVert />}
                  aria-label="Options"
                  size="sm"
                  mr={2}
                />
                <MenuList>
                  <MenuItem onClick={() => openEditModal(task)}>Edit Task</MenuItem>
                  <MenuItem onClick={() => openListModal(task)}>Add to List</MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<MdDelete />} color="red" onClick={() => deleteTask(task.id)}>
                    Delete Task
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ))}
        </Box>
      ) : (
        <Text textAlign="center" mt={5}>
          There are currently no tasks.
        </Text>
      )}
    </Box>
  );
}

export default Task;
