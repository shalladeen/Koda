import React, { useState, useEffect } from 'react';
import Timer from './Timer/Timer';
import { useNavigate } from "react-router-dom";
import Navbar from '../../nav/Navbar';
import { Box, Flex, Center, VStack, HStack, useColorModeValue, Select, Button, Heading, Text, Switch, FormControl, FormLabel, IconButton } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Preset from './Preset';
import { createPreset, getPresets } from '../../../services/presetService';
import { useTimer } from '../../context/TimerContext';
import './Focus.css'; 

function TimeTracker() {
    // Color mode values
    const sidebarWidth = { base: "60px", md: "150px" };
    const presetBorder = useColorModeValue('gray.400', 'gray.300');
    const bgColor = useColorModeValue("#f9fdff", "#1c1c1c");
    const sidebarBgColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("black", "white");
    const containerBgColor = useColorModeValue('white', 'gray.800');
    const buttonBgColor = useColorModeValue('lightblue', '#63A9BF');
    const buttonText = useColorModeValue('black', 'white');
    const newPresetBgColor = useColorModeValue('white', 'gray.700');
    const newPresetText = useColorModeValue('black', 'white');
    const gradientBg = useColorModeValue('linear(to-r, #EEF9FF, #EEF9FF)', 'linear(to-r, #2a2a2a, #424242)');
    const progressColor = useColorModeValue('lightBlue', '#A1C3C7');
    const emptySpaceColor = useColorModeValue('white', '#1a1a1a'); 

    // Hooks
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { resetTimer, setTimeInMinutes, setSecondsElapsed, setTag, setIsRunning, setTimerStarted, isRunning } = useTimer();
    const [category, setCategory] = useState('');
    const [focusTime, setFocusTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [presetFocusTime, setPresetFocusTime] = useState(null);
    const [presetBreakTime, setPresetBreakTime] = useState(null);
    const [showTimer, setShowTimer] = useState(true);
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
        if (isFreeTimer || (focusTime && breakTime)) {
            setShowTimer(true);
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
        setIsRunning(false); 
        resetTimer();
        setPresetFocusTime(presetFocusTime);
        setPresetBreakTime(presetBreakTime);
        setTag(presetName);
        setTimeInMinutes(presetFocusTime);
        setSecondsElapsed(0);
        setShowTimer(true);
        setStartTimerInitially(false); 
        setTimerStarted(false);
        console.log('Preset applied and timer reset');
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

    return (
        <Flex direction={{ base: "column", md: "row" }} bg={bgColor} minHeight="100vh" position="relative" overflow="hidden">
            {/* Add blurred circles in the background */}
            <Box className="circle circle1" />
            <Box className="circle circle2" />
            <Box className="circle circle3" />
            <Box className="circle circle4" />
            <Box className="circle circle5" />
            <Box className="circle circle6" />
            <Box className="circle circle7" />
            
            {/* Sidebar */}
            <Box
                position={{ base: "static", md: "fixed" }}
                left="0"
                top="0"
                bottom="0"
                width={sidebarWidth}
                bg={sidebarBgColor}
                height={{ base: "auto", md: "100vh" }}
                color={textColor}
                zIndex="10"
            >
                <Navbar onProfileClick={handleProfileClick} />
            </Box>

            {/* Main Content */}
            <Box flex="1" ml={{ base: 0, md: sidebarWidth }} p={{ base: 2, md: 5 }} color={textColor} display="flex" flexDirection="column" mt={{ base: 4, md: 8 }}>
                <Box ml={4}>
                    <Heading size="lg">Focus</Heading>
                </Box>
                <Center flex="1" mt={{ base: 0, md: -20 }}>
                    <Box
                        p={10}
                        borderRadius="lg"
                        bg={containerBgColor}
                        width={{ base: '90%', md: '80%', lg: '70%', xl: '60%' }}
                        maxWidth="1200px"
                        alignItems="start"
                        position="relative"
                        zIndex="1"
                        bgGradient={gradientBg}
                        className="subtle-pattern"
                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                    >
                        <Flex height="100%" direction={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="start">
                            {showTimer ? (
                                <>
                                    <Box flex={{ base: '1', md: '2' }} mb={{ base: 6, md: 0 }}>
                                        <Timer
                                            focusTime={isFreeTimer ? null : focusTime}
                                            breakTime={isFreeTimer ? null : breakTime}
                                            presetFocusTime={presetFocusTime}
                                            presetBreakTime={presetBreakTime}
                                            isFreeTimer={isFreeTimer}
                                            startTimerInitially={startTimerInitially}
                                            setTimerStarted={setTimerStarted}
                                            progressColor={progressColor} // Pass progress color to the Timer component
                                            emptySpaceColor={emptySpaceColor} // Pass empty space color to the Timer component
                                        />
                                    </Box>
                                    <VStack flex={{ base: '1', md: '1' }} spacing={4} align="stretch" p={4}>
                                        <Box pb={4}>
                                            <Heading size="md" textAlign="center">
                                                Presets
                                            </Heading>
                                        </Box>
                                        <HStack spacing={4} pb={2} flexWrap="wrap" justifyContent="center">
                                            {presets.map((preset) => (
                                                <Button
                                                    key={preset._id}
                                                    bg={buttonBgColor}
                                                    color={buttonText}
                                                    onClick={() => handlePresetClick(preset.focusTime, preset.breakTime, preset.name)}
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    flexBasis={{ base: '45%', md: '45%' }}
                                                >
                                                    <VStack spacing={0} p={3}>
                                                        <Text fontSize={{ base: 'sm', md: 'md' }}>{preset.name}</Text>
                                                        <Text fontSize={{ base: 'sm', md: 'md' }}>{preset.focusTime} minutes</Text>
                                                    </VStack>
                                                </Button>
                                            ))}
                                            <Button bg={newPresetBgColor} color={newPresetText} onClick={() => setIsPresetModalOpen(true)} flexBasis={{ base: '45%', md: '45%' }}>
                                                <Text fontSize={{ base: 'sm', md: 'md' }}>+ New Preset</Text>
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </>
                            ) : (
                                <Flex flex="1" justifyContent="center" alignItems="center">
                                    <VStack spacing={4} align="stretch" p={10} width="100%">
                                        <Box pb={10} borderBottomWidth={1} mb={10}>
                                            <Heading size="md" textAlign="center">
                                                What are we focusing on today?
                                            </Heading>
                                        </Box>
                                        <HStack spacing={6} width="100%" pb={10} flexWrap="wrap">
                                            <VStack align="center" flex="1">
                                                <Text>Category</Text>
                                                <Select placeholder="Category" borderColor={presetBorder} onChange={(e) => setCategory(e.target.value)}>
                                                    <option value="work">Work</option>
                                                    <option value="study">Study</option>
                                                    <option value="exercise">Exercise</option>
                                                    <option value="leisure">Leisure</option>
                                                </Select>
                                            </VStack>
                                            <VStack align="center" flex="1">
                                                <Text>Focus Time</Text>
                                                <Select placeholder="Focus" borderColor={presetBorder} value={focusTime} onChange={(e) => setFocusTime(Number(e.target.value))}>
                                                    <option value="0.5">30 seconds</option>
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
                                                <Select placeholder="Break" borderColor={presetBorder} value={breakTime} onChange={(e) => setBreakTime(Number(e.target.value))}>
                                                    <option value="0.25">15 seconds</option>
                                                    <option value="5">5 minutes</option>
                                                    <option value="10">10 minutes</option>
                                                    <option value="15">15 minutes</option>
                                                    <option value="30">30 minutes</option>
                                                </Select>
                                            </VStack>
                                        </HStack>
                                        <Button backgroundColor={buttonBgColor} onClick={handleStartTimer}>
                                            Start Focus
                                        </Button>
                                    </VStack>
                                </Flex>
                            )}
                            <Box position="absolute" bottom={4} right={4}>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="mode-toggle" mb="0">
                                        {isFreeTimer ? 'Switch to Timer' : 'Switch to Presets'}
                                    </FormLabel>
                                    <Switch id="mode-toggle" isChecked={isFreeTimer} onChange={handleToggleMode} />
                                </FormControl>
                            </Box>
                        </Flex>
                    </Box>
                </Center>
            </Box>
            <Preset isOpen={isPresetModalOpen} onClose={() => setIsPresetModalOpen(false)} onSave={handleCreatePreset} />
        </Flex>
    );
}

export default TimeTracker;
