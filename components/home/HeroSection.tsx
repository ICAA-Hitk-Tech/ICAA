const HeroSection = () => {
	return (
		<div className="flex flex-col lg:flex-row px-8 pt-30 gap-10 w-full">
			<div className="flex flex-col gap-4 w-full lg:w-1/2">
				<span className="text-blue-600 font-bold text-xl lg:text-2xl">1st January, 2026 - 3rd January, 2026</span>
				<h1 className="text-6xl font-serif font-bold">
					Internation Conference on <span className="text-abyss-500 italic">Applied</span> <span className="text-grove-600 italic">Algorithms</span>
				</h1>

				<p className="mt-3 text-ink-dim/80">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>

			<div className="flex w-full lg:w-1/2 items-start">
				<div className="relative w-full p-8">
					<img
						src="/hero.png"
						alt="hero"
						className="w-full h-auto object-cover rotate-6 block"
					/>
					<div className="absolute inset-8 border-4 border-ink pointer-events-none" />
				</div>
			</div>
		</div>
	)
}

export default HeroSection;