import React from 'react';
import { Box, Heading, Text, Flex, Checkbox } from '@chakra-ui/react';

const Folder = ({ tasks, listName, toggleTaskCompletion }) => {
  const filteredTasks = tasks.filter((task) => task.list === listName);

  return (
    <Box p={5} pb={20}>
      <Heading as="h2" size="xl" textAlign="center" my={5}>
        {listName} Tasks
      </Heading>
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
                <Text as={task.completed ? 's' : 'span'}>{task.desc}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      ) : (
        <Text textAlign="center" mt={5}>
          No tasks in this list.
        </Text>
      )}
    </Box>
  );
};

export default Folder;
