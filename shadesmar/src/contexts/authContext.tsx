/**
 * @fileoverview Context for user authentication state
 * @module contexts/AuthContext
 *
 * @description Provides a React context for managing user authentication state,
 *              including the current user and loading status. Access fields with useAuth() hook.
 * @exports AuthContext
 * @exports useAuth
 *
 * Modified from Claude Sonnet 4.6 snippet.
 */

import { createContext, useContext } from "react";

interface AuthContextType {
    user: Object | null;
    setUser: Function;
    loading: boolean | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
