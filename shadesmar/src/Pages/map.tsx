import { useEffect } from "react";
// import { mapTour } from "../Components/tours"; disabled for ease of development

export function Map() {
	useEffect(() => {
		const hasSeenTour = localStorage.getItem("map_tour_seen");

		if (!hasSeenTour) {
			// mapTour(); disabled for ease of development
			localStorage.setItem("map_tour_seen", "true");
		}
	}, []);

	return (
		<main className="min-h-screen bg-slate-100 p-6">
			<section className="mx-auto max-w-6xl">
				<div className="mb-6">
					<h1 id="Map" className="text-3xl font-bold text-slate-800">
						Map
					</h1>
					<p className="mt-2 text-slate-600">
						Explore nearby locations, routes, and points of interest.
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-[1fr_300px]">
					<div className="relative min-h-[500px] overflow-hidden rounded-2xl bg-sky-100 shadow-lg">
						{/* Placeholder for the map */}
						
						<div className="absolute inset-0 flex items-center justify-center">
							<p className="text-lg font-medium text-slate-500">	Map Placeholder	</p>
						</div>

						<div className="absolute bottom-6 right-6 flex gap-2">
							<button className="rounded-lg bg-white px-3 py-2 text-lg font-bold text-slate-700 shadow hover:bg-slate-50">
								+
							</button>
							<button className="rounded-lg bg-white px-3 py-2 text-lg font-bold text-slate-700 shadow hover:bg-slate-50">
								−
							</button>
						</div>
						
					</div>

					<aside className="rounded-2xl bg-white p-5 shadow-lg">
						<h2 className="text-xl font-semibold text-slate-800">
							Nearby Areas
						</h2>

						<div className="mt-4 space-y-3">
							<div className="rounded-xl border border-slate-200 p-3">
								<p className="font-medium text-slate-800">Forest Trail</p>
								<p className="text-sm text-slate-500">2.1 km away</p>
							</div>

							<div className="rounded-xl border border-slate-200 p-3">
								<p className="font-medium text-slate-800">Community Garden</p>
								<p className="text-sm text-slate-500">3.4 km away</p>
							</div>

							<div className="rounded-xl border border-slate-200 p-3">
								<p className="font-medium text-slate-800">River Walk</p>
								<p className="text-sm text-slate-500">4.8 km away</p>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
