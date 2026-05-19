import type { AuthContextType } from '@/models/auth';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
