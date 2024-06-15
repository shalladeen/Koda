const List = require('../models/List');

const addDefaultLists = async () => {
  const defaultLists = ['Work', 'School', 'Personal'];

  for (const listName of defaultLists) {
    try {
      const existingList = await List.findOne({ name: listName });
      if (!existingList) {
        const newList = new List({ name: listName });
        await newList.save();
        console.log(`Added default list: ${listName}`);
      } else {
        console.log(`List already exists: ${listName}`);
      }
    } catch (err) {
      console.error(`Error adding list ${listName}:`, err);
    }
  }
};

module.exports = addDefaultLists;
