import React, { useEffect, useState } from 'react'
import SEO from '../SEO'

const Dashboard = () => {
    const [counter, setCounter] = useState([])

    useEffect(() => {
        Meteor.callAsync('getDashboardCounter').then((result) => {
            setCounter(result)
        })
    }, [])

    return (
        <>
            <SEO
                title="Dashboard | Demo1"
                description="Welcome to dashboard"
                url="/admin"
            />

            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="dashboard-cards">
                    {counter.map((item, index) => {
                        return (
                            <div key={item.title + index} className="dashboard-card">
                                <h2>{item.title}</h2>
                                <p>{item.counter}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Dashboard