import { useEffect } from "react";
// import { mapTour } from "../Components/tours"; disabled for ease of development

export function Map() {
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("map_tour_seen");

    if (!hasSeenTour) {
      //mapTour(); disabled for ease of developement
      localStorage.setItem("map_tour_seen", "true");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 id="Map" className="text-4xl font-bold text-gray-900">
            Explore the Map
          </h1>
          <p className="mt-4 text-gray-600">
            Find activities and points of interest near you
          </p>
        </header>

        {/* Map Embed */}
        <section className="mb-12">
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md bg-white">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1VnIL5tEG9LK9GiBSjlk1QYxYyYtRjJ0&ehbc=2E312F&noprof=1"
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              title="Shadesmar Activity Map"
            />
          </div>
        </section>

        {/* Info Cards Below the Map */}
        <section className="py-8 bg-a2 rounded-xl px-6">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Map Highlights
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 border rounded-lg bg-white hover:shadow-md transition">
              Highlight 1
            </div>
            <div className="p-6 border rounded-lg bg-white hover:shadow-md transition">
              Highlight 2
            </div>
            <div className="p-6 border rounded-lg bg-white hover:shadow-md transition">
              Highlight 3
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © Footer Stuff
        </div>
      </footer>
    </div>
  );
}
