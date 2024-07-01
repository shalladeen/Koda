import React, { useState, useEffect } from 'react';
import Timer from './Timer/Timer';
import { useNavigate } from "react-router-dom";
import Navbar from '../../nav/Navbar';
import { Box, Flex, Center, VStack, HStack, useColorModeValue, Select, Button, Heading, Text, Switch, FormControl, FormLabel, Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Preset from './Preset';
import { createPreset, getPresets } from '../../../services/presetService';
import { useTimer } from '../../context/TimerContext';

function TimeTracker() {
    // Color mode values
    const sidebarWidth = { base: "60px", md: "150px" };
    const presetBorder = useColorModeValue('gray.400', 'gray.300');
    const sidebarBgColor = useColorModeValue("gray.100", "#0e0e0e");
    const textColor = useColorModeValue("black", "white");
    const containerBgColor = useColorModeValue('white', 'gray.800');
    const buttonBgColor = useColorModeValue('lightblue', '#63A9BF');
    const buttonText = useColorModeValue('black', 'white');
    const newPresetBgColor = useColorModeValue('white', 'gray.700');
    const newPresetText = useColorModeValue('black', 'white');
    const presetGradientBg = useColorModeValue('linear-gradient(to right, #D9ECFF, #D0F6E4)', 'linear-gradient(to right, #2a2a2a, #424242)');
    const timerGradientBg = useColorModeValue('linear-gradient(to bottom right, #D9ECFF, #FBFFF1)', 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a)');
    const progressColor = useColorModeValue('lightBlue', '#A1C3C7');
    const emptySpaceColor = useColorModeValue('white', '#1a1a1a'); 
    const presetContainerBg = useColorModeValue('gray.50', 'gray.900');
    const presetContainerText = useColorModeValue('black', 'white');

    // Hooks
    const navigate = useNavigate();
    const { isLoggedIn, handleLogout } = useAuth();
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
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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

    const handleProfileMenuClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
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
        <Flex direction="row" height="100vh" bg={sidebarBgColor}>
            {/* Sidebar */}
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                width={sidebarWidth}
                height="100vh"
                color={textColor}
                bg={sidebarBgColor}
               
                _before={{
                    content: `""`,
                    position: 'absolute',
                    right: '-10px',
                    top: '0',
                    bottom: '0',
                    width: '10px',

                }}
            >
                <Navbar onProfileClick={handleProfileClick} onProfileMenuClick={handleProfileMenuClick} />
            </Box>
            <Menu isOpen={isProfileMenuOpen} onClose={() => setIsProfileMenuOpen(false)}>
                <MenuList zIndex="4" style={{ marginTop: '110px', marginLeft: '50px' }}>
                    <MenuItem onClick={handleProfileClick}>View Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
            </Menu>

            {/* Main Content */}
            <Box 
                flex="1" ml={sidebarWidth} 
                p={{ base: 2, md: 5 }} color={textColor} 
                display="flex" 
                flexDirection="column" 
                borderRadius="30px 0 0 30px" 
                overflow="hidden" 
                boxShadow={{ base: "none", md: "lg" }} 
                bg={showTimer ? containerBgColor : presetGradientBg} 
                zIndex={1}>
                <Box ml={4}>
                    <Heading size="lg">Focus</Heading>
                </Box>
                <Center flex="1" mt={{ base: 0, md: -20 }}>
                    <Box
                        p={10}
                        borderRadius="lg"
                        bg={showTimer ? "transparent" : presetContainerBg}
                        color={showTimer ? textColor : presetContainerText}
                        width={{ base: '90%', md: '80%', lg: showTimer ? '70%' : '90%', xl: showTimer ? '60%' : '80%' }}
                        maxWidth="1200px"
                        alignItems="start"
                        position="relative"
                        zIndex="1"
                        className="subtle-pattern"
                        borderColor={('gray.200', 'gray.700')}
                        minHeight={showTimer ? "600px" : "500px"}
                    >
                        <Flex height="100%" direction="column" justifyContent="center" alignItems="center">
                            {showTimer ? (
                                <>
                                <Flex direction={{ base: 'column', lg: 'row' }} width="100%" justifyContent="center" alignItems="flex-start">
                                    <Box flex="1" mb={6} bgGradient={timerGradientBg} minHeight="600px" width={{ base: '100%', lg: '70%' }} borderRadius={10}>
                                        <Timer
                                            focusTime={isFreeTimer ? null : focusTime}
                                            breakTime={isFreeTimer ? null : breakTime}
                                            presetFocusTime={presetFocusTime}
                                            presetBreakTime={presetBreakTime}
                                            isFreeTimer={isFreeTimer}
                                            startTimerInitially={startTimerInitially}
                                            setTimerStarted={setTimerStarted}
                                            progressColor={progressColor} 
                                            emptySpaceColor={emptySpaceColor}
                                        />
                                    </Box>
                                    {!isRunning && (
                                        <Box flex="1" p={2} ml={{ base: 0, lg: 4 }} mt={{ base: 4, lg: 0 }} maxWidth={{ base: '100%', lg: '30%' }}>
                                            <Heading size="md" textAlign="center" color={presetContainerText} mb={4}>
                                                Presets
                                            </Heading>
                                            <VStack spacing={4} align="stretch" overflowY="auto">
                                                {presets.map((preset) => (
                                                    <Button
                                                        key={preset._id}
                                                        bg={buttonBgColor}
                                                        color={buttonText}
                                                        onClick={() => handlePresetClick(preset.focusTime, preset.breakTime, preset.name)}
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        width="70%"
                                                        mx="auto"
                                                    >
                                                        <VStack spacing={0} p={3}>
                                                            <Text fontSize={{ base: 'sm', md: 'md' }}>{preset.name}</Text>
                                                            <Text fontSize={{ base: 'sm', md: 'md' }}>{preset.focusTime} minutes</Text>
                                                        </VStack>
                                                    </Button>
                                                ))}
                                                <Button bg={newPresetBgColor} color={newPresetText} onClick={() => setIsPresetModalOpen(true)} width="100%">
                                                    <Text fontSize={{ base: 'sm', md: 'md' }}>+ New Preset</Text>
                                                </Button>
                                            </VStack>
                                        </Box>
                                    )}
                                </Flex>
                            </>
                            
                            ) : (
                                <Flex flex="1" justifyContent="center" alignItems="center" width="100%">
                                    <VStack spacing={4} align="stretch" p={10} width="100%" >
                                        <Box pb={10} borderBottomWidth={1} mb={10}>
                                            <Heading size="md" textAlign="center">
                                                What are we focusing on today?
                                            </Heading>
                                        </Box>
                                        <HStack spacing={6} width="100%" pb={10} flexWrap="wrap" justifyContent="space-between">
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
                                        {isFreeTimer ? 'Switch to Presets' : 'Switch to Timer'}
                                    </FormLabel>
                                    <Switch
                                        id="mode-toggle"
                                        isChecked={!isFreeTimer}
                                        onChange={handleToggleMode}
                                        colorScheme={isFreeTimer ? 'gray' : 'blue'}
                                    />
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
