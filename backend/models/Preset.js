const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    focusTime: {
        type: Number,
        required: true
    },
    breakTime: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Preset', presetSchema);
