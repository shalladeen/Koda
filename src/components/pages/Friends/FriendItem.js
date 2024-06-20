import React, { useState } from 'react';
import { Box, Avatar, Text, HStack, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow } from '@chakra-ui/react';

const FriendItem = ({ friend }) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <HStack spacing={3} cursor="pointer">
          <Avatar name={friend.username} />
          <Text>{friend.username}</Text>
        </HStack>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text><b>Username:</b> {friend.username}</Text>
          <Text><b>Email:</b> {friend.email}</Text>
          <Text><b>Status:</b> {friend.isOnline ? 'Online' : 'Offline'}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FriendItem;
