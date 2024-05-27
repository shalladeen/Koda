const Note = require('../models/Note');

const createNote = async (userId, title, content, tag) => {
  const note = new Note({
    title,
    content,
    tag,
    user: userId
  });
  await note.save();
  return note;
};

const getNotes = async (userId) => {
  return await Note.find({ user: userId });
};

const updateNote = async (noteId, title, content, tag) => {
  const note = await Note.findById(noteId);
  if (note) {
    note.title = title;
    note.content = content;
    note.tag = tag;
    note.updatedAt = Date.now();
    await note.save();
  }
  return note;
};

const deleteNote = async (noteId) => {
  return await Note.findByIdAndDelete(noteId);
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote
};
