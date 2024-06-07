import React, { useState, useEffect } from 'react';
import Timer from './Timer/Timer';
import { useNavigate } from "react-router-dom";
import Navbar from '../../nav/Navbar';
import { Box, Flex, Center, VStack, HStack, useColorModeValue, Select, Button, Heading, Text, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Preset from './Preset';
import { createPreset, getPresets } from '../../../services/presetService';
import { useTimer } from '../../context/TimerContext';

function TimeTracker() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { resetTimer, setTimeInMinutes, setSecondsElapsed, setTag, setIsRunning, setTimerStarted, isRunning } = useTimer();
    const [category, setCategory] = useState('');
    const [focusTime, setFocusTime] = useState('25');
    const [breakTime, setBreakTime] = useState('5');
    const [showTimer, setShowTimer] = useState(true); // Default to showing the timer
    const [isFreeTimer, setIsFreeTimer] = useState(true);
    const [startTimerInitially, setStartTimerInitially] = useState(false);
    const [presets, setPresets] = useState([]);
    const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);

    // Fetch presets when the component mounts
    useEffect(() => {
        const fetchPresets = async () => {
            try {
                const data = await getPresets();
                setPresets(data);
                console.log('Presets fetched:', data);
            } catch (error) {
                console.error('Error fetching presets:', error);
            }
        };
        fetchPresets();
    }, []);

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate("/ProfilePage");
        } else {
            navigate("/SignupPage");
        }
    };

    const handleStartTimer = () => {
        if (isFreeTimer || (category && focusTime && breakTime)) {
            setShowTimer(true);
            setStartTimerInitially(true);
            setTimerStarted(true);
            console.log('Timer started manually');
        }
    };

    const handleToggleMode = () => {
        setIsFreeTimer(!isFreeTimer);
        setShowTimer(!showTimer);
        setStartTimerInitially(false);
        console.log('Mode toggled:', isFreeTimer ? 'Free Timer' : 'Preset Timer');
    };

    const handlePresetClick = (presetFocusTime, presetBreakTime, presetName) => {
        console.log('Preset clicked:', { presetFocusTime, presetBreakTime, presetName });
        setIsRunning(false); // Pause any running timer
        resetTimer();
        setFocusTime(presetFocusTime);
        setBreakTime(presetBreakTime);
        setTag(presetName);
        setTimeInMinutes(presetFocusTime);
        setSecondsElapsed(0);
        setShowTimer(true); // Ensure timer container is shown
        setStartTimerInitially(false); // Ensure it doesn't trigger a start from initial state
        setTimerStarted(false);
        console.log('Preset applied and timer reset');
    };

    const handlePresetStart = () => {
        setIsRunning(true);
        setTimerStarted(true);
        console.log('Preset timer started');
    };

    const handlePresetPause = () => {
        setIsRunning(false);
        console.log('Preset timer paused');
    };

    const handlePresetStop = () => {
        setIsRunning(false);
        setSecondsElapsed(0);
        setTimerStarted(false);
        console.log('Preset timer stopped');
    };

    const handleCreatePreset = async (name, focusTime, breakTime) => {
        try {
            const newPreset = await createPreset(name, focusTime, breakTime);
            setPresets([...presets, newPreset]);
            setIsPresetModalOpen(false);
            console.log('Preset created:', newPreset);
        } catch (error) {
            console.error('Error creating preset:', error);
        }
    };

    const sidebarWidth = { base: "60px", md: "150px" };
    const sidebarBgColor = useColorModeValue("gray.200", "gray.700");
    const mainContentBgColor = useColorModeValue("#f9fdff", "#1c1c1c");
    const textColor = useColorModeValue("black", "white");
    const containerBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Flex direction="row" bg={mainContentBgColor} height="100vh">
            {/* Sidebar */}
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                width={sidebarWidth}
                bg={sidebarBgColor}
                height="100vh"
                color={textColor}
                zIndex="10"
            >
                <Navbar onProfileClick={handleProfileClick} />
            </Box>

            {/* Main Content */}
            <Box flex="1" ml={sidebarWidth} p={{ base: 2, md: 5 }} color={textColor}>
                <Center height="100%">
                    <Box p={6} borderWidth={1} borderRadius="lg" bg={containerBgColor} boxShadow="lg" width={{ base: '90%', md: '60%' }} alignItems="start">
                        <Flex height="100%" direction="column">
                            {showTimer ? (
                                <Flex height="100%" direction="row" justifyContent="space-between">
                                    <Timer
                                        focusTime={isFreeTimer ? null : focusTime}
                                        breakTime={isFreeTimer ? null : breakTime}
                                        isFreeTimer={isFreeTimer}
                                        startTimerInitially={startTimerInitially}
                                        setTimerStarted={setTimerStarted}
                                    />
                                    <VStack spacing={4} align="stretch" p={4}>
                                        <Box pb={4}>
                                            <Heading size="md" textAlign="center">
                                                Presets
                                            </Heading>
                                        </Box>
                                        <HStack spacing={4} pb={2}>
                                            {presets.map((preset) => (
                                                <Button
                                                    key={preset._id}
                                                    bg="lightblue"
                                                    onClick={() => handlePresetClick(preset.focusTime, preset.breakTime, preset.name)}
                                                >
                                                    <Text>{preset.name}</Text>
                                                    <Text>{preset.focusTime} min</Text>
                                                </Button>
                                            ))}
                                            <Button bg="white" onClick={() => setIsPresetModalOpen(true)}>
                                                + New Preset
                                            </Button>
                                        </HStack>
                                       
                                    </VStack>
                                </Flex>
                            ) : (
                                <VStack spacing={4} align="stretch" p={10}>
                                    <Box pb={10} borderBottomWidth={1} mb={4}>
                                        <Heading size="md" textAlign="center">
                                            What are we focusing on today?
                                        </Heading>
                                    </Box>
                                    <HStack spacing={6} width="100%" pb={5}>
                                        <VStack align="center" flex="1">
                                            <Text>Category</Text>
                                            <Select placeholder="Category" onChange={(e) => setCategory(e.target.value)}>
                                                <option value="work">Work</option>
                                                <option value="study">Study</option>
                                                <option value="exercise">Exercise</option>
                                                <option value="leisure">Leisure</option>
                                            </Select>
                                        </VStack>
                                        <VStack align="center" flex="1">
                                            <Text>Focus Time</Text>
                                            <Select placeholder="Focus time" value={focusTime} onChange={(e) => setFocusTime(e.target.value)}>
                                                <option value="25">25 minutes</option>
                                                <option value="30">30 minutes</option>
                                                <option value="45">45 minutes</option>
                                                <option value="60">1 hour</option>
                                                <option value="90">1.5 hours</option>
                                                <option value="120">2 hours</option>
                                            </Select>
                                        </VStack>
                                        <VStack align="center" flex="1">
                                            <Text>Break</Text>
                                            <Select placeholder="Break" value={breakTime} onChange={(e) => setBreakTime(e.target.value)}>
                                                <option value="5">5 minutes</option>
                                                <option value="10">10 minutes</option>
                                                <option value="15">15 minutes</option>
                                                <option value="30">30 minutes</option>
                                            </Select>
                                        </VStack>
                                    </HStack>
                                    <Button colorScheme="blue" onClick={handleStartTimer}>
                                        Start Focus
                                    </Button>
                                </VStack>
                            )}
                            <FormControl display="flex" alignItems="flex-end" justifyContent="flex-end" mt={4}>
                                <FormLabel htmlFor="mode-toggle" mb="0">
                                    {isFreeTimer ? 'Switch to Presets' : 'Switch to Timer'}
                                </FormLabel>
                                <Switch id="mode-toggle" isChecked={isFreeTimer} onChange={handleToggleMode} />
                            </FormControl>
                        </Flex>
                    </Box>
                </Center>
            </Box>
            <Preset isOpen={isPresetModalOpen} onClose={() => setIsPresetModalOpen(false)} onSave={handleCreatePreset} />
        </Flex>
    );
}

export default TimeTracker;
