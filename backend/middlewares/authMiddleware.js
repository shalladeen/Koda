const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received in middleware:', token); // Log the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded); // Log the decoded token

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        throw new Error('User not found');
      }
      console.log('User attached to request:', req.user); // Log the user
      next();
    } catch (error) {
      console.error('Token validation error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
