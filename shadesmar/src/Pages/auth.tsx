import { Link, useNavigate } from "react-router-dom";
import { ShadesmarApi } from "../utils/shadesmar_api";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";

type AuthMode = "login" | "register";

interface AuthModes {
    mode: AuthMode;
}

export function Auth({ mode }: AuthModes) {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        rememberMe: true,
    });
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);

        try {
            const result = await ShadesmarApi.apiFetch(`/auth/${mode}`, {
                method: "POST",
                body: JSON.stringify(form),
            }, true);

            // Status is 200 for login or 201 for registration
            if (result.ok) {
                // Sync the auth context with the now-active session
                const user = await ShadesmarApi.getUser();
                setUser(user);
                navigate("/exploration");
            } else {
                const data = result.result as any;
                if (data?.errors && Array.isArray(data.errors)) {
                    setErrors(data.errors);
                } else if (data?.message) {
                    setErrors([data.message]);
                } else {
                    setErrors([
                        "An unexpected error occurred. Please try again.",
                    ]);
                }
            }
        } catch (err) {
            console.error("Authentication error:", err);
            setErrors(["An unexpected error occurred. Please try again."]);
        }
    };

    return (
        <main className="max-w-2xl mx-auto my-6 mb-28">
            <h1 className="text-5xl py-12 font-bold">
                {mode === "login" ? "Log In" : "Register"}
            </h1>

            <form
                className="border-2 flex flex-col p-8 rounded-xl gap-8 bg-slate-200"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-6">
                    {/* Error messages */}
                    {errors.length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex flex-col gap-1">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}

                    {/* Render Username only on register */}
                    {mode === "register" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="border p-2 rounded-md w-full bg-white"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="border p-2 rounded-md w-full bg-white"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="border p-2 rounded-md w-full bg-white"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="border py-4 rounded-lg text-lg font-bold bg-white hover:bg-slate-50 transition-colors"
                >
                    {mode === "login" ? "Log In" : "Register"}
                </button>

                <p className="text-center">
                    {mode === "login" ? (
                        <>
                            No account?{" "}
                            <Link
                                to="/register"
                                className="underline text-blue-800"
                            >
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="underline text-blue-800"
                            >
                                Log in
                            </Link>
                        </>
                    )}
                </p>
            </form>
        </main>
    );
}
