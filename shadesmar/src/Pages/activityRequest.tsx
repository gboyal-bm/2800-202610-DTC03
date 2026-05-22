import { useState } from "react";
import { ShadesmarApi } from "../utils/shadesmar_api";

export function ActivityRequest() {
    const [form, setForm] = useState({
        name: "",
        location: "",
        category: "",
        description: "",
    });

    async function submit(e: React.FormEvent) {
        e.preventDefault();

        await ShadesmarApi.apiFetch("/activity-requests", {
            method: "POST",
            body: JSON.stringify(form),
        });

        alert("Request submitted!");

        setForm({
            name: "",
            location: "",
            category: "",
            description: "",
        });
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Request an Activity</h1>

            <form onSubmit={submit} className="space-y-4 max-w-lg">
                <input
                    placeholder="Name"
                    className="border p-3 rounded w-full"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Location"
                    className="border p-3 rounded w-full"
                    value={form.location}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            location: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Category"
                    className="border p-3 rounded w-full"
                    value={form.category}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            category: e.target.value,
                        })
                    }
                />

                <textarea
                    placeholder="Description"
                    className="border p-3 rounded w-full"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Request
                </button>
            </form>
        </div>
    );
}
