import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ActivityCard } from "../components/activityCard";
import { ShadesmarApi } from "../utils/shadesmar_api";
import logo from "../assets/shadesmar-logo-medium.png";
//import { homeTour } from "../Components/tours"; disabled for ease of developement

const CATEGORY_IMAGES: Record<string, string> = {
    adventure:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    sport: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80",
    hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    cycling:
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80",
    water: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?auto=format&fit=crop&w=800&q=80",
    cultural:
        "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?auto=format&fit=crop&w=800&q=80",
    food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    nature: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
};

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80";

function getImage(category: string): string {
    return CATEGORY_IMAGES[category.toLowerCase()] ?? FALLBACK_IMAGE;
}

export function Home() {

    
    useEffect(() => {
        const hasSeenTour = localStorage.getItem("homes_tour_seen");

        if (!hasSeenTour) {
            //homeTour(); disabled for ease of developement
            localStorage.setItem("home_tour_seen", "true");
        }
    }, []);

    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        ShadesmarApi.apiFetch("/activities", {}, true).then((res) => {
            if (res.ok && res.result) {
                const data = res.result as { results: any[] };
                setActivities(data.results.slice(0, 5));
            }
        });
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
                        Beat the Vancouver heat this summer. Shadesmar helps you
                        discover shaded locations and cool activities near you
                        so you can enjoy the outdoors without the scorching sun.
                    </p>

                    {/* Activity Carousel */}
                    <div
                        id="ActivitiesList"
                        className="flex gap-4 overflow-x-auto pb-2 mb-8 snap-x snap-mandatory"
                    >
                        {activities.length > 0 ? (
                            activities.map((activity) => (
                                <div key={activity._id} className="snap-start shrink-0 w-64">
                                    <ActivityCard
                                        key={activity._id}
                                        id={activity._id}
                                        title={activity.name}
                                        description={activity.description}
                                        imageSrc={getImage(activity.category)}
                                        category={activity.category}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 w-full text-center py-8">No activities yet.</p>
                        )}
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
                                Summer Tips
                            </div>
                        </Link>
                        <Link to="/map">
                            <div className="p-6 border rounded-lg hover:shadow-md transition text-center tracking-wider text-xl font-bold">
                                Shade Map
                            </div>
                        </Link>
                        <Link to="/exploration">
                            <div className="p-6 border rounded-lg hover:shadow-md transition text-center tracking-wider text-xl font-bold">
                                Explore Activities
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
