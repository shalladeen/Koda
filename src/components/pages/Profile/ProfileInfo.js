import React, { useState } from 'react';
import { VStack, Avatar, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const ProfileInfo = () => {
  const { user, updateUserProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
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
