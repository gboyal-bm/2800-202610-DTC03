import { useEffect, useState, useMemo, useRef } from "react";
import { ActivityCard } from "../components/activityCard";
import { FloatingButton } from "../components/floatingButton";
import { RecommendationChatbox } from "../components/recommendationChatbox";
import { Map } from "./map";
import { ShadesmarApi } from "../utils/shadesmar_api";

interface Activity {
    _id: string;
    name: string;
    location: string;
    category: string;
    description: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
    adventure:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    sport: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=80",
    hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    cycling:
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80",
    water: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?auto=format&fit=crop&w=800&q=80",
    cultural:
        "https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?auto=format&fit=crop&w=800&h=500&q=80",
    food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    nature: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
};

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80";

function getImage(category: string): string {
    return CATEGORY_IMAGES[category.toLowerCase()] ?? FALLBACK_IMAGE;
}

// ── Shadesmar Easter-Egg Overlay ──────────────────────────────────────────────
function ShadesmarOverlay({ onDismiss }: { onDismiss: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let t = 0;

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        // Floating orbs (beads of the Cognitive Realm)
        const orbs = Array.from({ length: 60 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: 2 + Math.random() * 5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            hue: 180 + Math.random() * 60, // teal-to-blue palette
            alpha: 0.4 + Math.random() * 0.6,
        }));

        function draw() {
            if (!canvas || !ctx) return;
            t += 0.012;

            // Deep dark background with slight radial highlight
            const bg = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width * 0.8
            );
            bg.addColorStop(0, "rgba(5, 18, 40, 0.92)");
            bg.addColorStop(1, "rgba(0, 0, 10, 0.98)");
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Rippling connection lines between orbs (like Shadesmar bonds)
            ctx.lineWidth = 0.4;
            for (let i = 0; i < orbs.length; i++) {
                for (let j = i + 1; j < orbs.length; j++) {
                    const dx = orbs[j].x - orbs[i].x;
                    const dy = orbs[j].y - orbs[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const fade = 1 - dist / 120;
                        ctx.strokeStyle = `rgba(100, 200, 255, ${fade * 0.25})`;
                        ctx.beginPath();
                        ctx.moveTo(orbs[i].x, orbs[i].y);
                        ctx.lineTo(orbs[j].x, orbs[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw orbs
            for (const orb of orbs) {
                orb.x += orb.speedX;
                orb.y += orb.speedY;
                if (orb.x < 0) orb.x = canvas.width;
                if (orb.x > canvas.width) orb.x = 0;
                if (orb.y < 0) orb.y = canvas.height;
                if (orb.y > canvas.height) orb.y = 0;

                const pulse = 0.7 + 0.3 * Math.sin(t * 2 + orb.x);
                const g = ctx.createRadialGradient(
                    orb.x,
                    orb.y,
                    0,
                    orb.x,
                    orb.y,
                    orb.r * 3
                );
                g.addColorStop(
                    0,
                    `hsla(${orb.hue}, 90%, 80%, ${orb.alpha * pulse})`
                );
                g.addColorStop(1, `hsla(${orb.hue}, 90%, 50%, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.r * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // Central portal ring
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const baseR = Math.min(canvas.width, canvas.height) * 0.18;

            for (let ring = 0; ring < 4; ring++) {
                const r = baseR + ring * 18 + Math.sin(t + ring) * 6;
                const alpha =
                    (0.6 - ring * 0.12) * (0.7 + 0.3 * Math.sin(t * 1.5));
                ctx.strokeStyle = `rgba(80, 200, 255, ${alpha})`;
                ctx.lineWidth = 2 - ring * 0.3;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Rotating spokes
            for (let s = 0; s < 8; s++) {
                const angle = t * 0.4 + (s * Math.PI * 2) / 8;
                const inner = baseR * 0.3;
                const outer = baseR * 0.95;
                ctx.strokeStyle = `rgba(120, 220, 255, ${0.15 + 0.1 * Math.sin(t + s)})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(
                    cx + Math.cos(angle) * inner,
                    cy + Math.sin(angle) * inner
                );
                ctx.lineTo(
                    cx + Math.cos(angle) * outer,
                    cy + Math.sin(angle) * outer
                );
                ctx.stroke();
            }

            // Glowing core
            const core = ctx.createRadialGradient(
                cx,
                cy,
                0,
                cx,
                cy,
                baseR * 0.28
            );
            core.addColorStop(
                0,
                `rgba(180, 240, 255, ${0.6 + 0.3 * Math.sin(t * 2)})`
            );
            core.addColorStop(
                0.5,
                `rgba(60, 160, 220, ${0.3 + 0.2 * Math.sin(t * 1.7)})`
            );
            core.addColorStop(1, "rgba(10, 40, 80, 0)");
            ctx.fillStyle = core;
            ctx.beginPath();
            ctx.arc(cx, cy, baseR * 0.28, 0, Math.PI * 2);
            ctx.fill();

            animId = requestAnimationFrame(draw);
        }

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
            onClick={onDismiss}
            style={{ backdropFilter: "blur(2px)" }}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Text content */}
            <div className="relative z-10 text-center pointer-events-none select-none">
                <p
                    className="text-xs uppercase tracking-[0.35em] mb-3"
                    style={{ color: "rgba(100,200,255,0.7)" }}
                >
                    You have entered
                </p>
                <h1
                    className="text-5xl sm:text-7xl font-bold mb-4"
                    style={{
                        color: "#a8e6ff",
                        textShadow:
                            "0 0 40px rgba(80,200,255,0.8), 0 0 80px rgba(40,140,220,0.4)",
                        letterSpacing: "0.08em",
                        fontFamily: "Georgia, serif",
                    }}
                >
                    SHADESMAR
                </h1>
                <p
                    className="text-sm sm:text-base max-w-xs mx-auto leading-relaxed"
                    style={{ color: "rgba(160,220,255,0.6)" }}
                >
                    Enjoy the Shade and explore the hidden wonders of shade.
                </p>
                <p
                    className="text-xs mt-6"
                    style={{ color: "rgba(100,180,220,0.4)" }}
                >
                    tap anywhere to return
                </p>
            </div>
        </div>
    );
}
// ─────────────────────────────────────────────────────────────────────────────

export function Exploration() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [showShadesmar, setShowShadesmar] = useState(false);

    useEffect(() => {
        async function loadActivities() {
            const res = await ShadesmarApi.apiFetch("/activities");
            if (res.ok && res.result) {
                setActivities((res.result as any).results ?? []);
            }
            setLoading(false);
        }
        loadActivities();
    }, []);

    // Trigger the easter egg
    useEffect(() => {
        if (search.trim().toLowerCase() === "shadesmar") {
            setShowShadesmar(true);
        }
    }, [search]);

    const categories = useMemo(() => {
        const cats = new Set(activities.map((a) => a.category));
        return Array.from(cats).sort();
    }, [activities]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return activities.filter((a) => {
            const matchesSearch =
                a.name.toLowerCase().includes(q) ||
                a.location.toLowerCase().includes(q) ||
                a.description.toLowerCase().includes(q);
            const matchesCategory =
                categoryFilter === "all" || a.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [activities, search, categoryFilter]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            {showShadesmar && (
                <ShadesmarOverlay
                    onDismiss={() => {
                        setShowShadesmar(false);
                        setSearch("");
                    }}
                />
            )}

            <div className="mx-auto max-w-6xl">
                <Map />

                {/* Search & Filter */}
                <div className="mt-10 mb-6 flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search by name, location, or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Activity count */}
                {!loading && (
                    <p className="text-sm text-gray-400 mb-4">
                        {filtered.length}{" "}
                        {filtered.length === 1 ? "activity" : "activities"}{" "}
                        found
                    </p>
                )}

                {/* Results */}
                {loading ? (
                    <p className="text-center text-gray-500 py-16">
                        Loading activities...
                    </p>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-gray-400 py-16">
                        No activities found.
                    </p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((activity) => (
                            <ActivityCard
                                key={activity._id}
                                id={activity._id}
                                title={activity.name}
                                category={activity.category}
                                description={activity.description}
                                imageSrc={getImage(activity.category)}
                            />
                        ))}
                    </div>
                )}
                <FloatingButton contents={<RecommendationChatbox />} />
            </div>
        </div>
    );
}
