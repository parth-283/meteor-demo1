import React, { useContext, useState } from "react";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from "../../api/Collections/TasksCollection";
import { TaskForm } from "./TaskForm";
import MenuContext from "../Contexts/menu";
import LoadingPage from "./LoadingPage";

export const Task = () => {
    const [isEditId, setIsEditId] = useState('')
    const [editedValue, setEditedValue] = useState('')
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

    const handleToggleEdit = (task) => {
        if (!isEditId || isEditId !== task._id) {
            setEditedValue(task.text)
            setIsEditId(task._id)
        } else {
            setIsEditId("")
            Meteor.callAsync("tasks.edit", { _id: task._id, editedValue })
        }
    };

    if (isLoading()) {
        return <LoadingPage />
    }

    return (
        <>
            <SEO
                title="TO DO | Demo1"
                description="Welcome to todo"
                url="/"
            />

            <div className="task-container">
                <TaskForm tasks={tasks} />

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

                                <span className="truncate"> {isEditId !== task._id ? task.text : <input type="text" value={editedValue || task.text} onChange={(e) => setEditedValue(e.target.value)} />} </span>

                                <div className="button-list">
                                    <button onClick={() => handleDelete(task)} className="button-delete">
                                        <img src={`/assets/svgs/delete.svg`} className='clickable-svg-icons pass-eye-icon' alt="delete-icon" width={20} />
                                    </button>

                                    <button onClick={() => handleToggleEdit(task)} className="button-edit">
                                        <img src={`/assets/svgs/${isEditId == task._id ? 'save' : 'edit'}.svg`} className='clickable-svg-icons pass-eye-icon' alt="edit-icon" width={20} />
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