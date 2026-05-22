import { useEffect, useMemo, useState } from "react";

import { ShadesmarApi } from "../utils/shadesmar_api";

export function Admin() {
    const [requests, setRequests] = useState<any[]>([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("all");

    async function load() {
        const res: any = await ShadesmarApi.apiFetch("/activity-requests");

        setRequests(res?.result || res || []);
    }

    async function updateStatus(id: string, status: string) {
        await ShadesmarApi.apiFetch(`/activity-requests/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                status,
            }),
        });

        load();
    }

    useEffect(() => {
        load();
    }, []);

    const filtered = useMemo(() => {
        return requests.filter((r: any) => {
            const matchesSearch =
                r.name?.toLowerCase().includes(search.toLowerCase()) ||
                r.location?.toLowerCase().includes(search.toLowerCase());

            const matchesFilter = filter === "all" ? true : r.status === filter;

            return matchesSearch && matchesFilter;
        });
    }, [requests, search, filter]);

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">
                    Admin Activity Requests
                </h1>

                <div className="flex gap-4 mb-6">
                    <input
                        className="border rounded p-2 flex-1"
                        placeholder="Search requests..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="border rounded p-2"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="denied">Denied</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filtered.map((r: any) => (
                        <div
                            key={r._id}
                            className="bg-white shadow rounded-xl p-5"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="font-bold text-xl">
                                        {r.name}
                                    </h2>

                                    <p>
                                        {r.location}
                                        {" • "}
                                        {r.category}
                                    </p>

                                    <p className="text-gray-600 mt-2">
                                        {r.description}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        r.status === "approved"
                                            ? "bg-green-100"
                                            : r.status === "denied"
                                              ? "bg-red-100"
                                              : "bg-yellow-100"
                                    }`}
                                >
                                    {r.status}
                                </span>
                            </div>

                            {r.status === "pending" && (
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() =>
                                            updateStatus(r._id, "approved")
                                        }
                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() =>
                                            updateStatus(r._id, "denied")
                                        }
                                        className="bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Deny
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
