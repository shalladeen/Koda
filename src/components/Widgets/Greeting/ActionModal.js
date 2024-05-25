import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

function ActionModal({ isOpen, onClose, handleStartTimer, handleCreateTask }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ActionModal;
