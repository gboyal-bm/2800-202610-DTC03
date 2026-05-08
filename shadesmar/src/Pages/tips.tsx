//import { useEffect } from "react";
//import { tipTour } from "../components/tours"; disabled for ease of developement
export function Tips() {
    const summerTips = [
        {
            title: "Hydration",
            description:
                "Aim for at least 8–10 glasses of water daily. Increase intake if you're exercising or spending time under direct sunlight.",
            theme: "border-blue-200 bg-blue-50 text-blue-700",
        },
        {
            title: "Sun Protection",
            description:
                "Use broad-spectrum sunscreen (SPF 30+) and reapply every two hours or after contact with water.",
            theme: "border-orange-200 bg-orange-50 text-orange-700",
        },
        {
            title: "Peak Sunshine",
            description:
                "Avoid heavy outdoor exercise between 11 a.m. and 4 p.m, when UV intensity is at its highest.",
            theme: "border-yellow-200 bg-yellow-50 text-yellow-700",
        },
        {
            title: "Car Safety",
            description:
                "Never leave children or pets in parked cars. Carry extra water for trips in case of delays.",
            theme: "border-red-200 bg-red-50 text-red-700",
        },
        {
            title: "Heat Illness",
            description:
                "Watch for dizziness, nausea, or headaches. Ensure help is accessible if you live alone.",
            theme: "border-amber-200 bg-amber-50 text-amber-700",
        },
        {
            title: "Cooling",
            description:
                "Use fans/AC if temperatures exceed 25°C. Stay indoors during extreme heat spikes.",
            theme: "border-cyan-200 bg-cyan-50 text-cyan-700",
        },
        {
            title: "Grilling Safety",
            description:
                "Maintain a 3ft 'safety zone' around grills and active heat sources to prevent accidents.",
            theme: "border-rose-200 bg-rose-50 text-rose-700",
        },
        {
            title: "Help to Others",
            description:
                "Check regularly on seniors or those with health conditions to ensure they are staying cool.",
            theme: "border-emerald-200 bg-emerald-50 text-emerald-700",
        },
    ];

    return (
        <div className="min-h-screen bg-white pt-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <header className="mb-12 border-b border-slate-100 pl-5">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                        Summer Safety Guide
                    </h1>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4 text-center"></h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Essential tips to keep you and your community safe
                        during the warmer months.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {summerTips.map((tip, index) => (
                        <div
                            key={index}
                            className="group flex flex-col p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                        >
                            <span
                                className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${tip.theme}`}
                            >
                                {tip.title}
                            </span>
                            <p className="text-slate-700 leading-relaxed font-medium">
                                {tip.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-15 mb-5 p-8 rounded-2xl bg-slate-800 text-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold">Stay Alert</h4>
                        <p className="text-slate-400">
                            Heat-Related Illness can lead to serious
                            complications including death. Please call your
                            local emergency line if you or prople around are
                            showing symptons of serious illness.
                        </p>
                    </div>
                    <a
                        href="https://tc.canada.ca/en/dangerous-goods/canutec/reporting-requirements/guide-reporting-dangerous-goods-incidents/emergency-phone-numbers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-col items-center px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors text-center"
                    >
                        <span>Emergency Contacts</span>
                        <span className="text-sm font-normal">(Canada)</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
