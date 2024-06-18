import React, { useState } from 'react';
import { VStack, Avatar, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const ProfileInfo = () => {
  const { user, updateUserProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState(user?.bio || '');
  const toast = useToast();

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
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    await updateUserProfile(formData);
  };

  return (
    <VStack spacing={4} w="full">
      <Avatar size="2xl" src={user?.profilePicture ? `http://localhost:5000/${user.profilePicture}` : undefined} />
      <FormControl id="profile-picture">
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
      </FormControl>
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={handleUsernameChange} />
      </FormControl>
      <FormControl id="bio">
        <FormLabel>Bio</FormLabel>
        <Input value={bio} onChange={handleBioChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleUpdateProfile}>Update Profile</Button>
    </VStack>
  );
};

export default ProfileInfo;
