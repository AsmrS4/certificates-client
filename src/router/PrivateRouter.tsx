import { Navigate, Outlet } from 'react-router-dom';
import { routes } from './routes';
import { useAuth } from '@/hooks/useAuth';

const PrivateRouter = () => {
    const { context } = useAuth();
    //if (!context.isAuthenticated) return <Navigate to={routes.auth.login} replace />;

    return <Outlet />;
};

export default PrivateRouter;
