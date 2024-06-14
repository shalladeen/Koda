import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box, Button, FormControl, FormLabel, Input, Text, Link, Flex, IconButton,
  VStack, HStack, useColorModeValue, InputGroup, InputLeftElement, InputRightElement
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin, FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { register, authLogin } from '../../../services/authService';
import { useAuth } from '../../context/AuthContext';

function SignupPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const formBackground = useColorModeValue('gray.50', 'gray.700');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const toggleForm = () => setIsSignUpActive(!isSignUpActive);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await register(username, email, password);
      console.log('Registration successful:', response);
      await login(email, password); // Update auth context with user data
      navigate('/');
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
      const response = await authLogin(email, password);
      console.log('Login successful:', response);
      await login(email, password); // Update auth context with user data
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Flex h="100vh" direction="column" justifyContent="center" alignItems="center" bg={useColorModeValue("#f9fdff", "#1c1c1c")}>
      <Box textAlign="center" mb={6}>
        <Text fontSize="5xl" fontWeight="bold" mb={2}>
          Welcome to Koda!
        </Text>
        <Text fontSize="xl">
          Create an account today to get access to all our features.
        </Text>
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={toggleShowPassword}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button color="white" backgroundColor="#63A9BF" onClick={handleSignUpSubmit} w="full">Sign Up</Button>
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={toggleShowPassword}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Link colorScheme="blue">Forget Your Password?</Link>
              <Button color="white" backgroundColor="#63A9BF" onClick={handleLoginSubmit} w="full">Sign In</Button>
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
