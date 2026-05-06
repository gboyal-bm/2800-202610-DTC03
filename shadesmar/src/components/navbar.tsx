import { useLocation, Link } from "react-router-dom";
import { homeTour, mapTour, profileTour } from "./tours";

const toursDictionary: Record<string, () => void> = {
	"/": homeTour,
	"/map": mapTour,
	"/profile": profileTour,
};

export default function Navbar() {
	const location = useLocation();

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
				<h1 className="text-xl font-bold text-gray-900">Shadesmar</h1>
				{toursDictionary[location.pathname] && (
					<button id="TourButton" onClick={handleTour}>
						T
					</button>
				)}
				<ul className="flex gap-6 text-gray-900 font-medium">
					<li>
						<Link to="/" className="hover:text-slate-100">
							Home
						</Link>
					</li>
					<li>
						<Link to="/map" className="hover:text-slate-100">
							Explore
						</Link>
					</li>
					<li>
						<Link to="/profile" className="hover:text-slate-100">
							Profile
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
