import React from 'react'
import { TasksCollection } from '../api/TasksCollection.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, useNavigate } from 'react-router-dom';

function Header({ hideCompleted, setHideCompleted }) {
    const navigate = useNavigate();
    const logout = () => Meteor.logout(() => navigate('/login'));
    const user = useTracker(() => Meteor.user());

    const pendingTasksCount = useTracker(() => {
        if (!user) {
            return 0;
        }

        return TasksCollection.find({ isChecked: { $ne: true } }).count()
    });

    const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`;

    return (
        <>
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>
                            📝️ To Do List
                            {pendingTasksTitle}
                        </h1>

                        <nav>
                            {!user &&
                                <>
                                    <Link to="/register">Register</Link> | {" "}
                                    <Link to="/login">Login</Link>
                                </>
                            }
                        </nav>


                        {user && <div className="filter">
                            <button onClick={() => setHideCompleted(!hideCompleted)}>
                                {hideCompleted ? 'Show All' : 'Hide Completed'}
                            </button>

                            <div className="user" onClick={logout}>
                                {user.username} 🚪
                            </div>
                        </div>}
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header