const List = require('../models/List');

const createList = async (name) => {
  const list = new List({ name });
  await list.save();
  return list;
};

const getLists = async () => {
  return await List.find({});
};

const updateList = async (id, name) => {
  const list = await List.findById(id);
  if (list) {
    list.name = name;
    await list.save();
  }
  return list;
};

const deleteList = async (id) => {
  return await List.findByIdAndDelete(id);
};

const addDefaultLists = async () => {
  const defaultLists = ['Work', 'School', 'Personal'];

  for (const listName of defaultLists) {
    const existingList = await List.findOne({ name: listName });
    if (!existingList) {
      await createList(listName);
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
