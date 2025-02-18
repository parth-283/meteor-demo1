import React from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!Meteor.userId();

    return isAuthenticated ? children : <Navigate to="/login" replace={true} />
};

export default ProtectedRoute;