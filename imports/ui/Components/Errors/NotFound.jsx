import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-message">Oops! Page Not Found</h2>
            <p className="not-found-description">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="not-found-link">Go Back to Home</Link>
        </div>
    )
}

export default NotFound