import React, { useState, useEffect } from 'react';
import { VStack, Avatar, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { getUserProfile, updateUserProfile } from '../../../services/authService';

const ProfileInfo = () => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserData(profile);
        setUsername(profile.username);
        setBio(profile.bio);
        setProfilePicture(profile.profilePicture);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleUpdateProfile = async () => {
    const profileData = {
      username,
      bio,
      profilePicture: document.getElementById('profile-picture').files[0], // Use file from input
    };

    try {
      const updatedProfile = await updateUserProfile(profileData);
      setUserData(updatedProfile);
      console.log('Profile updated:', updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <VStack spacing={4} w="full">
      <Avatar size="2xl" src={userData?.profilePicture || ''} />
      <Text fontSize="xl" fontWeight="bold">{userData?.username}</Text>
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
