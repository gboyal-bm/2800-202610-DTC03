export function NotFound() {
    const handleBackHome = () => {
        window.location.href = "/home";
    };

    return (
        <main className="p-8 min-h-[80vh]">
            <div className="flex flex-col p-12 items-center justify-center gap-8">
                <h1 className="text-6xl font-bold uppercase">Page not found</h1>
                <button className="border rounded-md py-4 px-8 bg-slate-200 font-bold text-lg uppercase" onClick={handleBackHome}>
                    Back to home
                </button>
            </div>
        </main>
    );
}