import { Link } from "react-router-dom";

interface ActivityCardProps {
  key: number;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
}

export function ActivityCard({ key, title, description, imageSrc, category }: ActivityCardProps) {
  return (
    <Link to={`/activity/${key}`}>
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
          <h4 className="mt-1 text-xl font-bold text-gray-900">{title}</h4>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
      
          <button className="mt-4 text-sm font-medium text-a5 duration-500 hover:underline">
            Learn More →
          </button>
        </div>
      </div>
    </Link>
  );
}