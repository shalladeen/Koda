import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  Box, Button, Heading, Text, useDisclosure, IconButton, Menu, MenuButton, MenuList, MenuItem,
} from '@chakra-ui/react';
import { MdMoreVert } from 'react-icons/md';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';
import TaskListModal from './TaskListModal';
import { createTask, getTasks, updateTask, deleteTask } from '../../../services/taskService';
import { getLists, createList, updateList, deleteList } from '../../../services/listService';
import { useTaskColors } from './TaskSettings';
import { useAuth } from '../../context/AuthContext';

const Task = forwardRef((props, ref) => {
  const { user } = useAuth();

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [listName, setListName] = useState('');
  const { primaryColor, secondaryColor, buttonColor, hoverColor } = useTaskColors();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedTasks = await getTasks(user._id);
        setTasks(fetchedTasks);
        const fetchedLists = await getLists(user._id);
        console.log('Fetched lists:', fetchedLists); // Add logging to verify fetched lists
        setLists(fetchedLists);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    openAddTaskModal: onAddOpen,
  }));

  const saveTask = async (taskTitle, taskDesc) => {
    const taskToSave = {
      id: currentTask ? currentTask.id : undefined,
      name: taskTitle,
      desc: taskDesc,
      completed: currentTask ? currentTask.completed : false,
      list: selectedList ? selectedList._id || selectedList : null,
    };

    try {
      let updatedTasks;
      if (currentTask) {
        const updatedTask = await updateTask(currentTask._id, taskTitle, taskDesc, taskToSave.completed, taskToSave.list);
        updatedTasks = tasks.map(task => task._id === currentTask._id ? updatedTask : task);
      } else {
        const newTask = await createTask(user._id, taskTitle, taskDesc, taskToSave.completed, taskToSave.list);
        updatedTasks = [...tasks, newTask];
      }
      setTasks(updatedTasks);
      onAddClose();
      onEditClose();
      onDetailClose();
      resetTaskForm();
    } catch (error) {
      console.error('Error saving task:', error.response ? error.response.data : error.message);
    }
  };

  const deleteTaskHandler = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
      onEditClose();
      onDetailClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find(task => task._id === taskId);
    if (task) {
      try {
        const updatedTask = await updateTask(taskId, task.name, task.desc, !task.completed, task.list ? task.list._id || task.list : null);
        const updatedTasks = tasks.map(t => t._id === taskId ? updatedTask : t);
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error toggling task completion:', error);
      }
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setTaskTitle(task.name);
    setTaskDesc(task.desc);
    setSelectedList(task.list || null);
    onEditOpen();
  };

  const openDetailModal = (task) => {
    setCurrentTask(task);
    onDetailOpen();
  };

  const openListModal = () => {
    setListName('');
    setCurrentList(null);
    onListOpen();
  };

  const saveList = async () => {
    if (!listName.trim()) {
      return;
    }
    try {
      if (currentList) {
        const updatedList = await updateList(currentList._id, listName);
        setLists(lists.map(list => list._id === currentList._id ? updatedList : list));
      } else {
        const newList = await createList(user._id, listName);
        console.log('Newly created list:', newList); // Add logging to verify created list
        setLists([...lists, newList]);
      }
      onListClose();
      setListName('');
      setCurrentList(null);
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  const deleteListHandler = async (listId) => {
    try {
      await deleteList(listId);
      const updatedLists = lists.filter(list => list._id !== listId);
      setLists(updatedLists);
      onListClose();
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const openEditListModal = (list) => {
    setCurrentList(list);
    setListName(list.name);
    onListOpen();
  };

  const resetTaskForm = () => {
    setCurrentTask(null);
    setTaskTitle('');
    setTaskDesc('');
    setSelectedList(null);
  };

  const filteredTasks = selectedList ? tasks.filter(task => task.list && task.list._id === selectedList._id) : tasks;
  const completionPercent = filteredTasks.length ? Math.round((filteredTasks.filter(task => task.completed).length / filteredTasks.length) * 100) : 0;

  return (
    <Box p={5} maxWidth="700px">
      <Heading as="h2" size="lg" my={5} color={secondaryColor}>
        My Tasks | {completionPercent}%
      </Heading>
      <Text mb={4} color={secondaryColor} size="lg">
        {['All', ...lists.map(list => list.name)].map((listName, index) => (
          <Button
            key={index}
            variant="link"
            textDecoration={selectedList && selectedList.name === listName || (!selectedList && listName === 'All') ? 'underline' : 'none'}
            color={selectedList && selectedList.name === listName || (!selectedList && listName === 'All') ? buttonColor : secondaryColor}
            onClick={() => setSelectedList(listName === 'All' ? null : lists.find(list => list.name === listName))}
            mx={1}
          >
            {listName}
          </Button>
        )).reduce((acc, x) => acc === null ? [x] : [...acc, '|', x], null)}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<MdMoreVert />}
            aria-label="Options"
            size="md"
            _hover={{ backgroundColor: hoverColor }}
            ml={2}
          />
          <MenuList>
            <MenuItem onClick={openListModal}>Manage Lists</MenuItem>
          </MenuList>
        </Menu>
      </Text>

      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        openEditModal={openEditModal}
        deleteTask={deleteTaskHandler}
        openDetailModal={openDetailModal}
      />

      <Button onClick={onAddOpen} size="md" colorScheme="teal" mt={4} backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
        Add Task
      </Button>

      <TaskModal
        isOpen={isAddOpen || isEditOpen}
        onClose={isEditOpen ? onEditClose : onAddClose}
        onSave={() => saveTask(taskTitle, taskDesc)}
        title={currentTask ? 'Edit Task' : 'Add a New Task'}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDesc={taskDesc}
        setTaskDesc={setTaskDesc}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        lists={lists}
        onCreateNewList={openListModal}
      />

      <TaskDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        task={currentTask}
        onSave={(title, desc) => saveTask(title, desc)}
        onDelete={deleteTaskHandler}
      />

      <TaskListModal
        isOpen={isListOpen}
        onClose={onListClose}
        title={currentList ? 'Edit List' : 'Add List'}
        listName={listName}
        setListName={setListName}
        onSave={saveList}
        onDelete={deleteListHandler}
        lists={lists}
        onEditList={openEditListModal}
        currentList={currentList}
      />
    </Box>
  );
});

export default Task;
