import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

const Preset = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [focusTime, setFocusTime] = useState('');
    const [breakTime, setBreakTime] = useState('');

    const handleSave = () => {
        console.log(`Saving preset: Name: ${name}, Focus Time: ${focusTime}, Break Time: ${breakTime}`);
        if (name && focusTime && breakTime) {
            onSave(name, focusTime, breakTime);
            setName('');
            setFocusTime('');
            setBreakTime('');
        } else {
            console.error('All fields are required to create a preset');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Preset</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="name" mb={4}>
                        <FormLabel>Preset Name</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl id="focusTime" mb={4}>
                        <FormLabel>Focus Time (minutes)</FormLabel>
                        <Select placeholder="Select focus time" value={focusTime} onChange={(e) => setFocusTime(e.target.value)}>
                            <option value="15">15 minutes</option>
                            <option value="25">25 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                        </Select>
                    </FormControl>
                    <FormControl id="breakTime" mb={4}>
                        <FormLabel>Break Time (minutes)</FormLabel>
                        <Select placeholder="Select break time" value={breakTime} onChange={(e) => setBreakTime(e.target.value)}>
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Preset;
