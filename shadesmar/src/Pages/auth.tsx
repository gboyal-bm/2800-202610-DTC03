import { Link, useNavigate } from "react-router-dom";
import { ShadesmarApi } from "../utils/shadesmar_api";
import { useState } from "react";

type AuthMode = "login" | "register";

interface AuthModes {
    mode: AuthMode;
}

export function Auth({ mode }: AuthModes) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        rememberMe: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting form:", form);
        try {
            const result = await ShadesmarApi.apiFetch(`/auth/${mode}`, {
                method: "POST",
                body: JSON.stringify(form),
            });
            console.log("Authentication result:", result);
            if (result.status === 200) {
                navigate("/home");
            }
        } catch (err) {
            console.error("Authentication error:", err);
        }
    };

    return (
        <main className="max-w-2xl mx-auto my-6 mb-28">
            <h1 className="text-5xl py-12 font-bold">
                {mode == "login" ? "Log In" : "Register"}
            </h1>
            <div className="border-2 flex flex-col justify-center p-8 rounded-xl gap-16 bg-slate-200">
                <div className="w-full flex flex-row gap-8">
                    <div className="flex flex-col gap-8">
                        <label className="flex text-lg flex-1 items-center font-semibold">
                            Email:
                        </label>
                        {mode === "register" && (
                            <>
                                <label className="flex text-lg flex-1 items-center font-semibold">
                                    Username
                                </label>
                            </>
                        )}
                        <label className="flex text-lg flex-1 items-center font-semibold">
                            Password:
                        </label>
                    </div>
                    <form className="flex flex-1 flex-col gap-8" onSubmit={handleSubmit}>
                        {mode === "register" && (
                            <>
                                <input
                                    type="text"
                                    name="username"
                                    className="flex flex-1 border p-2 rounded-md w-full bg-white"
                                    placeholder="Username"
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <input
                            type="email"
                            name="email"
                            className="flex flex-1 border p-2 rounded-md w-full bg-white"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            className="flex flex-1 border p-2 rounded-md w-full bg-white"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <input type="submit" value={mode === "login" ? "Log In" : "Register"} />
                    </form>
                </div>
                <div className="flex flex-1 flex-col gap-4">
                    <button className="border py-4 rounded-lg text-lg font-bold bg-white">
                        {mode === "login" ? "Log In" : "Register"}
                    </button>
                </div>
                <p>
                    {mode == "login" ? (
                        <>
                            No account?{" "}
                            <Link to="/register" className="underline text-blue-800">
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link to="/login" className="underline text-blue-800">
                                Log in
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </main >
    );
}
