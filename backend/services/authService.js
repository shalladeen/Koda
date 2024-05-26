const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const register = async (username, email, password) => {
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
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

const login = async (usernameOrEmail, password) => {
    const user = await User.findOne({
        $or: [
            { email: usernameOrEmail },
            { username: usernameOrEmail }
        ]
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    if (await bcrypt.compare(password, user.password)) {
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid credentials');
    }
};

module.exports = {
    register,
    login,
};
