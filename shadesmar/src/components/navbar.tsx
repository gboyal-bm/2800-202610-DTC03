import { useLocation, Link } from "react-router-dom";
import { homeTour, mapTour, profileTour } from "./tours";
import { useAuth } from "../contexts/authContext";
import tourIcon from "../assets/tour.svg";
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
        if (startTour) {
            startTour();
        } else {
            console.log(`No tour configured for: ${location.pathname}`);
        }
    };

    return (
        <nav className="w-full bg-a3 px-6 py-4 shadow-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Shadesmar" className="h-10 w-10" />
                    <span className="text-xl font-bold text-gray-900">
                        Shadesmar
                    </span>
                </Link>
                <ul className="flex gap-6 text-gray-900 font-medium">
                    <li>
                        {toursDictionary[location.pathname] && (
                            <button id="TourButton" onClick={handleTour}>
                                <img
                                    src={tourIcon}
                                    alt="Tour Icon"
                                    width="25"
                                    height="25"
                                />
                            </button>
                        )}
                    </li>
                    <li>
                        <Link to="/" className="hover:text-slate-100">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/exploration"
                            className="hover:text-slate-100"
                        >
                            Explore
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="hover:text-slate-100">
                            Profile
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link to="/admin" className="hover:text-slate-100">
                                Admin
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/request-activity"
                            className="hover:text-slate-100"
                        >
                            Request Activity
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
