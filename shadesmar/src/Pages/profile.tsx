export function Profile() {
	const user = {
		name: "Name",
		email: "abc123@example.com",
		bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam deserunt illo iure perspiciatis hic repellat.",
		location: "Vancouver, BC",
		level: "1",
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
			{/* Profile Header / Identity */}
			<header className="flex-1 flex items-center justify-center px-6 py-20">
				<div className="text-center max-w-2xl w-full">
					{/* Profile Image Placeholder */}
					<div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-full mx-auto mb-8 flex items-center justify-center text-3xl">
						Icon
					</div>
					<div className="flex justify-center gap-4 ml-4">
						<h1 className="text-4xl font-bold mb-2">{user.name}</h1>
						<div className="w-12 h-12 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-3xl">
							<h1 className="text-4xl font-bold mb-1">{user.level}</h1>
						</div>
					</div>
					<p className="text-gray-500 mb-6 font-medium">{user.location}</p>

					<p className="text-lg mb-10">{user.bio}</p>

					<div className="flex justify-center gap-4">
						<button className="px-6 py-3 rounded-lg font-medium bg-a4 transition hover:opacity-90">
							Edit Profile
						</button>
						<button className="px-6 py-3 rounded-lg font-medium border border-gray-300 bg-white transition hover:bg-gray-50">
							Settings
						</button>
					</div>
				</div>
			</header>

			{/* Account Details Section */}
			<section className="py-16 bg-a2">
				<div className="max-w-4xl mx-auto px-6">
					<h3 className="text-2xl font-bold mb-8 text-center">
						Account Information
					</h3>

					<div className="grid gap-6 md:grid-cols-2">
						{/* Email Card */}
						<div className="p-6 bg-white border rounded-xl hover:shadow-md transition">
							<p className="text-xs font-bold tracking-wider text-gray-400 mb-1">
								EMAIL ADDRESS
							</p>
							<p className="text-lg font-medium">{user.email}</p>
						</div>

						{/* Location Card */}
						<div className="p-6 bg-white border rounded-xl hover:shadow-md transition">
							<p className="text-xs font-bold tracking-wider text-gray-400 mb-1">
								CURRENT LOCATION
							</p>
							<p className="text-lg font-medium">{user.location}</p>
						</div>

						{/* Placeholder Badges */}
						<div className="p-6 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 italic">
							Badges/Others
						</div>
						<div className="p-6 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 italic">
							Additional Stuff
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t bg-gray-50">
				<div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
					© Footer Stuff
				</div>
			</footer>
		</div>
	);
}
