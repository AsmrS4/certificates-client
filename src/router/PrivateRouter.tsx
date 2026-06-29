import { Navigate, Outlet } from 'react-router-dom';

import { routes } from './routes';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { logoutUser } from '@/api/auth';

const PrivateRouter = () => {
    const { context, handleValidateSession } = useAuth();
    const handleLogout = async () => {
        await logoutUser();
    };
    useEffect(() => {
        handleValidateSession();
    }, []);

    if (context.loading) {
        return <div>Loading...</div>;
    }

    if (!context.isAuthenticated) {
        handleLogout();
        return <Navigate to={routes.auth.login} replace />;
    }

    return <Outlet />;
};

export default PrivateRouter;
