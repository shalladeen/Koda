// NoteCard.js
import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const NoteCard = ({ note, onSelect }) => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={cardBg}
      m={2}
      cursor="pointer"
      onClick={() => onSelect(note)}
    >
      <Text fontWeight="bold" isTruncated>
        {note.title}
      </Text>
      <Text noOfLines={1}>{note.description || ''}</Text>
    </Box>
  );
};

export default NoteCard;
