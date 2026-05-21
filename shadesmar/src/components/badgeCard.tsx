interface BadgeCardProps {
    title: string;
    description: string;
    imageSrc: string;
}

export function BadgeCard({ title, description, imageSrc }: BadgeCardProps) {
    return (
        <div className="flex flex-row gap-4 justify-between items-center max-h-fit bg-a1 shadow-md shadow-a4 rounded-lg overflow-hidden p-4">
            <img src={imageSrc} alt={title} className="h-15 object-contain" />
            <div className="text-right">
                <h3 className="text-md font-bold text-a3">{title}</h3>
                <p className="text-gray-500 line-clamp-2">{description}</p>
            </div>
        </div>
    );
}
