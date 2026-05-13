import {Link} from "react-router-dom";
import {useEffect} from "react";
import logo from "../assets/shadesmar-logo-medium.png";
//import { homeTour } from "../Components/tours"; disabled for ease of developement

export function Home() {
    useEffect(() => {
        const hasSeenTour = localStorage.getItem("homes_tour_seen");

        if (!hasSeenTour) {
            //homeTour(); disabled for ease of developement
            localStorage.setItem("home_tour_seen", "true");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Hero / Carousel */}
            <header
                id="carousel"
                className="flex-1 flex items-center justify-center px-6 py-20"
            >
                <div className="text-center max-w-2xl">
                    <img
                        src={logo}
                        alt="Shadesmar"
                        className="h-24 w-24 mx-auto mb-6"
                    />
                    <p className="text-4xl font-bold mb-4">
                        Welcome to Shadesmar
                    </p>

                    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                        Beat the Vancouver heat this summer. Shadesmar helps you discover
                        shaded locations and cool activities near you so you
                        can enjoy the outdoors without the scorching sun.
                    </p>

                    {/* Carousel placeholder */}
                    <div
                        id="ActivitiesList"
                        className="border-2 border-dashed border-gray-300 rounded-xl p-10 mb-8 bg-white"
                    >
                        Carousel Placeholder
                    </div>

                    <Link to="/exploration">
                        <button className="px-6 py-3 rounded-lg font-medium bg-a4 transition hover:opacity-90">
                            Start Exploring
                        </button>
                    </Link>
                </div>
            </header>

            {/* Features */}
            <section className="py-16 bg-a2">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-2xl font-bold mb-8 text-center">
                        Our Features
                    </h3>

                    <div
                        id="FeaturesList"
                        className="grid gap-6 md:grid-cols-3 px-8"
                    >
                        <Link to="/tips">
                            <div className="p-6 border bg-a4 rounded-lg hover:shadow-md transition text-center tracking-wider text-xl font-bold">
                                ☀️ Summer Tips
                            </div>
                        </Link>
                        <Link to="/map">
                            <div className="p-6 border rounded-lg hover:shadow-md transition text-center tracking-wider text-xl font-bold">
                                🗺️ Shade Map
                            </div>
                        </Link>
                        <Link to="/exploration">
                            <div className="p-6 border rounded-lg hover:shadow-md transition text-center tracking-wider text-xl font-bold">
                                🌿 Explore Activities
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
