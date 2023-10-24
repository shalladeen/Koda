import React, {useState} from "react";
import '../Todo/TodoStyle.css';


const Todo = () =>{

    const [inputTitle, setinputTitle] = useState("");
    const [inputDesc, setinputDesc] = useState("");
    const [items, setitems] = useState ([
        {
        id: "001",
        name: "'Default task",
        desc: "Default Description",
        status: false,
        }
    ])

    const handleAdd = () =>{
        // Create a new task object
    const newTask = {
        id: Date.now().toString(), // Generate a unique ID
        name: inputTitle,
        desc: inputDesc,
        status: false,
    };

    // Update the state to add the new task
    setitems([...items, newTask]);

    // Clear the input fields
    setinputTitle("");
    setinputDesc("");
    };

    return (
        <div className ="container">
            <div className ="text-end">
                <button className="add" onClick={handleAdd}>
                    Add New Task
                </button>
            </div>
        
            <div className ="container">
                <div className ="row">
                    <div className="text-center">
                        <h2></h2>
                    </div>
                    <form className="task">
                        <label htmlFor="task" className="label">
                            Enter Title
                        </label>
                        <input type="text" name="title" id="title" placeholder="title"/>

                        <label className ="taskD" htmlFor="description">
                            Enter
                        </label>
                        <input type="text" name="description" id="descriptin" placeholder="Description"/>

                        <button className="save">Save</button>
                    </form>
                </div>
            </div>
        </div>

        
    )
}



export default Todo