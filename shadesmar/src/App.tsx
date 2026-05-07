import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/home";
import { Exploration } from "./Pages/exploration";
import { Map } from "./Pages/map";
import { Profile } from "./Pages/profile";
import { Navbar } from "./components/navbar";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/exploration" element={<Exploration />} />
				<Route path="/map" element={<Map />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
