import React, { useState } from 'react';
import Navbar from "../../nav/Navbar";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Link, Flex, IconButton, useColorMode, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';

function Signup() {
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { colorMode, toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.50', 'gray.700');

    const toggleForm = () => setIsSignUpActive(!isSignUpActive);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behaviour
        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log(data.message);
            // Here, handle the response. For example, show a success message or redirect the user.
        } catch (error) {
            console.error('Error:', error);
            // Handle error. For example, show an error message.
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" h="100vh" p={4}>
            <Navbar />
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
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Button colorScheme="blue" onClick={handleSubmit}>Sign Up</Button>
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
                            <Input placeholder="Email" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Password" />
                        </FormControl>
                        <Link colorScheme="blue">Forget Your Password?</Link>
                        <Button colorScheme="blue">Sign In</Button>
                        <Button variant="link" onClick={toggleForm}>Don't have an account? Sign Up</Button>
                    </>
                )}
            </VStack>
        </Flex>
    );
}

export default Signup;
