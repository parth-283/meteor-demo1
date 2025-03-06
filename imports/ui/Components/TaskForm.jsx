import React, { useContext, useState } from "react";
import MenuContext from "../Contexts/menu";

export const TaskForm = ({ tasks }) => {
    let value = useContext(MenuContext)
    const { hideCompleted } = value.state
    const [error, setError] = useState({});
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(tasks, "tasks");
        let CheckTasks = tasks.filter((tf) => tf.text === text);

        if (!text) {
            setError({ reason: "Task are required." })
            return
        } else if (CheckTasks.length > 0) {
            setError({ reason: "Your task already added." })
            return
        }

        await Meteor.callAsync("tasks.insert", {
            text: text.trim(),
            createdAt: new Date(),
        });

        setText("");
        setError(null)
    };

    return (
        <div className="task-form-container">
            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="task"
                    placeholder="Type to add new tasks"
                    value={text}
                    onChange={(e) => {
                        setError(null)
                        setText(e.target.value)
                    }}
                />

                <button id="add-todo-btn" type="submit">Add Task</button>

                <div className="filter">
                    <button onClick={() => value.setHideCompleted(!hideCompleted)}>
                        {hideCompleted ? 'Show All' : 'Hide Completed'}
                    </button>
                </div>
            </form>
            <div className="error-header">
                <p id="error-message">{error?.reason}</p>
            </div>
        </div>
    );
};