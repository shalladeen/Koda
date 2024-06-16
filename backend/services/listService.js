const mongoose = require('mongoose');
const List = require('../models/List');

const createList = async (userId, name) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID format');
  }

  const list = new List({ name, user: userId });
  await list.save();
  return list;
};

const getLists = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID format');
  }

  return await List.find({ user: userId });
};

const updateList = async (id, name) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid list ID format');
  }

  const list = await List.findById(id);
  if (list) {
    list.name = name;
    await list.save();
  }
  return list;
};

const deleteList = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid list ID format');
  }

  return await List.findByIdAndDelete(id);
};

const addDefaultLists = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID format');
  }

  const defaultLists = ['Work', 'School', 'Personal'];

  const existingLists = await List.find({ user: userId });
  const existingListNames = existingLists.map(list => list.name);

  for (const listName of defaultLists) {
    if (!existingListNames.includes(listName)) {
      await createList(userId, listName);
    }
  }
};

module.exports = {
  createList,
  getLists,
  updateList,
  deleteList,
  addDefaultLists,
};
