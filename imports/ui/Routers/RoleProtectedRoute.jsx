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

        Meteor.callAsync('getUserRoles').then((result) => value.setCurrentUserRole(result));

        Meteor.callAsync('checkUserRoles', roles).then((result) => {
            value.setHasRole(result);
            setIsLoading(false);
        });

    }, [userId]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return hasRole ? children : <Navigate to="/" replace />;
};

export default RoleProtectedRoute;