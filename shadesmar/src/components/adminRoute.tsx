import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";

interface AdminRouteProps {
    children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login", { replace: true });
        }
        if (!loading && user && (user as any).role !== "admin") {
            navigate("/", { replace: true });
        }
    }, [user, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || (user as any).role !== "admin") {
        return null;
    }

    return children;
}
