import { ACCESS_TOKEN } from '@/constants/key';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from './routes';

const PrivateRouter = () => {
    const isAuthenticated: string | boolean = localStorage.getItem(ACCESS_TOKEN) || true;

    if (!isAuthenticated) return <Navigate to={routes.auth.login} replace />;

    return <Outlet />;
};

export default PrivateRouter;
