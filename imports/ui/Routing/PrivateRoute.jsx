import React from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!Meteor.userId();

    return isAuthenticated ? <Navigate to="/" replace={true} /> : children
};

export default PrivateRoute;