import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  Box, Button, Heading, Text, useDisclosure, IconButton,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import TaskListModal from './TaskListModal';
import {
  createTask, getTasks, updateTask, deleteTask
} from '../../../services/taskService';
import {
  createList, getLists, updateList, deleteList
} from '../../../services/listService';
import { useTaskColors } from './TaskSettings';

const Task = forwardRef((props, ref) => {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure();
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
        const fetchedTasks = await getTasks();
        const fetchedLists = await getLists();
        setTasks(fetchedTasks);
        setLists(fetchedLists);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    openAddTaskModal: onAddOpen,
  }));

  const saveTask = async () => {
    const taskToSave = {
      id: currentTask ? currentTask.id : undefined,
      name: taskTitle,
      desc: taskDesc,
      completed: currentTask ? currentTask.completed : false,
      list: selectedList || '',
    };

    try {
      let updatedTasks;
      if (currentTask) {
        const updatedTask = await updateTask(currentTask._id, taskTitle, taskDesc, taskToSave.completed, taskToSave.list);
        updatedTasks = tasks.map(task => task._id === currentTask._id ? updatedTask : task);
      } else {
        const newTask = await createTask(taskTitle, taskDesc, taskToSave.completed, taskToSave.list);
        updatedTasks = [...tasks, newTask];
      }
      setTasks(updatedTasks);
      onAddClose();
      onEditClose();
      resetTaskForm();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const deleteTaskHandler = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
      onEditClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find(task => task._id === taskId);
    if (task) {
      try {
        const updatedTask = await updateTask(taskId, task.name, task.desc, !task.completed, task.list);
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
    setSelectedList(task.list);
    onEditOpen();
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
      let updatedLists;
      if (currentList) {
        const updatedList = await updateList(currentList._id, listName);
        updatedLists = lists.map(list => list._id === currentList._id ? updatedList : list);
      } else {
        const newList = await createList(listName);
        updatedLists = [...lists, newList];
      }
      setLists(updatedLists);
      onListClose();
      setListName('');
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  const deleteListHandler = async (listId) => {
    try {
      await deleteList(listId);
      const updatedLists = lists.filter(list => list._id !== listId);
      const updatedTasks = tasks.filter(task => task.list !== listId);
      setLists(updatedLists);
      setTasks(updatedTasks);
      if (selectedList === listId) setSelectedList(null);
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

  // Calculate completion percentage based on selected list
  const filteredTasks = selectedList ? tasks.filter(task => task.list === selectedList) : tasks;
  const completionPercent = filteredTasks.length ? Math.round((filteredTasks.filter(task => task.completed).length / filteredTasks.length) * 100) : 0;

  return (
    <Box p={5} maxWidth="500px">
      <Heading as="h2" size="md" my={5} color={secondaryColor}>
        My Tasks | {completionPercent}%
      </Heading>
      <Text mb={4} color={secondaryColor} size="sm">
        {['All', ...lists.map(list => list.name)].map((listName, index) => (
          <Button
            key={index}
            variant="link"
            textDecoration={selectedList === listName || (listName === 'All' && selectedList === null) ? 'underline' : 'none'}
            color={selectedList === listName || (listName === 'All' && selectedList === null) ? buttonColor : secondaryColor}
            onClick={() => setSelectedList(listName === 'All' ? null : listName)}
            mx={1}
          >
            {listName}
          </Button>
        )).reduce((acc, x) => acc === null ? [x] : [...acc, '|', x], null)}
        <IconButton
          icon={<FiMoreHorizontal />}
          variant="link"
          color={secondaryColor}
          onClick={onListOpen}
          ml={2}
        />
      </Text>

      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        openEditModal={openEditModal}
        deleteTask={deleteTaskHandler}
      />

      <Button onClick={onAddOpen} size="sm" colorScheme="teal" mt={4} backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
        Add Task
      </Button>

      <TaskModal
        isOpen={isAddOpen || isEditOpen}
        onClose={isEditOpen ? onEditClose : onAddClose}
        onSave={saveTask}
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
