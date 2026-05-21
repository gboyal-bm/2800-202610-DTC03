import defaultIcon from "../assets/shadesmar-logo-medium.png"; // Reusing your logo

export function About() {
    const coreValues = [
        {
            title: "Inclusion",
            description:
                "To provide everyone with ways they can enjoy their summer, no matter of their circumstances.",
            icon: "🚀",
        },
        {
            title: "Community",
            description:
                "To enrich community bonding with with the choice to host group activities.",
            icon: "🤝",
        },
        {
            title: "Respect",
            description:
                "Creating an platform that values diverse perspectives, honors user privacy, and provide everyone with chances to enjoy the summer.",
            icon: "🛡️",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Hero Section */}
            <div className="relative bg-linear-to-br from-[#3dd6d6] to-[#6e5ff0] py-20 px-6 text-center text-white">
                <div className="max-w-3xl mx-auto">
                    <img
                        src={defaultIcon}
                        alt="Logo"
                        className="w-24 h-24 mx-auto mb-6 bg-white p-2 rounded-full shadow-lg object-contain"
                    />
                    <h1
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        About Shadesmar
                    </h1>
                    <p className="text-lg md:text-xl text-cyan-50 max-w-2xl mx-auto font-light leading-relaxed">
                        The Outdoors activities app built for your summer
                        holidays.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto px-6 pt-16 pb-8 space-y-20">
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4 text-center">
                        <h2
                            className="text-3xl font-bold text-gray-900"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Our Goal
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            "As rising temperatures make traditional trails
                            harder to reach, Shadesmar is here to help. We
                            provide the knowledge, and resources every
                            adventurer needs to safely and comfortably
                            experience the great outdoors."
                        </p>
                    </div>
                </section>

                <hr className="border-gray-200" />

                {/* Core Values Section */}
                <section className="space-y-12">
                    <div className="text-center space-y-2">
                        <h2
                            className="text-3xl font-bold text-gray-900"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Our app's purpose
                        </h2>
                        <p className="text-gray-500 max-w-md mx-auto">
                            The core pillars that drive our design decisions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 space-y-4 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Note */}
                <section className="bg-gray-900 text-white p-8 md:p-12 rounded-2xl text-center space-y-4">
                    <h3 className="text-2xl font-bold">Want to learn more?</h3>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm">
                        Check out our Git repository, or reach out to our team
                        members via the contact module.
                    </p>
                    <button className="mt-2 bg-[#3dd6d6] text-gray-900 font-semibold px-6 py-2.5 rounded-lg text-sm transition-all hover:bg-cyan-400 shadow-sm">
                        Unlinked
                    </button>
                </section>
            </div>
        </div>
    );
}
