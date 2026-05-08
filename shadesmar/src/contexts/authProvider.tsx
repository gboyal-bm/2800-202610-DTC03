/**
 * @fileoverview Provider for user authentication state
 * @module contexts/AuthProvider
 * 
 * @description Provides a React context for managing user authentication state,
 *              including the current user and loading status. Access fields with useAuth() hook.
 * @exports AuthProvider
 * 
 * Modified from Claude Sonnet 4.6 snippet.
 */

import { useEffect, useState } from "react";
import { ShadesmarApi } from "../utils/shadesmar_api"
import { AuthContext } from "./authContext";


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
