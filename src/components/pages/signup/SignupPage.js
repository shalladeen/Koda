import React, { useState } from 'react';
import Navbar from "../../nav/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, FormControl, FormLabel, Input, Text, Link, Flex, IconButton,
  VStack, HStack, useColorModeValue, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { register, login } from '../../../services/authService';
import { useAuth } from '../../context/AuthContext';

function SignupPage() {
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const formBackground = useColorModeValue('gray.50', 'gray.700');
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const toggleForm = () => setIsSignUpActive(!isSignUpActive);

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(username, email, password);
            authLogin();
            navigate('/ProfilePage');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            authLogin();
            navigate('/ProfilePage');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const sidebarWidth = { base: "60px", md: "150px" };

    return (
        <Flex h="100vh" justifyContent="center" alignItems="center" bg={useColorModeValue("#f9fdff","#1c1c1c")}>
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
                <Navbar onProfileClick={() => navigate('/profile')} />
            </Box>
            <Flex direction="column" align="center" justify="center" w="full" maxW="md" p={6} bg={formBackground} borderRadius="xl" boxShadow="lg">
                <VStack spacing={8} w="full">
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
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<FaUser />} />
                                    <Input
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<FaEnvelope />} />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<FaLock />} />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <Button colorScheme="blue" onClick={handleSignUpSubmit} w="full">Sign Up</Button>
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
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<FaUser />} />
                                    <Input
                                        placeholder="Username/Email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<FaLock />} />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <Link colorScheme="blue">Forget Your Password?</Link>
                            <Button colorScheme="blue" onClick={handleLoginSubmit} w="full">Sign In</Button>
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
