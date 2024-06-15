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
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const TimerDialog = ({ isOpen, onClose, onConfirm, type, tag, breakTime }) => {
  useEffect(() => {
    console.log('TimerDialog isOpen state:', isOpen);
  }, [isOpen]);

  const modalBgColor = useColorModeValue('white', 'gray.800');
  const modalTextColor = useColorModeValue('black', 'white');
  const buttonCancel = useColorModeValue('black', 'gray.300');
  const buttonCancelText = useColorModeValue('white', 'black');
  const buttonBgColor = useColorModeValue('#63A9BF', '#4E8098');
  const buttonTextColor = useColorModeValue('white', 'black');

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
              <Button backgroundColor={buttonBgColor} color={buttonTextColor} onClick={onConfirm} mr={3}>
                Yes
              </Button>
              <Button backgroundColor={buttonCancel} color={buttonCancelText} onClick={onClose}>
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
              <Button backgroundColor={buttonBgColor} color={buttonTextColor} onClick={onConfirm} mr={3}>
                Yes
              </Button>
              <Button backgroundColor={buttonCancel} color={buttonCancelText} onClick={onClose}>
                No
              </Button>
            </ModalFooter>
          </>
        );
        case 'slider':
          return (
            <>
              <ModalHeader>Set Focus Time</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Timer's Up! Would you like to start another session?</Text>
              </ModalBody>
              <ModalFooter>
                <Button backgroundColor={buttonBgColor} color={buttonTextColor} onClick={onConfirm} mr={3}>
                  Yes
                </Button>
                <Button backgroundColor={buttonCancel} color={buttonCancelText} onClick={onClose}>
                  No
                </Button>
              </ModalFooter>
            </>
          );
    }
  };

  

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={modalBgColor} color={modalTextColor} borderRadius="lg">
        {renderContent()}
      </ModalContent>
    </Modal>
  );
};

export default TimerDialog;
