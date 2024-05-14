import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, SimpleGrid, Box
} from '@chakra-ui/react';

const MonthYearPickerModal = ({ isOpen, onClose, onChangeMonthYear, currentDate }) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(2000, i, 1).toLocaleString('default', { month: 'long' });
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  useEffect(() => {
    if (isOpen) {
      setSelectedYear(currentDate.getFullYear());
      setSelectedMonth(currentDate.getMonth());
    }
  }, [isOpen, currentDate]);

  const handleSave = () => {
    onChangeMonthYear({ year: selectedYear, month: selectedMonth });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Month and Year</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={3} spacing={2} marginBottom={4}>
            {months.map((name, index) => (
              <Box
                as="button"
                key={name}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                bg={selectedMonth === index ? "blue.500" : "gray.200"}
                color={selectedMonth === index ? "white" : "black"}
                onClick={() => setSelectedMonth(index)}
              >
                {name}
              </Box>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={5} spacing={2}>
            {years.map((yearOption, index) => (
              <Box
                as="button"
                key={yearOption}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                bg={selectedYear === yearOption ? "blue.500" : "gray.200"}
                color={selectedYear === yearOption ? "white" : "black"}
                onClick={() => setSelectedYear(yearOption)}
              >
                {yearOption}
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>Go</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MonthYearPickerModal;
