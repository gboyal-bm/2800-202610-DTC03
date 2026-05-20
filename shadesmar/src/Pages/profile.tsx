import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { ShadesmarApi } from "../utils/shadesmar_api";
//import { profileTour } from "../Components/tours"; disabled for ease of developement

export function Profile() {
    const account = useAuth().user as any;
    const [experience, setExperience] = useState(0);

    const xp = experience % 100;
    const level = Math.floor(experience / 100) + 1;

    const userInfo = {
        name: account?.username || "Username",
        email: account?.email || "abc123@example.com",
        bio: "This is a short bio about the user. It can be edited in the profile settings.",
        location: "Vancouver, BC",
    };    
    
    const logout = async () => {
        try {
            await ShadesmarApi.logoutUser();
            window.location.replace("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const exp = await ShadesmarApi.getExperience();
                setExperience(exp as unknown as number);
            } catch (err) {
                console.error("Error fetching experience:", err);
            }
        })();
    }, [location.pathname]);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem("profile_tour_seen");
        if (!hasSeenTour) localStorage.setItem("profile_tour_seen", "true");
    }, []);

    const btnBase = "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer";

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: "'Raleway', sans-serif" }}>

            {/* Header */}
            <header className="flex flex-col items-center px-6 py-14">

                {/* Avatar */}
                <div className="mb-5 rounded-full p-[3px]"
                    style={{ background: "linear-gradient(135deg, #3dd6d6, #6e5ff0)", boxShadow: "0 0 0 3px #f7f8fa" }}>
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                        Icon
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {userInfo.name}
                </h1>
                <p className="text-sm text-gray-400 font-medium mb-5">{userInfo.location}</p>

                {/* Level + XP */}
                <div id="ExperienceBar" className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #3dd6d6, #6e5ff0)", fontFamily: "'Outfit', sans-serif" }}>
                        {level}
                    </div>
                    <div>
                        <div className="w-48 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${xp}%`, background: "linear-gradient(90deg, #3dd6d6, #6e5ff0)" }} />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{xp} / 100 XP</p>
                    </div>
                </div>

                <p className="text-sm text-gray-500 text-center max-w-md leading-relaxed mb-8">
                    {userInfo.bio}
                </p>

                <div id="Controls" className="flex gap-2.5 flex-wrap justify-center">
                    <button className={`${btnBase} text-white bg-a4 border border-gray-300 shadow hover:bg-a4/50`}>
                        Edit Profile
                    </button>
                    <button className={`${btnBase} bg-white border border-gray-200 text-gray-600 hover:bg-gray-50`}>
                        Settings
                    </button>
                    <button className={`${btnBase} bg-white border text-red-500 hover:bg-red-50`}
                        style={{ borderColor: "#fca5a5" }}
                        onClick={logout}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Gradient divider */}
            <div className="mx-6" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(61,214,214,0.25), rgba(110,95,240,0.25), transparent)" }} />

            {/* Account Info */}
            <section className="py-10 px-6">
                <div className="max-w-2xl mx-auto">
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase text-center mb-5">
                        Account Information
                    </p>
                    <div id="AccountInformation" className="grid gap-3 md:grid-cols-2">
                        <div className="p-5 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-teal-100 transition-all duration-200">
                            <p className="text-xs font-bold tracking-wider text-gray-300 uppercase mb-1.5">Email Address</p>
                            <p className="text-sm font-medium text-gray-800">{userInfo.email}</p>
                        </div>
                        <div className="p-5 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-teal-100 transition-all duration-200">
                            <p className="text-xs font-bold tracking-wider text-gray-300 uppercase mb-1.5">Current Location</p>
                            <p className="text-sm font-medium text-gray-800">{userInfo.location}</p>
                        </div>
                        <div className="p-5 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 italic text-sm min-h-16">
                            Badges / Others
                        </div>
                        <div className="p-5 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 italic text-sm min-h-16">
                            Additional Stuff
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
