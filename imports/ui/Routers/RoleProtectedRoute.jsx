// Routers/RoleProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/roles';

const RoleProtectedRoute = ({ roles, children }) => {
    const user = Meteor.userId();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const hasRole = roles.some(role => Roles.userIsInRoleAsync(user, role));

    return hasRole ? children : <Navigate to="/" />;
};

export default RoleProtectedRoute;