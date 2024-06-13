import React, { useState } from 'react';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { FaClock, FaCalendarDay, FaCalendarAlt, FaChevronRight, FaCalendarWeek } from 'react-icons/fa';
import AchievementCard from '../Achievements/AchievmentCard';

const Achievements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(0);

  const achievements = [
    {
      icon: FaClock,
      title: 'First Milestone',
      description: 'Focused for 50 hours in total. Great start!',
    },
    {
      icon: FaClock,
      title: 'Steady Progress',
      description: 'Focused for 100 hours in total. Keep it up!',
    },
    {
      icon: FaClock,
      title: 'Halfway There',
      description: 'Focused for 200 hours in total. Impressive!',
    },
    {
      icon: FaCalendarDay,
      title: 'Daily Grind',
      description: 'Studied for 7 days straight. Building habits!',
    },
    {
      icon: FaCalendarAlt,
      title: 'Consistency King',
      description: 'Studied for 30 days straight. You’re unstoppable!',
    },
    // Add more achievements here if needed
  ];

  const additionalAchievements = [
    {
      icon: FaClock,
      title: 'Marathoner',
      description: 'Focused for 500 hours in total. Outstanding!',
    },
    {
      icon: FaCalendarWeek,
      title: 'Weekly Warrior',
      description: 'Studied for 4 weeks straight. Fantastic commitment!',
    },
    {
      icon: FaCalendarAlt,
      title: 'Monthly Master',
      description: 'Studied for 6 months straight. Incredible!',
    },
    {
      icon: FaCalendarAlt,
      title: 'Yearly Hero',
      description: 'Studied for a year straight. You’re a legend!',
    },
    {
      icon: FaCalendarAlt,
      title: 'Ultimate Achiever',
      description: 'Unlocked all achievements. You’ve reached the pinnacle!',
    },
  ];

  const itemsPerPage = 5;
  const displayedAchievements = achievements.slice(0, itemsPerPage);

  return (
    <Box w="full" p={4} borderRadius="md" bg="gray.200">
      <Heading as="h3" size="lg" mb={4}>Achievements</Heading>
      <HStack spacing="100px" justify="center">
        {displayedAchievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
          />
        ))}
        <IconButton
          icon={<FaChevronRight />}
          aria-label="Next"
          onClick={onOpen}
          _hover={{
            transform: 'translateX(5px)',
            transition: 'transform 0.2s',
          }}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          <ModalHeader>All Achievements</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={10}>
              {[...achievements, ...additionalAchievements].map((achievement, index) => (
                <GridItem key={index}>
                  <AchievementCard
                    icon={achievement.icon}
                    title={achievement.title}
                    description={achievement.description}
                  />
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Achievements;
