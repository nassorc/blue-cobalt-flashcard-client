import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/auth';

const PrivateRoutes = () => {
  const [authState, authDispatch, isUserAuthenticated] = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const isAuthenticated = isUserAuthenticated();
    setAuthenticated(isAuthenticated)
  }, [])

  if (authenticated === null) {
    return <></>
  }

	return (
		authenticated ? <Outlet /> : <Navigate to='/login' />
	);
};

export default PrivateRoutes;