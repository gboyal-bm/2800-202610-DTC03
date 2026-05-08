/**
 * @fileoverview Context for user authentication state
 * @module contexts/AuthContext
 * 
 * @description Provides a React context for managing user authentication state,
 *              including the current user and loading status. Access fields with useAuth() hook.
 * @exports AuthProvider
 * @exports useAuth
 * 
 * Modified from Claude Sonnet 4.6 snippet.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { ShadesmarApi } from "../utils/shadesmar_api"

interface AuthContextType {
    user: Object | null,
    setUser: Function,
    loading: boolean | null
}

interface AuthProviderProps {
    children: React.ReactNode;
}

async function setContextUser(setUser: Function, setLoading: Function) {
    try {
        const user = await ShadesmarApi.getUser();
        setUser(user);
    } catch (error) {
        setUser(null);
    } finally {
        setLoading(false);
    }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setContextUser(setUser, setLoading);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
