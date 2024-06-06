const Preset = require('../models/Preset');

const createPreset = async (name, focusTime, breakTime, userId) => {
    const preset = new Preset({
        name,
        focusTime,
        breakTime,
        user: userId
    });
    console.log(`Creating preset: Name: ${name}, Focus Time: ${focusTime}, Break Time: ${breakTime}, User: ${userId}`);
    return await preset.save();
};

const getPresetsByUser = async (userId) => {
    console.log(`Fetching presets for user: ${userId}`);
    return await Preset.find({ user: userId });
};

module.exports = {
    createPreset,
    getPresetsByUser
};
