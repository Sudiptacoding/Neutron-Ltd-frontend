import React, { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../common/Loader';

const ProtectedRoute = ({ children }) => {
    const { user, loader } = useContext(UserProvider)

    if (loader) {
        return <Loader></Loader>
    }

    if (user) {
        return children
    }
    // return <Navigate state={location.pathname} to='/login'></Navigate>
    return <Navigate to='/login'></Navigate>
};

export default ProtectedRoute;