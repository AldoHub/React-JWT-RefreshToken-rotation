import { useLocation, Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
   
    const { auth } = useAuth();
    const location = useLocation();
    //console.log('Auth component init', auth)

    return (
        auth ? <Outlet /> : <Navigate to='/auth/login' state={{ from: location }} replace />
    )
};

export default RequireAuth;