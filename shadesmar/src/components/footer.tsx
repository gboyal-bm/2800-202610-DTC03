import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12 px-4" id="footer">
            <section className="max-w-4xl mx-auto flex flex-col items-center space-y-6 text-center">
                <h2 className="flex flex-col sm:block">
                    <span className="text-3xl font-extrabold tracking-tight block sm:inline">
                        Have Questions?
                    </span>{" "}
                    <span className="text-xl font-medium opacity-90">
                        Contact Us
                    </span>
                </h2>

                <p className="max-w-lg text-slate-300 text-base leading-relaxed">
                    Planning an outdoors summer trip can be exhausting.
                    Shadesmar is here to relieve your burden so you can have a
                    great experience.
                </p>

                {/* Smaller, sleeker "About Us" Link */}
                <Link
                    to="/about"
                    className="group relative px-6 py-2.5 bg-slate-100 rounded-lg font-bold text-slate-900 text-base transition-all duration-300 hover:bg-white hover:-translate-y-0.5 active:scale-95"
                >
                    About Us
                </Link>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-2">
                    {/* Phone */}
                    <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5l5 2v4a2 2 0 0 1-2 2a16 16 0 0 1-15-15a2 2 0 0 1 2-2" />
                        </svg>
                        <span className="text-sm font-medium">
                            XXX-XXX-XXXX
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-10z" />
                            <path d="M3 7l9 6l9-6" />
                        </svg>
                        <span className="text-sm font-medium">
                            example123@email.com
                        </span>
                    </div>
                </div>
            </section>
        </footer>
    );
}
