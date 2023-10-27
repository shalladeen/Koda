import React, { useState, useEffect } from "react";
import './TodoStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Task from "../Tasks/Task";

const Todo = () => {
    const [inputTitle, setinputTitle] = useState("");
    const [inputDesc, setinputDesc] = useState("");
    const [items, setitems] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        // Retrieve tasks from local storage when the component mounts
        const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setitems(initialTasks);
    }, []);

    const handleAdd = () => {
        // Create a new task object
        const newTask = {
            id: Date.now().toString(), // Generate a unique ID
            name: inputTitle,
            desc: inputDesc,
            status: false,
        };

        // Update the state to add the new task
        setitems([...items, newTask]);

        // Save the updated tasks to local storage
        localStorage.setItem('tasks', JSON.stringify([...items, newTask]));

        // Clear the input fields
        setinputTitle("");
        setinputDesc("");
    };

    const toggleAddTask = () => {
        setShowAddTask(!showAddTask);
    };

    return (
        <div className="addButtonContainer">
            <div className="addButton">
                <button className="add" onClick={toggleAddTask}>
                    <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#000000" }} className="addTodo" />
                </button>
            </div>
            <div className={`addContainer ${showAddTask ? "active" : ""}`}>
                <div className="row">
                    <div className="text-center">
                        <h2>Add New Task</h2>
                    </div>

                    <form className="formTask">
                        <label htmlFor="title" className="label">
                            Enter Title
                        </label>
                        <input type="text" name="title" id="title" placeholder="title" value={inputTitle} onChange={(e) => setinputTitle(e.target.value)} />

                        <label className="taskD" htmlFor="description">
                            Enter Description
                        </label>
                        <input type="text" name="description" id="description" placeholder="Description" value={inputDesc} onChange={(e) => setinputDesc(e.target.value)} />

                        <button className="save" onClick={handleAdd}>Save</button>
                    </form>
                </div>
            </div>
            <Task items={items} />
        </div>
    );
}

export default Todo;
