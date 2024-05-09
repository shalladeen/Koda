// src/components/Task/TaskUtils.js
export const loadTasks = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  };
  
  export const loadLists = () => {
    return JSON.parse(localStorage.getItem('lists')) || ['Work', 'School', 'Personal'];
  };
  
  export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  export const saveLists = (lists) => {
    localStorage.setItem('lists', JSON.stringify(lists));
  };
  
  export const addOrUpdateTask = (tasks, newTask) => {
    const updatedTasks = tasks.map(task => task.id === newTask.id ? newTask : task);
    if (!updatedTasks.some(task => task.id === newTask.id)) {
      updatedTasks.push(newTask);
    }
    saveTasks(updatedTasks);
    return updatedTasks;
  };
  
  export const deleteTask = (tasks, taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
    return updatedTasks;
  };
  
  export const addOrUpdateList = (lists, newListName) => {
    const updatedLists = lists.includes(newListName) ? lists : [...lists, newListName];
    saveLists(updatedLists);
    return updatedLists;
  };
  
  export const deleteList = (lists, tasks, listName) => {
    const updatedLists = lists.filter(list => list !== listName);
    const updatedTasks = tasks.map(task => task.list === listName ? { ...task, list: '' } : task);
    saveLists(updatedLists);
    saveTasks(updatedTasks);
    return { updatedLists, updatedTasks };
  };
  