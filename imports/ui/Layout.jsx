import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router';

function Layout({ hideCompleted, setHideCompleted }) {
    return (
        <>
            <Header hideCompleted={hideCompleted} setHideCompleted={setHideCompleted} />

            <div className="main">

                <Outlet />

            </div>
        </>
    )
}

export default Layout