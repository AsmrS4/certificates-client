import type { AuthContextType } from '@/models/auth';
import { AuthContext } from '@/router/AuthContext';
import { useContext } from 'react';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
