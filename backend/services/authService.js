const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('./emailService');
const multer = require('multer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const register = async (username, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Email already exists');
  }

  const userNameExists = await User.findOne({ username });
  if (userNameExists) {
    throw new Error('Username already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    await sendWelcomeEmail(email, username);
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Account does not exist');
  }

  const isMatch = await user.matchPassword(password);
  if (user && isMatch) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUserProfile = async (userId, { username, bio, profilePicture }) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.username = username || user.username;
  user.bio = bio || user.bio;
  if (profilePicture) {
    user.profilePicture = profilePicture;
  }

  await user.save();

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePicture: user.profilePicture,
  };
};

const isUsernameAvailable = async (username) => {
  const user = await User.findOne({ username });
  return !user;
};

module.exports = {
  register,
  login,
  isUsernameAvailable
};
