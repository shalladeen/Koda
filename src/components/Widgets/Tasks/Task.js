import React, { useState, useEffect } from 'react';
import {
  Box, Button, Heading, Text, useDisclosure,
} from '@chakra-ui/react';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import TaskListModal from './TaskListModal';
import {
  loadTasks, loadLists, saveTasks, saveLists, addOrUpdateTask, deleteTask, deleteList, addOrUpdateList
} from './TaskUtils';
import { useTaskColors } from './TaskSettings';

const Task = () => {
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
    setTasks(loadTasks());
    setLists(loadLists());
  }, []);

  const saveTask = () => {
    const taskToSave = {
      id: currentTask ? currentTask.id : Date.now(),
      name: taskTitle,
      desc: taskDesc,
      completed: currentTask ? currentTask.completed : false,
      list: selectedList || '',
    };
    const updatedTasks = addOrUpdateTask(tasks, taskToSave);
    setTasks(updatedTasks);
    onAddClose();
    onEditClose();
    resetTaskForm();
  };

  const deleteTaskHandler = (taskId) => {
    const updatedTasks = deleteTask(tasks, taskId);
    setTasks(updatedTasks);
    onEditClose();
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
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

  const saveList = () => {
    if (!listName.trim()) {
      return;
    }
    const updatedLists = addOrUpdateList(lists, listName);
    setLists(updatedLists);
    saveLists(updatedLists);
    onListClose();
    setListName('');
  };

  const deleteListHandler = (listName) => {
    const { updatedLists, updatedTasks } = deleteList(lists, tasks, listName);
    setLists(updatedLists);
    setTasks(updatedTasks);
    if (selectedList === listName) setSelectedList(null);
    onListClose();
  };

  const openEditListModal = (listName) => {
    setCurrentList(listName);
    setListName(listName);
    onListOpen();
  };

  const resetTaskForm = () => {
    setCurrentTask(null);
    setTaskTitle('');
    setTaskDesc('');
    setSelectedList(null);
  };

  const completionPercent = tasks.length ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) : 0;

  return (
    <Box p={5} pb={20} maxWidth="500px">
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
            onClick={() => setSelectedList(listName === 'All' ? null : listName)}
            mx={1}
          >
            {listName}
          </Button>
        )).reduce((acc, x) => acc === null ? [x] : [...acc, '|', x], null)}
      </Text>

      <TaskList
        tasks={selectedList ? tasks.filter(task => task.list === selectedList) : tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        openEditModal={openEditModal}
        deleteTask={deleteTaskHandler}
      />

      <Button onClick={onAddOpen} colorScheme="teal" mt={4} backgroundColor={buttonColor} _hover={{ backgroundColor: hoverColor }}>
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
};

export default Task;
