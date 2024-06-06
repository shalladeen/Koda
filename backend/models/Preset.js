const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presetSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Preset', presetSchema);
