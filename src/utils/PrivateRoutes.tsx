import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../shared/context/AuthContext';
const PrivateRoutes = () => {
	const authContext = useContext(AuthContext);
	return (
		authContext.auth.token ? <Outlet /> : <Navigate to='/login' />
	);
};

export default PrivateRoutes;