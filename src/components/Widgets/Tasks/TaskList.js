import React from 'react';
import {
  Box, Checkbox, Text, Flex, IconButton, Menu, MenuButton,
  MenuList, MenuItem, MenuDivider,
} from '@chakra-ui/react';
import { MdMoreVert, MdDelete, MdEdit } from 'react-icons/md';
import { useTaskColors } from './TaskSettings';

const TaskList = ({
  tasks, toggleTaskCompletion, openEditModal, deleteTask,
}) => {
  const {
    secondaryColor, hoverColor, taskTextColor,
  } = useTaskColors();

  return (
    <Box p={4} borderRadius="lg">
      {tasks.map((task) => (
        <Flex key={task._id} alignItems="center" borderRadius="md">
          <Checkbox
            isChecked={task.completed}
            onChange={() => toggleTaskCompletion(task._id)}
            mr={2}
            colorScheme="blue"
          />
          <Box
            flex="1"
            p={2}
            borderRadius="md"
            _hover={{ backgroundColor: hoverColor, cursor: 'pointer' }}
            onClick={() => openEditModal(task)}
          >
            <Text as={task.completed ? 's' : 'span'} fontWeight="bold" color={taskTextColor}>
              {task.name}
            </Text>
            {task.list && task.list.name && ( // Ensure task.list and task.list.name are defined
              <Text as={task.completed ? 's' : 'span'} color={secondaryColor}>
                {' '}| {task.list.name} {/* Render list name */}
              </Text>
            )}
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MdMoreVert />}
              aria-label="Options"
              size="sm"
              _hover={{ backgroundColor: hoverColor }}
              mr={2}
            />
            <MenuList>
              <MenuItem icon={<MdEdit />} onClick={() => openEditModal(task)}>Edit Task</MenuItem>
              <MenuDivider />
              <MenuItem icon={<MdDelete />} color="red" onClick={() => deleteTask(task._id)}>
                Delete Task
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ))}
    </Box>
  );
};

export default TaskList;
