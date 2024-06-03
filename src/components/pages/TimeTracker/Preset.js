import React, { useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button, Input, Select, FormControl, FormLabel, useColorModeValue, VStack
} from '@chakra-ui/react';

function Preset({ isOpen, onClose, onSave }) {
    const [presetName, setPresetName] = useState('');
    const [presetFocusTime, setPresetFocusTime] = useState('25');
    const [presetBreakTime, setPresetBreakTime] = useState('5');

    const handleSave = () => {
        onSave({ presetName, presetFocusTime, presetBreakTime });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Preset</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Preset Name" value={presetName} onChange={(e) => setPresetName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Focus Time</FormLabel>
                            <Select value={presetFocusTime} onChange={(e) => setPresetFocusTime(e.target.value)}>
                                <option value="15">15 minutes</option>
                                <option value="25">25 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="90">1.5 hours</option>
                                <option value="120">2 hours</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Break Time</FormLabel>
                            <Select value={presetBreakTime} onChange={(e) => setPresetBreakTime(e.target.value)}>
                                <option value="5">5 minutes</option>
                                <option value="10">10 minutes</option>
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSave}>Save Preset</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Preset;
