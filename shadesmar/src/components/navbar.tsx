/**
 * @fileoverview Navbar component for the Shadesmar application.
 * @module components/navbar
 * @description This component renders a navigation bar with links to the Home, Explore, and Profile pages. It uses Tailwind CSS for styling and React Router's Link component for navigation.
 * @exports Navbar
 * @author Harlan Bullock
 */

import { Link } from "react-router-dom";

/**
 * @function Navbar
 * @description A simple navigation bar component for the Shadesmar application.
 */
export default function Navbar() {
  return (
    <nav className="w-full bg-[#5eccf3] px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">
          Shadesmar
        </h1>

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