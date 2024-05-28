const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

module.exports = {
  register,
  login,
};
