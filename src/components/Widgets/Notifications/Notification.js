import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Badge, Icon, VStack, HStack, Text, Button, SlideFade } from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Notification = ({ notifications, hasNewNotifications, onNotificationClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draggedNotification, setDraggedNotification] = useState(null);
  const [positions, setPositions] = useState(notifications.map(() => 0));
  const [dragStartX, setDragStartX] = useState(0);
  const navigate = useNavigate();
  const notificationListRef = useRef(null);

  const toggleNotificationList = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      onNotificationClick();
    }
  };

  const handleNotificationItemClick = (notification) => {
    navigate(notification.link);
    setIsOpen(false); 
  };

  const handleDeleteNotification = (index) => {
    // Implement delete notification logic later
    console.log('Delete notification at index:', index);
  };

  const handleMouseDown = (index, event) => {
    setDraggedNotification(index);
    setDragStartX(event.clientX);
    document.body.style.userSelect = 'none'; 
  };

  const handleMouseMove = (event) => {
    if (draggedNotification !== null) {
      const newPosX = event.clientX - dragStartX;
      setPositions((prev) =>
        prev.map((pos, i) => (i === draggedNotification ? Math.min(0, Math.max(newPosX, -50)) : pos))
      );
    }
  };

  const handleMouseUp = () => {
    if (draggedNotification !== null) {
      if (positions[draggedNotification] > -25) {
        setPositions((prev) =>
          prev.map((pos, i) => (i === draggedNotification ? 0 : pos))
        );
      } else {
        setPositions((prev) =>
          prev.map((pos, i) => (i === draggedNotification ? -50 : pos))
        );
      }
      setDraggedNotification(null);
      document.body.style.userSelect = ''; 
    }
  };

  const handleClickOutside = (event) => {
    if (notificationListRef.current && !notificationListRef.current.contains(event.target)) {
      handleResetPosition();
    }
  };

  const handleResetPosition = () => {
    setDraggedNotification(null);
    setPositions(notifications.map(() => 0));
    document.body.style.userSelect = ''; 
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [draggedNotification, dragStartX, positions]);

  return (
    <Box position="relative">
      <IconButton
        icon={<Icon as={FaBell} />}
        aria-label="Notifications"
        onClick={toggleNotificationList}
      />
      {hasNewNotifications && (
        <Box
          position="absolute"
          top="0"
          right="0"
          bg="blue.500"
          borderRadius="full"
          width="8px"
          height="8px"
        />
      )}
      <SlideFade in={isOpen} offsetY="20px">
        <VStack
          spacing={2}
          position="absolute"
          top="40px"
          right="0"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          zIndex="10"
          width="300px"
          ref={notificationListRef}
          style={{
            userSelect: 'none', 
          }}
        >
          {notifications.length === 0 ? (
            <Text>No notifications</Text>
          ) : (
            notifications.map((notification, index) => (
              <Box
                key={index}
                p={4}
                borderBottomWidth={index !== notifications.length - 1 ? '1px' : '0'}
                cursor="pointer"
                position="relative"
                bg="white"
                onMouseDown={(event) => handleMouseDown(index, event)}
                style={{
                  transform: `translateX(${positions[index]}px)`,
                  transition: draggedNotification === index ? 'none' : 'transform 0.3s',
                  userSelect: 'none',
                }}
              >
                <HStack justifyContent="space-between">
                  <Text>{notification.message}</Text>
                  <Text fontSize="xs" color="gray.500">{notification.time}</Text>
                </HStack>
                {positions[index] === -50 && (
                  <Box position="absolute" top="0" bottom="0" left="100%" width="50px" display="flex" alignItems="center" justifyContent="center">
                    <Button
                      colorScheme="red"
                      
                      mr={2}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNotification(index);
                      }}
                    >
                     ✗
                    </Button>
                  </Box>
                )}
              </Box>
            ))
          )}
        </VStack>
      </SlideFade>
    </Box>
  );
};

export default Notification;
