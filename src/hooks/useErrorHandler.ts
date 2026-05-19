import { useCallback, useState } from 'react';
import { isAxiosError } from 'axios';
import { errors } from '@/constants/messages';

export const useErrorHandler = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleError = useCallback((error: unknown) => {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
            switch (error.response?.status) {
                case 400:
                    setErrorMessage(error.response?.data?.detail || errors.client);
                    break;
                case 401:
                    setErrorMessage(error.response?.data?.detail || errors.auth);
                    break;
                case 403:
                    setErrorMessage(error.response?.data?.detail || errors.forbidden);
                    break;
                case 404:
                    setErrorMessage(error.response?.data?.detail || errors.not_found);
                    break;
                default:
                    setErrorMessage(error.response?.data?.detail || errors.internal_server);
            }
        } else {
            setErrorMessage(errors.default);
        }
    }, []);

    const clearError = useCallback(() => {
        setErrorMessage(null);
    }, []);

    return { errorMessage, handleError, clearError };
};
