import React, { useContext, useState } from "react";
import MenuContext from "../Contexts/menu";

export const TaskForm = () => {
    let value = useContext(MenuContext)
    const { hideCompleted } = value.state

    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text) return;

        await Meteor.callAsync("tasks.insert", {
            text: text.trim(),
            createdAt: new Date(),
        });

        setText("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type to add new tasks"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">Add Task</button>

            <div className="filter">
                <button onClick={() => value.setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
            </div>
        </form>
    );
};