import { exchangeSession, fetchSession } from '@/api/auth';
import type { AuthContextType } from '@/models/auth';
import { AuthContext } from '@/router/AuthContext';
import { useContext } from 'react';
import { useErrorHandler } from './useErrorHandler';

interface UseAuth {
    context: AuthContextType;
    handleValidateSession: () => {};
}

export const useAuth = (): UseAuth => {
    const context = useContext(AuthContext);
    const { handleError, clearError } = useErrorHandler();
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const handleValidateSession = async () => {
        try {
            context.setLoading(true);
            const res = await fetchSession();
            console.log(res);
            const session = await exchangeSession();
            console.log(session);
            context.setIsAuthenticated(true);
            clearError();
        } catch (error) {
            handleError(error);
            context.setIsAuthenticated(false);
        } finally {
            context.setLoading(false);
        }
    };
    return { context, handleValidateSession };
};
