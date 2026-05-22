import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { homeTour, mapTour, profileTour } from "./tours";
import { useAuth } from "../contexts/authContext";
import logo from "../assets/shadesmar-logo-small.png";

{
    /* Dictionary mapping routes to their respective tour functions */
}
const toursDictionary: Record<string, () => void> = {
    "/": homeTour,
    "/map": mapTour,
    "/profile": profileTour,
};

{
    /* Routes that should have a tour button in the navbar, along with their labels */
}
const navLinks = [
    { to: "/", label: "Home" },
    { to: "/exploration", label: "Explore" },
    { to: "/profile", label: "Profile" },
    { to: "/request-activity", label: "Request Activity" },
];

{
    /* Function to determine the style of a nav link based on whether it's active or not */
}
const linkStyle = (active: boolean) => ({
    color: active ? "#3dd6d6" : "rgba(200,210,230,0.7)",
    border: `1px solid ${active ? "rgba(61,214,214,0.3)" : "transparent"}`,
    background: active ? "rgba(61,214,214,0.08)" : "transparent",
});

export function Navbar() {
    const location = useLocation();
    const { user } = useAuth();
    const isAdmin = user && (user as any).role === "admin";
    const [menuOpen, setMenuOpen] = useState(false);

    {
        /* Function to handle the tour button click, which calls the appropriate tour function based on the current route */
    }
    const handleTour = () => {
        toursDictionary[location.pathname]?.();
        setMenuOpen(false);
    };

    return (
        <nav
            className="w-full"
            style={{
                background: "#0d0d12",
                borderBottom: "1px solid rgba(99,210,210,0.15)",
                fontFamily: "'Raleway', sans-serif",
            }}
        >
            <div
                className="mx-auto flex max-w-6xl items-center justify-between px-5"
                style={{ height: "64px" }}
            >
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2.5 no-underline">
                    <img src={logo} alt="Shadesmar" className="h-9 w-9" />
                    <span
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "18px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            background:
                                "linear-gradient(90deg, #3dd6d6 0%, #6e5ff0 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Shadesmar
                    </span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                    {toursDictionary[location.pathname] && (
                        <li>
                            <button
                                id="TourButton"
                                onClick={handleTour}
                                title="Start tour"
                                className="flex items-center rounded-md px-2 py-1.5 transition-all"
                                style={{
                                    background: "none",
                                    border: "1px solid rgba(61,214,214,0.2)",
                                    color: "rgba(61,214,214,0.6)",
                                    cursor: "pointer",
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                                </svg>
                            </button>
                        </li>
                    )}
                    <li
                        style={{
                            width: "1px",
                            height: "20px",
                            background: "rgba(99,210,210,0.12)",
                            margin: "0 4px",
                        }}
                    />
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className="block rounded-md px-3 py-1.5 text-sm font-medium tracking-wide no-underline transition-all"
                                style={linkStyle(location.pathname === to)}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    {isAdmin && (
                        <li>
                            <Link
                                to="/admin"
                                className="block rounded-md px-3 py-1.5 text-sm font-medium tracking-wide no-underline transition-all"
                                style={{
                                    color: "rgba(180,160,255,0.7)",
                                    border: "1px solid transparent",
                                }}
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Hamburger */}
                <button
                    className="flex md:hidden items-center justify-center rounded-md p-2 transition-all"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    style={{
                        background: "none",
                        border: "1px solid rgba(61,214,214,0.2)",
                        color: "rgba(61,214,214,0.7)",
                        cursor: "pointer",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {menuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    className="md:hidden flex flex-col pb-3"
                    style={{ borderTop: "1px solid rgba(99,210,210,0.1)" }}
                >
                    {toursDictionary[location.pathname] && (
                        <div
                            style={{
                                padding: "8px 1.25rem",
                                borderBottom: "1px solid rgba(99,210,210,0.08)",
                                marginBottom: "4px",
                            }}
                        >
                            <button
                                onClick={handleTour}
                                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all"
                                style={{
                                    background: "none",
                                    border: "1px solid rgba(61,214,214,0.2)",
                                    color: "rgba(61,214,214,0.7)",
                                    cursor: "pointer",
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                                </svg>
                                Start Tour
                            </button>
                        </div>
                    )}
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className="no-underline px-5 py-2.5 text-sm font-medium transition-all"
                            style={{
                                color:
                                    location.pathname === to
                                        ? "#3dd6d6"
                                        : "rgba(200,210,230,0.7)",
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link
                            to="/admin"
                            onClick={() => setMenuOpen(false)}
                            className="no-underline px-5 py-2.5 text-sm font-medium"
                            style={{ color: "rgba(180,160,255,0.7)" }}
                        >
                            Admin
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
