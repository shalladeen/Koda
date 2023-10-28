import React, { useState } from "react";
import '..//Tasks/TaskStyle.css';

function Task({ items: taskItems }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [editedTaskDesc, setEditedTaskDesc] = useState("");
    const [items, setItems] = useState(taskItems);

    const handleEditTask = (taskId) => {
        setSelectedTask(taskId);
        const selectedTask = taskItems.find(item => item.id === taskId);
        setEditedTaskName(selectedTask.name);
        setEditedTaskDesc(selectedTask.desc);
    };

    const handleSaveChanges = () => {
        const updatedItems = taskItems.map(item => {
            if (item.id === selectedTask) {
                return { ...item, name: editedTaskName, desc: editedTaskDesc };
            }
            return item;
        });

        setItems(updatedItems);
        localStorage.setItem('tasks', JSON.stringify(updatedItems));
        setSelectedTask(null);
    };

    return (
        <div className="taskpage">
            <h1 className="tasktitle">My Tasks</h1>
            <div className="tasklist-container">
                {taskItems.map((item) => (
                    <div key={item.id} className="task-container">
                        <div
                            className={`items ${item.id === selectedTask ? "active" : ""}`}
                            onClick={() => handleEditTask(item.id)}
                        >
                            {item.name}: {item.desc}
                        </div>
                        <div className={`edit-form ${item.id === selectedTask ? "active" : ""}`}>
                            <input className="edit-form-input"
                                type="text"
                                value={editedTaskName}
                                onChange={(e) => setEditedTaskName(e.target.value)}
                            />
                            <textarea className="edit-form-description"
                                value={editedTaskDesc}
                                onChange={(e) => setEditedTaskDesc(e.target.value)}
                            />
                            <button onClick={handleSaveChanges} className="edit-button">Save Changes</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
