// import { Link } from "react-router-dom";
import { ShadesmarApi } from "../utils/shadesmar_api";

interface ActivityCardProps {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    category: string;
}


export function ActivityCard({
    id,
    title,
    description,
    imageSrc,
    category,
}: ActivityCardProps) {
    const handleCompleteActivity = async () => {
        const response = await ShadesmarApi.addExperience(10);
        if (response && response.ok) {
            alert("Activity completed! You've earned 10 experience points.");
        } else {
            alert("Error completing activity. Please try again.");
        }
    };
    return (
        // <Link to={`/activity/${id}`}>
        <div>
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg active:bg-slate-200">
                {/* Monochrome to Color Image Container */}
                <div className="h-48 overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {category}
                    </span>
                    <h4 className="mt-1 text-xl font-bold text-gray-900">
                        {title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {description}
                    </p>
                    <div className="flex justify-between items-center">
                        <button className="mt-4 text-sm font-medium text-a5 duration-500 hover:underline">
                            Learn More →
                        </button>
                        <button
                            className="mt-4 text-sm text-white px-4 py-2 rounded-lg font-medium border border-gray-300 shadow -translate-y-0.5 bg-a4 transition hover:-translate-y-1 active:translate-y-0 hover:bg-a4/50"
                            onClick={handleCompleteActivity}
                        >
                            Complete!
                        </button>
                    </div>
                </div>
            </div>
        </div>
        // </Link>
    );
}
