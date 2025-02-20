import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import LoadingPage from '../Components/LoadingPage';
import MenuContext from '../Contexts/menu';

const RoleProtectedRoute = ({ roles, children }) => {
    let value = useContext(MenuContext)
    const { hasRole } = value.state;
    const [isLoading, setIsLoading] = useState(true);
    const userId = Meteor.userId();

    useEffect(() => {
        if (!userId) {
            value.setHasRole(false);
            setIsLoading(false);
            return;
        }

        Meteor.call('checkUserRoles', roles, (error, result) => {
            if (error) {
                console.error('Error checking roles:', error);
                value.setHasRole(false);
            } else {
                value.setHasRole(result);
            }
            setIsLoading(false);
        });

    }, [userId, roles]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return hasRole ? children : <Navigate to="/" replace />;
};

export default RoleProtectedRoute;