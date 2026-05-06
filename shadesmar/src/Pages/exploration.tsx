import { ActivityCard } from "../components/activityCard";
import { Map } from "./map";

export function Exploration() {
  const placeholders = [
    {
      id: 1,
      title: "Mountain Climbing",
      category: "Adventure",
      description: "Climb to the PEAK of the mountains in this place, where I'm sure you'll find shade somewhere.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Volleyball",
      category: "Sport",
      description: "Play volleyball with Gus 24/7 forever at all times, also shade or whatever",
      image: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return(
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Explore Activities</h1>
        </header>

        <Map/>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {
          placeholders.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              category={activity.category}
              description={activity.description}
              imageSrc={activity.image}
            />
          ))
        }
        </div>
      </div>
    </div>
  );
}