import { useEffect, useState, useMemo } from "react";
import { ActivityCard } from "../components/activityCard";
import { Map } from "./map";
import { ShadesmarApi } from "../utils/shadesmar_api";

interface Activity {
    _id: string;
    name: string;
    location: string;
    category: string;
    description: string;
}

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

export function Exploration() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    useEffect(() => {
        async function loadActivities() {
            const res = await ShadesmarApi.apiFetch("/activities");
            if (res.ok && res.result) {
                setActivities((res.result as any).results ?? []);
            }
            setLoading(false);
        }
        loadActivities();
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(activities.map((a) => a.category));
        return Array.from(cats).sort();
    }, [activities]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return activities.filter((a) => {
            const matchesSearch =
                a.name.toLowerCase().includes(q) ||
                a.location.toLowerCase().includes(q) ||
                a.description.toLowerCase().includes(q);
            const matchesCategory =
                categoryFilter === "all" || a.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [activities, search, categoryFilter]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Explore Activities
                    </h1>
                </header>

                <Map />

                {/* Search & Filter */}
                <div className="mt-10 mb-6 flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search by name, location, or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Activity count */}
                {!loading && (
                    <p className="text-sm text-gray-400 mb-4">
                        {filtered.length}{" "}
                        {filtered.length === 1 ? "activity" : "activities"}{" "}
                        found
                    </p>
                )}

                {/* Results */}
                {loading ? (
                    <p className="text-center text-gray-500 py-16">
                        Loading activities...
                    </p>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-gray-400 py-16">
                        No activities found.
                    </p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((activity) => (
                            <ActivityCard
                                key={activity._id}
                                title={activity.name}
                                category={activity.category}
                                description={activity.description}
                                imageSrc={getImage(activity.category)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
