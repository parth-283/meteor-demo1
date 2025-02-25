import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuContext from '../Contexts/menu'

const NavDropDown = ({ routeList, title, isOpen, setIsOpen }) => {
    const value = useContext(MenuContext)
    const dropdownRef = useRef(null);
    const { isMenuOpen } = value.state
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

    return (
        <>
            <div className={`dropdown-container  ${isOpen && 'dropdown-open'}`} ref={dropdownRef}>
                <div className='dropdown-header' onClick={() => setIsOpen(!isOpen)}>
                    <p className="sidebar-nav-list">{title}</p>
                    <img src={`/assets/svgs/downArrow.svg`} className={`clickable-svg-icons dropdown-icon`} alt="down arrow toggle" width={20} />
                </div>

                <ul className='dropdown-menu-list'>
                    {routeList?.map((route, index) => {
                        return (
                            <li key={route.label + index}>
                                <p className="sidebar-nav-list" onClick={() => {
                                    value.setIsMenuOpen(!isMenuOpen)
                                    setIsOpen(false)
                                    navigate(route.path)
                                }}>
                                    {route.label}
                                </p>
                            </li>
                        )
                    })}

                </ul>
            </div >
        </>
    )
}

export default NavDropDown