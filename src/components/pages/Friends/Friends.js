import React, { useState, useEffect } from 'react';
import Navbar from "../../nav/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, Flex, Text, useColorModeValue, IconButton, Icon, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FaEnvelope } from 'react-icons/fa';
import FriendList from './FriendList';
import FriendRequest from './FriendRequest';
import Notification from '../../Widgets/Notifications/Notification'; // Import Notification widget

function Friends() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [friends, setFriends] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [hasNewNotifications, setHasNewNotifications] = useState(true); // State for new notifications indicator
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchFriends = async () => {
            // Mock data, replace with actual API call
            const friendsData = [
                { _id: 1, username: 'John Doe', email: 'john@example.com', isOnline: true },
                { _id: 2, username: 'Jane Doe', email: 'jane@example.com', isOnline: false },
            ];
            setFriends(friendsData);
        };

        const fetchNotifications = async () => {
            // Mock data, replace with actual API call
            const notificationsData = [
                { message: 'New friend request from John Doe', time: '2h ago', link: '/friend-requests' },
                { message: 'Jane Doe accepted your friend request', time: '1d ago', link: '/friends' },
                { message: 'You earned a new achievement!', time: '3d ago', link: '/achievements' },
            ];
            setNotifications(notificationsData);
        };

        fetchFriends();
        fetchNotifications();
    }, []);

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/signup");
        }
    };

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleNotificationClick = () => {
        setHasNewNotifications(false); // Mark notifications as viewed
    };

    const sidebarWidth = { base: "60px", md: "150px" };

    return (
        <Flex h="100vh">
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                width={sidebarWidth}
                bg={useColorModeValue("gray.200", "gray.700")}
                height="100vh"
                zIndex="10"
            >
                <Navbar onProfileClick={handleProfileClick} />
            </Box>
            <Box flex="1" ml={sidebarWidth} p={4} position="relative">
                <HStack position="absolute" top="4" right="4" spacing={4} zIndex="20">
                    <IconButton
                        icon={<Icon as={FaEnvelope} />}
                        aria-label="Friend Requests"
                        onClick={handleToggleModal}
                    />
                    <Notification notifications={notifications} onNotificationClick={handleNotificationClick} hasNewNotifications={hasNewNotifications} />
                </HStack>
                <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Friend Requests</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {user && <FriendRequest userId={user._id} />}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleToggleModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Flex h="100%" direction="column" align="center">
                    <Text fontSize="2xl" mb={4}>Friends</Text>
                    <FriendList friends={friends} />
                </Flex>
            </Box>
        </Flex>
    );
}

export default Friends;
