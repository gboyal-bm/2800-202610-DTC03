export function Auth() {
    return (
        <main className="max-w-2xl mx-auto my-6 mb-28">
            <h1 className="text-5xl py-12 font-bold">Login</h1>
            <div className="border-2 flex flex-col justify-center p-8 rounded-xl gap-16 bg-slate-200">
                <div className="w-full flex flex-row gap-8">
                    <div className="flex flex-col gap-8">
                        <label className="flex text-lg flex-1 items-center font-semibold">
                            Email:
                        </label>
                        <label className="flex text-lg flex-1 items-center font-semibold">
                            Password:
                        </label>
                    </div>
                    <div className="flex flex-1 flex-col gap-8">
                        <input
                            type="email"
                            className="flex flex-1 border p-2 rounded-md w-full bg-white"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className="flex flex-1 border p-2 rounded-md w-full bg-white"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <button className="border py-4 rounded-lg text-lg font-bold bg-white">
                    Log In
                </button>
            </div>
        </main>
    );
}
