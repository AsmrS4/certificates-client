import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthLoginHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const returnUrl = params.get('returnUrl');
        token && navigate(returnUrl || '/', { replace: true });
    }, [navigate, location]);

    return <div>Завершение авторизации...</div>;
};
