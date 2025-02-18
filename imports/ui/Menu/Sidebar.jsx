import React, { useContext } from 'react'
import MenuContext from '../Context/menu'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    let value = useContext(MenuContext)
    const { isMenuOpen } = value.state

    const logout = () => Meteor.logout(() => navigate('/login'));

    return (
        <>
            <div className={`overlay ${isMenuOpen ? "open" : ""}`}>
                <div className="sidebar">
                    <div className='sidebar-header'>
                        <h1>Demo Version</h1>
                        <img src={`/assets/svgs/menu-open.svg`} alt="Menu Open" className='clickable-svg-icons' width={25} onClick={() => value.setIsMenuOpen(!isMenuOpen)} />
                    </div>


                    <ul>
                        <li>
                            <div className="user" onClick={logout}>
                                LogOut 🚪
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar