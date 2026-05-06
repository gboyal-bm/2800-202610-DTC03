import { useEffect } from "react";
//import { homeTour } from "../Components/tours"; disabled for ease of developement

export function Home() {
	useEffect(() => {
		const hasSeenTour = localStorage.getItem("map_tour_seen");

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
					<p className="text-4xl font-bold mb-4 pb-10">Welcome to Shadesmar</p>

					<p className="mb-8">This is a desription</p>

					{/* Carousel placeholder */}
					<div
						id="ActivitiesList"
						className="border-2 border-dashed border-gray-300 rounded-xl p-10 mb-8 bg-white"
					>
						Carousel Placeholder
					</div>

					<button className="px-6 py-3 rounded-lg font-medium bg-a4 transition">
						View More
					</button>
				</div>
			</header>

			{/* Features */}
			<section className="py-16 bg-a2">
				<div className="max-w-6xl mx-auto px-6">
					<h3 className="text-2xl font-bold mb-8 text-center">Our Features</h3>

					<div id="FeaturesList" className="grid gap-6 md:grid-cols-3">
						<div className="p-6 border rounded-lg hover:shadow-md transition">
							Feature 1
						</div>
						<div className="p-6 border rounded-lg hover:shadow-md transition">
							Feature 2
						</div>
						<div className="p-6 border rounded-lg hover:shadow-md transition">
							Feature 3
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t bg-gray-50">
				<div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
					© Footer Stuff
				</div>
			</footer>
		</div>
	);
}
