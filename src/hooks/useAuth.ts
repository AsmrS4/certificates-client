import { fetchSession } from '@/api/auth';
import type { AuthContextType } from '@/models/auth';
import { AuthContext } from '@/router/AuthContext';
import { useContext } from 'react';
import { useErrorHandler } from './useErrorHandler';

interface UseAuth {
    context: AuthContextType;
    handleValidateSession: () => Promise<void>;
}

export const useAuth = (): UseAuth => {
    const context = useContext(AuthContext);
    const { handleError, clearError } = useErrorHandler();
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const handleValidateSession = async (): Promise<void> => {
        try {
            clearError();
            context.setLoading(true);
            const res = await fetchSession();
            console.log(res);
            if (res) context.setIsAuthenticated(true);
        } catch (error) {
            handleError(error);
            context.setIsAuthenticated(false);
        } finally {
            context.setLoading(false);
        }
    };

    return { context, handleValidateSession };
};
