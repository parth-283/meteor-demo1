import React, { useContext } from "react";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from "../api/TasksCollection";
import { TaskForm } from "./TaskForm";
import MenuContext from "./Context/menu";

export const Task = () => {
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

    if (isLoading()) {
        return <div>Loading...</div>;
    }

    return (
        <>
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
                            <span>{task.text}</span>
                            <button onClick={() => handleDelete(task)}>&times;</button>
                        </li>
                    ))
                }
            </ul>

        </>
    );
};