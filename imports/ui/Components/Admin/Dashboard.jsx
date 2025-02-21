import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [counter, setCounter] = useState({ users: 0, admins: 0, tasks: 0, completedTasks: 0 })

    useEffect(() => {
        Meteor.callAsync('getTotalUsersCount').then((result) => {
            setCounter((prevCounter) => ({ ...prevCounter, users: result }))
        })
        Meteor.callAsync('getTotalAdminsCount').then((result) => {
            setCounter((prevCounter) => ({ ...prevCounter, admins: result }))
        })
        Meteor.callAsync('getTotalTasksCount').then((result) => {
            setCounter((prevCounter) => ({ ...prevCounter, tasks: result }))
        })
        Meteor.callAsync('getTotalCompletedTasksCount').then((result) => {
            setCounter((prevCounter) => ({ ...prevCounter, completedTasks: result }))
        })
    }, [])

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Total Users</h2>
                    <p>{counter.users}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Total Admins</h2>
                    <p>{counter.admins}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Total Tasks</h2>
                    <p>{counter.tasks}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Total Completed Tasks</h2>
                    <p>{counter.completedTasks}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard