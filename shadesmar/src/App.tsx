import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/protectedRoute";
import { Home } from "./Pages/home";
import { Exploration } from "./Pages/exploration";
import { Map } from "./Pages/map";
import { Profile } from "./Pages/profile";
import { Navbar } from "./components/navbar";
import { Tips } from "./Pages/tips";
import { Footer } from "./components/footer";
import { Auth } from "./Pages/auth";

function App() {
    return (
        <Router>
            <Navbar />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Auth mode="login" />} />
                    <Route path="/register" element={<Auth mode="register" />} />
                    <Route path="/tips" element={<Tips />}></Route>

                    {/* Protected routes */}
                    <Route path="/exploration" element={<ProtectedRoute> <Exploration /> </ProtectedRoute>} />
                    <Route path="/map" element={<ProtectedRoute> <Map /> </ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
                </Routes>
            </AuthProvider>
            <Footer />
        </Router>
    );
}

export default App;
