const presetService = require('../services/presetService');

const createPreset = async (req, res) => {
    const { name, focusTime, breakTime } = req.body;
    const userId = req.user._id;

    console.log(`Creating preset: Name: ${name}, Focus Time: ${focusTime}, Break Time: ${breakTime}, User: ${userId}`);

    if (!name || !focusTime || !breakTime || !userId) {
        console.error('Missing required fields:', { name, focusTime, breakTime, userId });
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const preset = await presetService.createPreset(name, focusTime, breakTime, userId);
        res.status(201).json(preset);
    } catch (error) {
        console.error('Error creating preset:', error);
        res.status(400).json({ message: error.message });
    }
};

const getPresets = async (req, res) => {
    const userId = req.user._id;

    console.log(`Fetching presets for user: ${userId}`);

    try {
        const presets = await presetService.getPresetsByUser(userId);
        res.status(200).json(presets);
    } catch (error) {
        console.error('Error fetching presets:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createPreset,
    getPresets
};
