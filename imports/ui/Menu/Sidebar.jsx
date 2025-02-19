import React, { useContext } from 'react'
import MenuContext from '../Contexts/menu'
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

const Sidebar = () => {
    const navigate = useNavigate();
    let value = useContext(MenuContext)
    const { isMenuOpen } = value.state

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout(() => {
        value.setIsMenuOpen(!isMenuOpen)
        navigate('/login')
    });

    const handleClose = (e) => {
        e.stopPropagation()
        value.setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <div className={`overlay ${isMenuOpen ? "open" : ""}`}>
                <div className="sidebar">
                    <div className='sidebar-header'>
                        <h1>Demo Version</h1>
                        <img src={`/assets/svgs/menu-open.svg`} alt="Menu Open" className='clickable-svg-icons' width={25} onClick={(e) => handleClose(e)} />
                    </div>

                    <ul>
                        {user && <li>
                            <div className="user" onClick={logout}>
                                🚪 LogOut
                            </div>
                        </li>}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar