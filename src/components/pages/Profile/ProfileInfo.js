import React, { useState } from 'react';
import { VStack, Avatar, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const ProfileInfo = () => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleUpdateProfile = () => {
    // put some logic here later to update profile
    console.log('Profile updated:', { username, profilePicture, bio });
  };

  return (
    <VStack spacing={4} w="full">
      <Avatar size="2xl" src={profilePicture} />
      <FormControl id="profile-picture">
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" onChange={handleProfilePictureChange} />
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
