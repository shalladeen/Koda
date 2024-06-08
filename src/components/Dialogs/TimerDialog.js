import React, { useEffect } from 'react';
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

const TimerDialog = ({ isOpen, onClose, onConfirm, type, tag, breakTime }) => {
  useEffect(() => {
    console.log('TimerDialog isOpen state:', isOpen);
  }, [isOpen]);

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
      case 'continue':
        return (
          <>
            <ModalHeader>Focus Time Completed</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Would you like to take a break for {breakTime} minutes?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onConfirm}>
                Yes
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                No
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
