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
  MenuDivider,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { MdMoreVert, MdDelete, MdEdit } from 'react-icons/md';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [lists, setLists] = useState(['Work', 'School', 'Personal']);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [currentList, setCurrentList] = useState(null);
  const [editListName, setEditListName] = useState('');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure();
  const { isOpen: isEditListOpen, onOpen: onEditListOpen, onClose: onEditListClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Color definitions
  const bgColor = useColorModeValue('#f9fdff', '#1A252F'); // Whitish, darkest blue
  const primaryColor = useColorModeValue('#2C3E50', '#B5C5D6'); // Dark blue, gray
  const secondaryColor = useColorModeValue('#74808D', '#B5C5D6'); // Light blue, gray
  const buttonColor = useColorModeValue('#269BC0', '#B5C5D6'); // Light blue, gray
  const hoverColor = useColorModeValue('#B5C5D6', '#269BC0'); // Gray, light blue
  const modalBgColor = useColorModeValue('#EDF2F7', '#2C3E50'); // Whitish, dark blue
  const modalTextColor = useColorModeValue('#2C3E50', '#f9fdff'); // Dark blue, whitish
  const taskTextColor = useColorModeValue('#2C3E50', 'white'); // Dark blue, white

  // Fetch saved tasks and lists from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedLists = JSON.parse(localStorage.getItem('lists')) || ['Work', 'School', 'Personal'];
    setTasks(savedTasks);
    setLists(savedLists);
  }, []);

  // Add a new task
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

  // Open the task edit modal
  const openEditModal = (task) => {
    setCurrentTask(task);
    setNewTaskTitle(task.name);
    setNewTaskDesc(task.desc);
    setIsEditOpen(true);
  };

  // Update an existing task
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

  // Delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    if (isEditOpen) setIsEditOpen(false);
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Close the task edit modal
  const closeEditModal = () => {
    setIsEditOpen(false);
    setCurrentTask(null);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  // Add a new list
  const addList = (e) => {
    e.preventDefault();
    if (!newListName) return;
    const updatedLists = [...lists, newListName];
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
    setNewListName('');
  };

  // Edit an existing list
  const editList = (e) => {
    e.preventDefault();
    const updatedLists = lists.map((list) => (list === currentList ? editListName : list));
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
    setCurrentList(null);
    setEditListName('');
    onEditListClose();
  };

  // Delete a list and update tasks accordingly
  const deleteList = (listName) => {
    const updatedLists = lists.filter((list) => list !== listName);
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
    const updatedTasks = tasks.map((task) => (task.list === listName ? { ...task, list: '' } : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    if (selectedList === listName) setSelectedList(null);
  };

  // Open the list edit modal
  const openEditListModal = (listName) => {
    setCurrentList(listName);
    setEditListName(listName);
    onEditListOpen();
  };

  // Add a task to a specified list
  const addTaskToList = (task, listName) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, list: listName } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onListClose();
  };

  // Open the "Add to List" modal
  const openListModal = (task) => {
    setCurrentTask(task);
    onListOpen();
  };

  // Filter tasks based on the selected list
  const filterTasksByList = (listName) => {
    setSelectedList(listName === 'All' ? null : listName);
  };

  // Calculate completion percentage
  const filteredTasks = selectedList ? tasks.filter((task) => task.list === selectedList) : tasks;
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.completed).length;
  const completionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Box p={5} pb={20}>
      <Heading as="h2" size="xl" my={5} color={primaryColor}>
        My Tasks | {completionPercent}%
      </Heading>
      <Text mb={4} color={secondaryColor}>
        {['All', ...lists].map((listName, index) => (
          <Button
            key={index}
            variant="link"
            textDecoration={selectedList === listName || (listName === 'All' && selectedList === null) ? 'underline' : 'none'}
            color={selectedList === listName || (listName === 'All' && selectedList === null) ? buttonColor : secondaryColor}
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
        <ModalContent  color={modalTextColor}>
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
                  backgroundColor={primaryColor}
                  color={taskTextColor}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>List</FormLabel>
                <Input
                  value={selectedList || ''}
                  onChange={(e) => setSelectedList(e.target.value)}
                  placeholder="Enter list name or leave empty"
                  backgroundColor={primaryColor}
                  color={taskTextColor}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
                Save
              </Button>
              <Button onClick={onAddClose} backgroundColor={hoverColor}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit Task Modal */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent  color={modalTextColor}>
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
                  backgroundColor={primaryColor}
                  color={taskTextColor}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>List</FormLabel>
                <Input
                  value={selectedList || ''}
                  onChange={(e) => setSelectedList(e.target.value)}
                  placeholder="Enter list name or leave empty"
                  backgroundColor={primaryColor}
                  color={taskTextColor}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
                Save Changes
              </Button>
              <Button onClick={closeEditModal} backgroundColor={hoverColor}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit List Modal */}
      <Modal isOpen={isEditListOpen} onClose={onEditListClose}>
        <ModalOverlay />
        <ModalContent  color={modalTextColor}>
          <ModalHeader>Edit List</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={editList}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>List Name</FormLabel>
                <Input
                  value={editListName}
                  onChange={(e) => setEditListName(e.target.value)}
                  placeholder="Enter new list name"
                  backgroundColor={primaryColor}
                  color={taskTextColor}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
                Save
              </Button>
              <Button onClick={onEditListClose} backgroundColor={hoverColor}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Add to List Modal */}
      <Modal isOpen={isListOpen} onClose={onListClose}>
        <ModalOverlay />
        <ModalContent color={modalTextColor}>
          <ModalHeader>Add Task to List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {lists.map((list, index) => (
              <HStack key={index} justifyContent="space-between" alignItems="center">
                <Button
                  width="full"
                  my={2}
                  onClick={() => addTaskToList(currentTask, list)}
                  backgroundColor={buttonColor}
                  _hover={{ backgroundColor: hoverColor }}
                >
                  {list}
                </Button>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<MdMoreVert />}
                    aria-label="List Options"
                    size="sm"
                    backgroundColor={buttonColor}
                    _hover={{ backgroundColor: hoverColor }}
                  />
                  <MenuList backgroundColor={modalBgColor} color={modalTextColor}>
                    <MenuItem icon={<MdEdit />} onClick={() => openEditListModal(list)}>Edit List</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<MdDelete />} color="red" onClick={() => deleteList(list)}>Delete List</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ))}
            <form onSubmit={addList}>
              <FormControl mt={4}>
                <FormLabel>New List</FormLabel>
                <Input
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter new list name"
                  backgroundColor={primaryColor}
                  color={taskTextColor}
                />
              </FormControl>
              <Button colorScheme="blue" mt={2} type="submit" backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
                Add New List
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onListClose} backgroundColor={hoverColor}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {filteredTasks.length > 0 ? (
        <Box maxH="350px" overflowY="auto" mt={4} maxWidth="700px">
          {filteredTasks.map((task) => (
            <Flex key={task.id} p={5} borderWidth="1px" borderRadius="15px" borderColor={primaryColor} my={2} alignItems="center" backgroundColor={bgColor}>
              <Checkbox
                isChecked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                mr={2}
                colorScheme="blue"
              />
              <Box flex="1">
                <Text as={task.completed ? 's' : 'span'} fontWeight="bold" color={taskTextColor}>
                  {task.name}
                </Text>
                {task.list && (
                  <Text as={task.completed ? 's' : 'span'} color={secondaryColor}>
                    {' '}| {task.list}
                  </Text>
                )}
              </Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdMoreVert />}
                  aria-label="Options"
                  size="sm"
                  backgroundColor={buttonColor}
                  _hover={{ backgroundColor: hoverColor }}
                  mr={2}
                />
                <MenuList color={modalTextColor} borderRadius={10}>
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
        <Text textAlign="center" mt={5} color={taskTextColor}>
          There are currently no tasks.
        </Text>
      )}
      <Button onClick={onAddOpen} colorScheme="teal" mt={4} backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
          Add Task
        </Button>
    </Box>
  );
};

export default Task;
