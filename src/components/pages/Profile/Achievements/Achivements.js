import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import AchievementCard from './AchievmentCard';
import { getAchievements, completeAchievement, getCompletedAchievements } from '../../../../services/achievementService';

const Achievements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [achievements, setAchievements] = useState([]);
  const [completedAchievements, setCompletedAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    const fetchCompletedAchievements = async () => {
      try {
        const data = await getCompletedAchievements();
        setCompletedAchievements(data.map(achievement => achievement._id));
      } catch (error) {
        console.error('Error fetching completed achievements:', error);
      }
    };

    fetchAchievements();
    fetchCompletedAchievements();
  }, []);

  const handleCompleteAchievement = async (achievementId) => {
    try {
      const updatedCompletedAchievements = await completeAchievement(achievementId);
      setCompletedAchievements(updatedCompletedAchievements);
    } catch (error) {
      console.error('Error completing achievement:', error);
    }
  };

  const isAchievementCompleted = (achievementId) => {
    return completedAchievements.includes(achievementId);
  };

  return (
    <Box w="full" p={4} borderRadius="md" bg="gray.200">
      <Heading as="h3" size="lg" mb={4}>Achievements</Heading>
      <HStack spacing="20px" justify="center">
        {achievements.slice(0, 5).map((achievement, index) => (
          <AchievementCard
            key={index}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            isCompleted={isAchievementCompleted(achievement._id)}
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
          <ModalBody p={6}>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
              {achievements.map((achievement, index) => (
                <GridItem key={index}>
                  <AchievementCard
                    icon={achievement.icon}
                    title={achievement.title}
                    description={achievement.description}
                    isCompleted={isAchievementCompleted(achievement._id)}
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
