export function Admin() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Restricted to administrators only
                    </p>
                </header>
            </div>
        </div>
    );
}
