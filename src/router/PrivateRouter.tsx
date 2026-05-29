import { Navigate, Outlet } from 'react-router-dom';

import { routes } from './routes';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const PrivateRouter = () => {
    const { context, handleValidateSession } = useAuth();
    useEffect(() => {
        handleValidateSession();
    }, []);

    if (context.loading) {
        return <div>Loading...</div>;
    }

    if (!context.isAuthenticated) {
        return <Navigate to={routes.auth.login} replace />;
    }

    return <Outlet />;
};

export default PrivateRouter;
