import React, { useContext, useState } from "react";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from "../../api/Collections/TasksCollection";
import { TaskForm } from "./TaskForm";
import MenuContext from "../Contexts/menu";

export const Task = () => {
    const [isEdit, setIsEdit] = useState(false)
    let value = useContext(MenuContext)
    const { hideCompleted } = value.state
    const isLoading = useSubscribe("tasks");
    const user = useTracker(() => Meteor.user());

    const tasks = useTracker(() => {
        if (!user) {
            return [];
        }

        return TasksCollection.find(
            hideCompleted ? { isChecked: { $ne: true } } : {},
            {
                sort: { createdAt: -1 },
            }
        ).fetch();
    });

    const handleToggleChecked = ({ _id, isChecked }) => Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });

    const handleDelete = ({ _id }) => Meteor.callAsync("tasks.delete", { _id });

    const handleToggleEdit = ({ _id, text }) => Meteor.callAsync("tasks.edit", { _id, text });

    if (isLoading()) {
        return <div className="loading-section"><span className="loading-text">Loading...</span></div>;
    }

    return (
        <>
            <div className="task-container">
                <TaskForm />

                <ul className="tasks">
                    {
                        tasks.map((task) => (
                            <li key={task._id}>
                                <input
                                    type="checkbox"
                                    checked={!!task.isChecked}
                                    onClick={() => handleToggleChecked(task)}
                                    readOnly
                                />

                                <span> {isEdit ? task.text : <input type="text" value={task.text} onChange={(e) => handleToggleEdit(task._id, e.target.value)} readOnly />} </span>

                                <div className="button-list">
                                    <button onClick={() => handleDelete(task)} className="button-delete">
                                        <img src={`/assets/svgs/delete.svg`} className='clickable-svg-icons pass-eye-icon' alt="delete-icon" width={20} />
                                    </button>
                                    <button onClick={() => setIsEdit(!isEdit)} className="button-edit">
                                        <img src={`/assets/svgs/edit.svg`} className='clickable-svg-icons pass-eye-icon' alt="edit-icon" width={20} />
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </>
    );
};