const authService = require('../services/authService');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await authService.register(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const checkUsernameAvailability = async (req, res) => {
    const { username } = req.query;

    try {
        const available = await authService.isUsernameAvailable(username);
        res.status(200).json({ available });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    checkUsernameAvailability
};
