import React, { useContext } from 'react'
import { TasksCollection } from '../api/TasksCollection.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, useNavigate } from 'react-router-dom';
import MenuContext from './Context/menu.jsx';
/* Import SVGs */

function Header() {
    let value = useContext(MenuContext)
    const { hideCompleted, isMenuOpen } = value.state

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
                            <button onClick={() => value.setHideCompleted(!hideCompleted)}>
                                {hideCompleted ? 'Show All' : 'Hide Completed'}
                            </button>
                        </div>}
                        <div>
                            <img src={`/assets/svgs/menu-${isMenuOpen ? 'open' : 'close'}.svg`} alt={isMenuOpen ? "Menu Open" : "Menu Close"} className='clickable-svg-icons' width={25} onClick={() => value.setIsMenuOpen(!isMenuOpen)} />
                        </div>
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header