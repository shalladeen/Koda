const mongoose = require('mongoose');

const NoteFolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
    });

const NoteFolder = mongoose.model('NoteFolder', NoteFolderSchema);

module.exports = NoteFolder;