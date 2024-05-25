import React, { useState, useEffect } from 'react';
import { Box, Heading, useColorModeValue, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import TaskModal from '../Tasks/TaskModal';

function WelcomeGreeting({ isLoggedIn }) {
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [greetingIndex, setGreetingIndex] = useState(0);
    const [promptIndex, setPromptIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const storedGreetingIndex = localStorage.getItem('greetingIndex');
        const storedPromptIndex = localStorage.getItem('promptIndex');
        if (storedGreetingIndex !== null) {
            setGreetingIndex(parseInt(storedGreetingIndex, 10));
        }
        if (storedPromptIndex !== null) {
            setPromptIndex(parseInt(storedPromptIndex, 10));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('greetingIndex', greetingIndex);
    }, [greetingIndex]);

    useEffect(() => {
        localStorage.setItem('promptIndex', promptIndex);
    }, [promptIndex]);

    const handleStartTimer = () => {
        navigate("/TimeTracker");
    };

    const handleCreateTask = () => {
        setShowTaskModal(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleTaskModalClose = () => {
        setShowTaskModal(false);
    };

    const getGreetingMessage = () => {
        if (isLoggedIn) {
            return greetingIndex === 0 ? "Welcome back to Koda!" : "Ready to be productive today?";
        } else {
            return greetingIndex === 0 ? "Welcome to Koda!" : "Start your productivity journey with us!";
        }
    };

    const getPromptMessage = () => {
        return promptIndex === 0 ? "Any new tasks today?" : "Let's focus! Start a timer.";
    };

    const getPromptAction = () => {
        return promptIndex === 0 ? (
            <Button mt={4} colorScheme="teal" onClick={handleCreateTask}>
                Create a Task
            </Button>
        ) : (
            <Button mt={4} colorScheme="teal" onClick={handleStartTimer}>
                Start a Timer
            </Button>
        );
    };

    const toggleIndices = () => {
        setGreetingIndex((prevIndex) => (prevIndex + 1) % 2);
        setPromptIndex((prevIndex) => (prevIndex + 1) % 2);
    };

    
    useEffect(() => {
        toggleIndices();
    }, []); 

    return (
        <Box w="60%" p={10} mt={30} borderRadius="lg" textAlign="center">
            <Heading color={textColor} size="lg">
                {getGreetingMessage()}
            </Heading>
            <Text mt={4} color={textColor}>
                {getPromptMessage()}
            </Text>
            {getPromptAction()}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>What would you like to do?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button colorScheme="blue" mb={3} width="100%" onClick={handleStartTimer}>
                            Start a Timer
                        </Button>
                        <Button colorScheme="green" width="100%" onClick={handleCreateTask}>
                            Create a Task
                        </Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={handleCloseModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <TaskModal
                isOpen={showTaskModal}
                onClose={handleTaskModalClose}
                title="Add a New Task"
                taskTitle=""
                setTaskTitle={() => {}}
                taskDesc=""
                setTaskDesc={() => {}}
                selectedList=""
                setSelectedList={() => {}}
                onSave={() => {}}
                lists={[]}
                onCreateNewList={() => {}}
            />
        </Box>
    );
}

export default WelcomeGreeting;
