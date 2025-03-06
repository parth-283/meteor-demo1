import React, { useContext } from 'react'
import { TasksCollection } from '../api/Collections/TasksCollection.js';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import MenuContext from './Contexts/menu.jsx';
/* Import SVGs */

function Header() {
    let value = useContext(MenuContext)
    const { isMenuOpen } = value.state

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
                        <Link to={'/'}>
                            <h1>
                                📝️ To Do List
                                {pendingTasksTitle}
                            </h1>
                        </Link>

                        <div>
                            <img src={`/assets/svgs/menu-${isMenuOpen ? 'open' : 'close'}.svg`} id='menu-toggle' alt={isMenuOpen ? "Menu Open" : "Menu Close"} className='clickable-svg-icons' width={25} onClick={() => value.setIsMenuOpen(!isMenuOpen)} />
                        </div>
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header