import React, { useState } from "react";
import '..//Tasks/TaskStyle.css';

function Task({ items }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [editedTaskDesc, setEditedTaskDesc] = useState("");

    // Define setItems and initialize it with the items prop
    const [updatedItems, setItems] = useState(items);

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

        // Optionally, update local storage to persist changes
        localStorage.setItem('tasks', JSON.stringify(updatedItems));

        // Clear the selected task
        setSelectedTask(null);
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
                        {item.id === selectedTask && (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editedTaskName}
                                    onChange={(e) => setEditedTaskName(e.target.value)}
                                />
                                <textarea
                                    value={editedTaskDesc}
                                    onChange={(e) => setEditedTaskDesc(e.target.value)}
                                />
                                <button onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
