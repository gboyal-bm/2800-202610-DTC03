import { useLocation, Link } from "react-router-dom";
import { homeTour, mapTour, profileTour } from "./tours";
import { useAuth } from "../contexts/authContext";
import logo from "../assets/shadesmar-logo-small.png";

const toursDictionary: Record<string, () => void> = {
    "/": homeTour,
    "/map": mapTour,
    "/profile": profileTour,
};

export function Navbar() {
    const location = useLocation();
    const { user } = useAuth();
    const isAdmin = user && (user as any).role === "admin";

    const handleTour = () => {
        const startTour = toursDictionary[location.pathname];
        if (startTour) startTour();
    };

    return (
        <nav className="w-full px-6 shadow-md"
            style={{ background: "#0d0d12", borderBottom: "1px solid rgba(99,210,210,0.15)", fontFamily: "'Raleway', sans-serif" }}>
            <div className="mx-auto flex max-w-6xl items-center justify-between" style={{ height: "64px" }}>

                <Link to="/" className="flex items-center gap-2.5 no-underline">
                    <img src={logo} alt="Shadesmar" className="h-9 w-9" />
                    <span style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "17px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        background: "linear-gradient(90deg, #3dd6d6 0%, #6e5ff0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}>
                        Shadesmar
                    </span>
                </Link>

                <ul className="flex items-center gap-1 list-none m-0 p-0">
                    {toursDictionary[location.pathname] && (
                        <li>
                            <button id="TourButton" onClick={handleTour}
                                title="Start tour"
                                className="flex items-center rounded-md px-2 py-1.5 text-base transition-all"
                                style={{ background: "none", border: "1px solid rgba(61,214,214,0.2)", color: "rgba(61,214,214,0.6)", cursor: "pointer" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                                </svg>
                            </button>
                        </li>
                    )}
                    <li style={{ width: "1px", height: "20px", background: "rgba(99,210,210,0.12)", margin: "0 4px" }} />
                    {[
                        { to: "/", label: "Home" },
                        { to: "/exploration", label: "Explore" },
                        { to: "/profile", label: "Profile" },
                        { to: "/request-activity", label: "Request Activity" },
                    ].map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to}
                                className="block rounded-md px-3 py-1.5 text-sm font-medium tracking-wide no-underline transition-all"
                                style={{
                                    color: location.pathname === to ? "#3dd6d6" : "rgba(200,210,230,0.7)",
                                    border: `1px solid ${location.pathname === to ? "rgba(61,214,214,0.3)" : "transparent"}`,
                                    background: location.pathname === to ? "rgba(61,214,214,0.08)" : "transparent",
                                }}>
                                {label}
                            </Link>
                        </li>
                    ))}
                    {isAdmin && (
                        <li>
                            <Link to="/admin"
                                className="block rounded-md px-3 py-1.5 text-sm font-medium tracking-wide no-underline transition-all"
                                style={{ color: "rgba(180,160,255,0.7)", border: "1px solid transparent" }}>
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
