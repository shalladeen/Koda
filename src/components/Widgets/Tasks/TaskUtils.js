export const loadTasks = () => {
  return JSON.parse(localStorage.getItem('tasks')) || [];
};

export const loadLists = () => {
  return JSON.parse(localStorage.getItem('lists')) || [
    { _id: '1', name: 'Work' },
    { _id: '2', name: 'School' },
    { _id: '3', name: 'Personal' }
  ];
};

export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const saveLists = (lists) => {
  localStorage.setItem('lists', JSON.stringify(lists));
};

export const addOrUpdateTask = (tasks, newTask) => {
  const updatedTasks = tasks.map(task => task._id === newTask._id ? newTask : task);
  if (!updatedTasks.some(task => task._id === newTask._id)) {
    updatedTasks.push(newTask);
  }
  saveTasks(updatedTasks);
  return updatedTasks;
};

export const deleteTask = (tasks, taskId) => {
  const updatedTasks = tasks.filter(task => task._id !== taskId);
  saveTasks(updatedTasks);
  return updatedTasks;
};

export const addOrUpdateList = (lists, newList) => {
  const updatedLists = lists.map(list => list._id === newList._id ? newList : list);
  if (!updatedLists.some(list => list._id === newList._id)) {
    updatedLists.push(newList);
  }
  saveLists(updatedLists);
  return updatedLists;
};

export const deleteList = (lists, tasks, listId) => {
  const updatedLists = lists.filter(list => list._id !== listId);
  const updatedTasks = tasks.map(task => task.list === listId ? { ...task, list: '' } : task);
  saveLists(updatedLists);
  saveTasks(updatedTasks);
  return { updatedLists, updatedTasks };
};
