import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authProvider";
import { ProtectedRoute } from "./components/protectedRoute";
import { Home } from "./Pages/home";
import { Exploration } from "./Pages/exploration";
import { Map } from "./Pages/map";
import { Profile } from "./Pages/profile";
import { Navbar } from "./components/navbar";
import { Tips } from "./Pages/tips";
import { Footer } from "./components/footer";
import { Auth } from "./Pages/auth";
import { AITest } from "./Pages/aitest";
import { NotFound } from "./Pages/notfound";
import { use, useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
    "/": "Shadesmar - Home",
    "/map": "Shadesmar - Map",
    "/profile": "Shadesmar - Profile",
    "/tips": "Shadesmar - Tips",
    "/aitest": "Shadesmar - AI Test",
    "/exploration": "Shadesmar - Exploration",
    "/login": "Shadesmar - Login",
    "/register": "Shadesmar - Register",
};

function TitleManager() {
    const location = useLocation();
    useEffect(() => {
        document.title = pageTitles[location.pathname] ?? "Shadesmar";
    }, [location]);
    return null;
}

function App() {
    return (
        <Router>
            <Navbar />
            <TitleManager />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Auth mode="login" />} />
                    <Route path="/register" element={<Auth mode="register" />} />
                    <Route path="/tips" element={<Tips />}></Route>
                    <Route path="/aitest" element={<AITest />}></Route>

                    {/* Protected routes */}
                    <Route path="/exploration" element={<ProtectedRoute> <Exploration /> </ProtectedRoute>} />
                    <Route path="/map" element={<ProtectedRoute> <Map /> </ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
                    <Route path="*" element={<ProtectedRoute> <NotFound /> </ProtectedRoute>} />
                </Routes>
            </AuthProvider>
            <Footer />
        </Router>
    );
}

export default App;
