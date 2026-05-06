import { useEffect } from "react";
//import { mapTour } from "../Components/tours"; disabled for ease of developement

export function Map() {
	useEffect(() => {
		const hasSeenTour = localStorage.getItem("map_tour_seen");

		if (!hasSeenTour) {
			//mapTour(); disabled for ease of developement
			localStorage.setItem("map_tour_seen", "true");
		}
	}, []);

	return (
		<>
			<h1 id="Map">This is the map page</h1>
		</>
	);
}
