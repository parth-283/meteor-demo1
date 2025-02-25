import React, { useContext, useEffect, useRef, useState } from 'react'
import MenuContext from '../Contexts/menu'
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import NavDropDown from './NavDropDown';

const Sidebar = () => {
    let value = useContext(MenuContext)
    const { isMenuOpen, hasRole, currentUserRole } = value.state
    const navigate = useNavigate();
    const sidebarRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)
    const user = useTracker(() => Meteor.user());

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                value.setIsMenuOpen(false);
                setIsOpen(false)
            }
        };

        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                <div className="sidebar" ref={sidebarRef}>
                    <div className='sidebar-header'>
                        <h1>Demo Version</h1>
                        <img src={`/assets/svgs/menu-open.svg`} alt="Menu Open" className='clickable-svg-icons' width={25} onClick={(e) => handleClose(e)} />
                    </div>

                    <ul>
                        {user ? <>
                            {currentUserRole.includes('admin') ? <>
                                <li>
                                    <p className="sidebar-nav-list" onClick={() => {
                                        value.setIsMenuOpen(!isMenuOpen)
                                        navigate('/admin')
                                    }}>
                                        Dashboard
                                    </p>
                                </li>

                                <li>
                                    <NavDropDown isOpen={isOpen} setIsOpen={setIsOpen} title="Lists" routeList={[{ label: 'To Do List', path: '/' }, { label: 'Admins List', path: '/admin/list' }, { label: 'Users List', path: '/admin/users' }, { label: 'Contacts List', path: '/admin/contacts' }]} />
                                </li>
                            </> : <li>
                                <p className="sidebar-nav-list" onClick={() => {
                                    value.setIsMenuOpen(!isMenuOpen)
                                    navigate('/')
                                }}>
                                    Home
                                </p>
                            </li>}
                            <li>
                                <p className="sidebar-nav-list" onClick={() => {
                                    value.setIsMenuOpen(!isMenuOpen)
                                    navigate('/change-password')
                                }}>
                                    Change Password
                                </p>
                            </li>
                        </> : <>
                            <li>
                                <p className="sidebar-nav-list" onClick={() => {
                                    value.setIsMenuOpen(!isMenuOpen)
                                    navigate('/register')
                                }}>
                                    Register
                                </p>
                            </li>
                            <li>
                                <p className="sidebar-nav-list" onClick={() => {
                                    value.setIsMenuOpen(!isMenuOpen)
                                    navigate('/login')
                                }}>
                                    Login
                                </p>
                            </li>
                        </>}
                        <>
                            <li>
                                <p className="sidebar-nav-list" onClick={() => {
                                    value.setIsMenuOpen(!isMenuOpen)
                                    navigate('/contact')
                                }}>
                                    Contact Us
                                </p>
                            </li>
                            {user &&
                                <li>
                                    <p className="sidebar-nav-list" onClick={logout}>
                                        LogOut
                                    </p>
                                </li>}
                        </>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar