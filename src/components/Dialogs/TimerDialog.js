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

const TimerDialog = ({ isOpen, onClose, tag }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
      </ModalContent>
    </Modal>
  );
};

export default TimerDialog;
