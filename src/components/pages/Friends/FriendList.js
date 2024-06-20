import React, { useState, useEffect } from 'react';
import { Box, Input, VStack, HStack, Text, Badge, Avatar, IconButton } from '@chakra-ui/react';
import { FaSearch, FaEnvelope } from 'react-icons/fa';

const FriendList = ({ friends }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friends);

  useEffect(() => {
    setFilteredFriends(
      friends.filter(friend => 
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, friends]);

  return (
    <Box p={4}>
      <HStack mb={4}>
        <Input
          placeholder="Search Friends"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton icon={<FaSearch />} />
      </HStack>
      <VStack spacing={4} align="stretch">
        {filteredFriends.map(friend => (
          <HStack key={friend._id} justifyContent="space-between" p={2} borderWidth={1} borderRadius="md">
            <HStack>
              <Avatar name={friend.username} />
              <Text>{friend.username}</Text>
              {friend.isOnline ? <Badge colorScheme="green">Online</Badge> : <Badge>Offline</Badge>}
            </HStack>
            <IconButton icon={<FaEnvelope />} aria-label="Send Message" />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default FriendList;
