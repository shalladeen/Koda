import React, { useState, useEffect } from 'react';
import Navbar from "../../nav/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, Flex, Text, useColorModeValue, IconButton, Icon, HStack, Button, Menu, MenuList, MenuItem,
Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FaEnvelope } from 'react-icons/fa';
import FriendList from './FriendList';
import FriendRequest from './FriendRequest';
import Notification from '../../Widgets/Notifications/Notification'; 
function Friends() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [friends, setFriends] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [hasNewNotifications, setHasNewNotifications] = useState(true); 
    const navigate = useNavigate();
    const { user, isLoggedIn, handleLogout } = useAuth();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
            navigate("/ProfilePage");
        } else {
            navigate("/SignupPage");
        }
    };

    const handleProfileMenuClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleNotificationClick = () => {
        setHasNewNotifications(false);
    };

    const sidebarWidth = { base: "60px", md: "150px" };

    return (
        <Flex direction="row" height="100vh" bg={useColorModeValue("gray.100", "#0e0e0e")}>
            {/* Sidebar */}
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                width={sidebarWidth}
                height="100vh"
               
                bg={useColorModeValue("gray.100", "#0e0e0e")}
                _before={{
                    content: `""`,
                    position: 'absolute',
                    right: '-10px',
                    top: '0',
                    bottom: '0',
                    width: '10px',
                }}
            >
                <Navbar onProfileClick={handleProfileClick} onProfileMenuClick={handleProfileMenuClick} />
            </Box>
            <Menu isOpen={isProfileMenuOpen} onClose={() => setIsProfileMenuOpen(false)}>
                <MenuList zIndex="4" style={{ marginTop: '110px', marginLeft: '50px' }}>
                    <MenuItem onClick={handleProfileClick}>View Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
            </Menu>

            {/* Main Content */}
            <Box flex="1" ml={sidebarWidth} p={4} position="relative" borderRadius="30px 0 0 30px" overflow="hidden" bg={useColorModeValue("#f9fdff", "#1c1c1c")} color={useColorModeValue("black", "white")} boxShadow={{ base: "none", md: "md" }}>
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
