import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const mapTour = () => {
	const driverObj = driver({
		allowClose: true,
		showProgress: true,

		steps: [
			{
				popover: {
					title: "Welcome to our maps page.",
				},
			},
			{
				element: "#Map",
				popover: {
					title: "Movement",
					description: "drag or zoom on top of the map to look around",
				},
			},
		],
	});
	driverObj.drive();
	console.log("mapTour running");
};

export const profileTour = () => {
	const driverObj = driver({
		allowClose: true,
		showProgress: true,
		steps: [
			{
				popover: {
					title: "Welcome to your profiles page.",
				},
			},
			{
				element: "#UserDetails",
				popover: {
					title: "Details",
					description:
						"Here are your profile informations that you may customize.",
					side: "bottom",
				},
			},
			{
				element: "#AccountInformation",
				popover: {
					title: "Account Information",
					description:
						"Next, are your informations that serves as your records/progressions.",
				},
			},
			{
				element: "#Controls",
				popover: {
					title: "User Settings",
					description:
						"Finally, You can edit your details and access user setting here.",
					side: "bottom",
				},
			},
		],
	});
	driverObj.drive();
	console.log("mapTour running");
};

export const homeTour = () => {
	const driverObj = driver({
		allowClose: true,
		showProgress: true,
		steps: [
			{
				popover: {
					title: "Welcome to Shadesmar.",
					description:
						"You will be greeted by tours the each time you visit on a new device. Please visit the settings If you would like to turn off first-time tours.",
				},
			},
			{
				element: "#TourButton",
				popover: {
					title: "Review Tours",
					description:
						"If you missed anything you can press the button here to review our guide.",
					side: "bottom",
				},
			},
			{
				element: "#ActivitiesList",
				popover: {
					title: "Activities List",
					description:
						"Here You can scroll and access listed activities of your city on our site based on Ratings. Click the Button below to vist the entire list",
				},
			},
			{
				element: "#FeaturesList",
				popover: {
					title: "Features List",
					description:
						"Lastly, here you can access the features of our product.",
				},
			},
		],
	});
	driverObj.drive();
	console.log("homeTour running");
};
