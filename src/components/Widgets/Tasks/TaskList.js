// src/components/Task/TaskList.js
import React from 'react';
import {
  Flex, Checkbox, Text, Box, IconButton, Menu, MenuButton,
  MenuList, MenuItem, MenuDivider,
} from '@chakra-ui/react';
import { MdMoreVert, MdDelete, MdEdit } from 'react-icons/md';
import { useTaskColors } from './TaskSettings';

const TaskList = ({
  tasks, toggleTaskCompletion, openEditModal, openListModal, deleteTask,
}) => {
  const {
    bgColor, primaryColor, secondaryColor, buttonColor, hoverColor, taskTextColor,
  } = useTaskColors();

  return (
    <Box maxH="350px" overflowY="auto" mt={4} maxWidth="700px">
      {tasks.map((task) => (
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
            <MenuList>
              <MenuItem icon={<MdEdit />} onClick={() => openEditModal(task)}>Edit Task</MenuItem>
              <MenuDivider />
              <MenuItem icon={<MdDelete />} color="red" onClick={() => deleteTask(task.id)}>
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
