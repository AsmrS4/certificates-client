import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { LoginPage } from '@/pages/Login';
import { CertificatesPage } from '@/pages/Certificates';
import { AuthLoginHandler } from '@/pages/AuthHandler';
import PrivateRouter from './PrivateRouter';
import { Layout } from '@/components/Layout';
import { RecoveryPage } from '@/pages/Recovery';

export const router = createBrowserRouter([
    {
        element: <LoginPage />,
        path: routes.auth.login,
    },
    {
        element: <AuthLoginHandler />,
        path: routes.auth.oauth,
    },
    {
        element: <PrivateRouter />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        element: <CertificatesPage />,
                        path: routes.root,
                    },
                    {
                        element: <CertificatesPage />,
                        path: routes.certificates.home,
                    },
                    {
                        element: <RecoveryPage />,
                        path: routes.certificates.recovery,
                    },
                ],
            },
        ],
    },
]);
