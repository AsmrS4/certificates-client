import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

export const App = () => {
    const { handleValidateSession } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            if (isMounted) {
                handleValidateSession();
            }
        };
        init();
        return () => {
            isMounted = false;
        };
    }, []);

    return <RouterProvider router={router} />;
};
