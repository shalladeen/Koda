import React, { useState } from 'react';
import Navbar from "../../nav/Navbar";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Link, Flex, IconButton, useColorMode, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { register, login } from '../../../services/authService';

function SignupPage() {
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { colorMode, toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.50', 'gray.700');
    const navigate = useNavigate();

    const toggleForm = () => setIsSignUpActive(!isSignUpActive);

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(username, email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/signup");
        }
    };

    const sidebarWidth = { base: "60px", md: "150px" };

    return (
        <Flex h="100vh">
            <Box
                position="fixed"
                left="0"
                top="0"
                bottom="0"
                width={sidebarWidth}
                bg={useColorModeValue("gray.200", "gray.700")}
                height="100vh"
                zIndex="10"
            >
                <Navbar onProfileClick={handleProfileClick} />
            </Box>
            <Flex direction="column" align="center" justify="center" h="100vh" ml={{ base: "0", md: "64" }} w="70%">
                <VStack spacing={8} bg={formBackground} p={6} borderRadius="xl" boxShadow="lg" w="500px">
                    {isSignUpActive ? (
                        <>
                            <Text fontSize="2xl" fontWeight="bold">Create An Account</Text>
                            <HStack spacing={2}>
                                <IconButton aria-label="Google" icon={<FaGoogle />} />
                                <IconButton aria-label="Facebook" icon={<FaFacebook />} />
                                <IconButton aria-label="GitHub" icon={<FaGithub />} />
                                <IconButton aria-label="LinkedIn" icon={<FaLinkedin />} />
                            </HStack>
                            <Text>or use your email for registration</Text>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Button colorScheme="blue" onClick={handleSignUpSubmit}>Sign Up</Button>
                            <Button variant="link" onClick={toggleForm}>Already have an account? Sign In</Button>
                        </>
                    ) : (
                        <>
                            <Text fontSize="2xl" fontWeight="bold">Sign In</Text>
                            <HStack spacing={2}>
                                <IconButton aria-label="Google" icon={<FaGoogle />} />
                                <IconButton aria-label="Facebook" icon={<FaFacebook />} />
                                <IconButton aria-label="GitHub" icon={<FaGithub />} />
                                <IconButton aria-label="LinkedIn" icon={<FaLinkedin />} />
                            </HStack>
                            <Text>or use your email to login</Text>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Link colorScheme="blue">Forget Your Password?</Link>
                            <Button colorScheme="blue" onClick={handleLoginSubmit}>Sign In</Button>
                            <Button variant="link" onClick={toggleForm}>Don't have an account? Sign Up</Button>
                        </>
                    )}
                    {error && <Text color="red.500">{error}</Text>}
                </VStack>
            </Flex>
        </Flex>
    );
}

export default SignupPage;
