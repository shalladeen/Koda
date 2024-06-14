import React, { useState } from "react";
import Navbar from "../../nav/Navbar";
import { useNavigate } from "react-router-dom";
import FriendRequest from "./FriendRequest";
import { useAuth } from "../../context/AuthContext";
import { Box, Flex, Text, useColorModeValue, IconButton, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { FaEnvelope } from 'react-icons/fa';

function Friends() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

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
                <IconButton
                    icon={<Icon as={FaEnvelope} />}
                    position="absolute"
                    top="4"
                    right="4"
                    zIndex="20"
                    onClick={handleToggleModal}
                    aria-label="Friend Requests"
                />
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
                <Flex h="100%" align="center" justify="center">
                    <Text fontSize="2xl">Friends</Text>
                </Flex>
            </Box>
        </Flex>
    );
}

export default Friends;
