import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { LoginPage } from '@/pages/Login';

export const router = createBrowserRouter([
    {
        element: <LoginPage />,
        path: routes.auth.login,
    },
]);
