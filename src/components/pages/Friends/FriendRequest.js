import React, { useEffect, useState } from 'react';
import { Box, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriends } from '../../../services/friendRequestService';

const FriendRequest = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [recipientId, setRecipientId] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await getFriends(userId);
        setFriends(response);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [userId]);

  const handleSendRequest = async () => {
    try {
      const response = await sendFriendRequest(userId, recipientId);
      setFriends([...friends, response]);
      setRecipientId('');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await acceptFriendRequest(requestId);
      setFriends(friends.map(friend => friend._id === requestId ? response : friend));
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      setFriends(friends.filter(friend => friend._id !== requestId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        <HStack spacing={2}>
          <Input
            placeholder="Recipient ID"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
          <Button onClick={handleSendRequest}>Send Request</Button>
        </HStack>
        {friends.length === 0 ? (
          <Text>No friend requests</Text>
        ) : (
          friends.map(friend => (
            <Box key={friend._id} p={2} borderWidth={1} borderRadius="md" w="100%">
              <HStack justifyContent="space-between">
                <Text>{friend.recipient.username}</Text>
                {friend.status === 'pending' && (
                  <HStack>
                    <Button colorScheme="green" onClick={() => handleAcceptRequest(friend._id)}>Accept</Button>
                    <Button colorScheme="red" onClick={() => handleRejectRequest(friend._id)}>Reject</Button>
                  </HStack>
                )}
                {friend.status === 'accepted' && <Text>Friends</Text>}
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default FriendRequest;
