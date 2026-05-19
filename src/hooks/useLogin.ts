import { useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { loginUser } from '@/api/auth';

export const useLogin = () => {
    const { handleError, errorMessage, clearError } = useErrorHandler();
    const [isLoading, setLoading] = useState<boolean>(false);
    const handleLogin = async (): Promise<void> => {
        try {
            setLoading(true);
            clearError();
            await loginUser();
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    return { isLoading, errorMessage, handleLogin };
};
