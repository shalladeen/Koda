import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text
} from '@chakra-ui/react';

const TimerDialog = ({ isOpen, onClose, onConfirm, type, tag }) => {
  const renderContent = () => {
    switch (type) {
      case 'stop':
        return (
          <>
            <ModalHeader>Stop Timer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to stop this timer?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={onConfirm}>
                Yes
              </Button>
              <Button colorScheme="blue" onClick={onClose}>
                No
              </Button>
            </ModalFooter>
          </>
        );
      case 'complete':
      default:
        return (
          <>
            <ModalHeader>Timer Completed</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Your {tag === 'none' ? 'timer' : `${tag} timer`} is done!</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {renderContent()}
      </ModalContent>
    </Modal>
  );
};

export default TimerDialog;
