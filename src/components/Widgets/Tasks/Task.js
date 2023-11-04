import React, { useState, useEffect } from "react";
import '..//Tasks/TaskStyle.css';

function Task({ items: taskItems }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [editedTaskDesc, setEditedTaskDesc] = useState("");
    const [items, setItems] = useState([]);

    // Function to save tasks to local storage
    const saveTasksToLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to retrieve tasks from local storage
    const getTasksFromLocalStorage = () => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Load tasks from local storage when the component mounts
    useEffect(() => {
        const savedTasks = getTasksFromLocalStorage();
        setItems(savedTasks);
    }, []);

    const handleEditTask = (taskId) => {
        setSelectedTask(taskId);
        const selectedTask = items.find(item => item.id === taskId);
        setEditedTaskName(selectedTask.name);
        setEditedTaskDesc(selectedTask.desc);
    };

    const handleSaveChanges = () => {
        const updatedItems = items.map(item => {
            if (item.id === selectedTask) {
                return { ...item, name: editedTaskName, desc: editedTaskDesc };
            }
            return item;
        });

        // Update the state with the edited task using setItems
        setItems(updatedItems);

        // Save the updated tasks in local storage
        saveTasksToLocalStorage(updatedItems);

        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this task?");
        
        if (shouldDelete) {
            const updatedItems = items.filter(item => item.id !== taskId);
    
            // Update the state with the deleted task using setItems
            setItems(updatedItems);
    
            // Save the updated tasks in local storage
            saveTasksToLocalStorage(updatedItems);
        }
    };
    

    return (
        <div className="taskpage">
            <h1 className="tasktitle">My Tasks</h1>
            <div className="tasklist-container">
                {items.map((item) => (
                    <div key={item.id} className="task-container">
                        <div
                            className={`items ${item.id === selectedTask ? "active" : ""}`}
                            onClick={() => handleEditTask(item.id)}
                        >
                            {item.name}: {item.desc}
                        </div>
                        <div className={`edit-form ${item.id === selectedTask ? "active" : ""}`}>
                            <h1 className="edit-task-title">Edit Task</h1>
                            <input className="edit-form-input"
                                type="text"
                                value={editedTaskName}
                                onChange={(e) => setEditedTaskName(e.target.value)}
                            />
                            <textarea className="edit-form-description"
                                value={editedTaskDesc}
                                onChange={(e) => setEditedTaskDesc(e.target.value)}
                            />
                            <div className="edit-buttons">
                            <button onClick={handleSaveChanges} className="edit-button">Save Changes</button>
                            <button onClick={() => handleDeleteTask(item.id)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
