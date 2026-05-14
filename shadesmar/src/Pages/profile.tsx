import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { ShadesmarApi } from "../utils/shadesmar_api";
//import { profileTour } from "../Components/tours"; disabled for ease of developement

async function logout() {
    try {
        await ShadesmarApi.logoutUser();
        window.location.replace("/login");
    } catch (err) {
        console.error("Logout error:", err);
    }
}

export function Profile() {
    const account = useAuth().user as any; // Type assertion to access username and email
    const userInfo = {
        name: account?.username || "Username",
        email: account?.email || "abc123@example.com",
        bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam deserunt illo iure perspiciatis hic repellat.",
        location: "Vancouver, BC",
        level: "1",
    };

    // Tour
    useEffect(() => {
        const hasSeenTour = localStorage.getItem("profile_tour_seen");

        if (!hasSeenTour) {
            //profileTour(); disabled for ease of developement
            localStorage.setItem("profile_tour_seen", "true");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Profile Header / Identity */}
            <header className="flex-1 flex items-center justify-center px-6 py-20">
                <div id="UserDetails" className="text-center max-w-2xl w-full">
                    {/* Profile Image Placeholder */}
                    <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-full mx-auto mb-8 flex items-center justify-center text-3xl">
                        Icon
                    </div>
                    <div className="flex justify-center gap-4 ml-4">
                        <h1 className="text-4xl font-bold mb-2">{userInfo.name}</h1>
                        <div className="w-12 h-12 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-3xl">
                            <h1 className="text-4xl font-bold mb-1">
                                {userInfo.level}
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-500 mb-6 font-medium">
                        {userInfo.location}
                    </p>

                    <p className="text-lg mb-10">{userInfo.bio}</p>

                    <div id="Controls" className="flex justify-center gap-4">
                        <button className="px-6 py-3 rounded-lg font-medium bg-a4 transition hover:opacity-90">
                            Edit Profile
                        </button>
                        <button className="px-6 py-3 rounded-lg font-medium border border-gray-300 bg-white transition hover:bg-gray-50">
                            Settings
                        </button>
                        <button className="px-6 py-3 rounded-lg font-medium text-white bg-warning hover:bg-warning-dark transition"
                            onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Account Details Section */}
            <section className="py-16 bg-a2">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-2xl font-bold mb-8 text-center">
                        Account Information
                    </h3>

                    <div
                        id="AccountInformation"
                        className="grid gap-6 md:grid-cols-2"
                    >
                        {/* Email Card */}
                        <div className="p-6 bg-white border rounded-xl hover:shadow-md transition">
                            <p className="text-xs font-bold tracking-wider text-gray-400 mb-1">
                                EMAIL ADDRESS
                            </p>
                            <p className="text-lg font-medium">{userInfo.email}</p>
                        </div>

                        {/* Location Card */}
                        <div className="p-6 bg-white border rounded-xl hover:shadow-md transition">
                            <p className="text-xs font-bold tracking-wider text-gray-400 mb-1">
                                CURRENT LOCATION
                            </p>
                            <p className="text-lg font-medium">
                                {userInfo.location}
                            </p>
                        </div>

                        {/* Placeholder Badges */}
                        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 italic">
                            Badges/Others
                        </div>
                        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 italic">
                            Additional Stuff
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
