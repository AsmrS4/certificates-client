import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthLoginHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { context } = useAuth();
    const handleExchangeSession = async (): Promise<void> => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const returnUrl = params.get('returnUrl');
        context.setIsAuthenticated(true);

        token && navigate(returnUrl || '/', { replace: true });
    };
    useEffect(() => {
        let isMounted = true;

        const init = async () => {
            if (isMounted) {
                await handleExchangeSession();
            }
        };
        init();

        return () => {
            isMounted = false;
        };
    }, [navigate, location]);

    return <div>Завершение авторизации...</div>;
};
