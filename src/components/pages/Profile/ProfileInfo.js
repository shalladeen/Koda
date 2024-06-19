import React, { useState, useEffect } from 'react';
import { VStack, Avatar, FormControl, FormLabel, Input, Button, useToast, Text, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ProfileInfo = () => {
  const { user, updateUserProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState(user?.bio || '');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username && user && username !== user.username) {
        setIsCheckingUsername(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/check-username?username=${username}`);
          setIsUsernameAvailable(response.data.available);
        } catch (error) {
          console.error('Error checking username availability:', error);
          setIsUsernameAvailable(false);
        } finally {
          setIsCheckingUsername(false);
        }
      } else {
        setIsUsernameAvailable(true);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      checkUsernameAvailability();
    }, 500); // Delay in ms to wait before making the call

    return () => clearTimeout(delayDebounceFn);
  }, [username, user]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const fileSizeLimit = 5 * 1024 * 1024; // 5 MB
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && !validFileTypes.includes(file.type)) {
      toast({
        title: "Invalid file type.",
        description: "Please upload an image file (jpeg, png, gif).",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (file && file.size > fileSizeLimit) {
      toast({
        title: "File too large.",
        description: "The file size limit is 5MB. Please upload a smaller file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setProfilePicture(file);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleUpdateProfile = async () => {
    if (!isUsernameAvailable) {
      toast({
        title: "Username not available.",
        description: "Please choose a different username.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    await updateUserProfile(formData);
  };

  // loading state
  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack spacing={4} w="full">
      <Avatar size="2xl" src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : undefined} />
      <FormControl id="profile-picture">
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
      </FormControl>
      <FormControl id="username" isInvalid={!isUsernameAvailable}>
        <FormLabel>Username</FormLabel>
        <InputGroup>
          <Input value={username} onChange={handleUsernameChange} />
          <InputRightElement>
            {isCheckingUsername ? (
              <Spinner size="sm" />
            ) : username && (isUsernameAvailable ? (
              <Text color="green.500">✓</Text>
            ) : (
              <Text color="red.500">✗</Text>
            ))}
          </InputRightElement>
        </InputGroup>
        {!isUsernameAvailable && <Text color="red.500">Username is already taken</Text>}
      </FormControl>
      <FormControl id="bio">
        <FormLabel>Bio</FormLabel>
        <Input value={bio} onChange={handleBioChange} />
      </FormControl>
      <Button 
        colorScheme="blue" 
        onClick={handleUpdateProfile} 
        isDisabled={!isUsernameAvailable || isCheckingUsername}
      >
        Update Profile
      </Button>
    </VStack>
  );
};

export default ProfileInfo;
