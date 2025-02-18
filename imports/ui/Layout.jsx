import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router';
import Sidebar from './Menu/Sidebar';

function Layout() {
    return (

        <div className="app">
            <Header />

            <div className="main">

                <Outlet />

            </div>

            <div >
                <Sidebar />
            </div>
        </div>
    )
}

export default Layout