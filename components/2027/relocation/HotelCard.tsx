import { HotelCardProps } from "@/lib/types";
import Image from "next/image";
import { FaGlobe, FaLocationDot, FaMapLocationDot, FaPhone } from "react-icons/fa6";

const HotelCard = ({
	index,
	hotel,
	isActive,
	setActiveIndex
}: HotelCardProps) => {
	return (
		<div
			onClick={() => setActiveIndex(index)}
			className={`flex flex-col sm:flex-row border border-ink bg-surface/30 cursor-pointer transition-all duration-200 ${isActive
				? "shadow-[4px_4px_0px_0px_var(--color-ink)] bg-surface border-grove-600 -translate-x-0.5 -translate-y-0.5"
				: "shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-surface/50 hover:shadow-[5px_5px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5"
				}`}
		>
			{/* Photo */}
			<div className="relative w-full sm:w-48 h-44 sm:h-auto border-b-2 sm:border-b-0 sm:border-r-2 border-ink overflow-hidden bg-white shrink-0">
				<Image
					src={hotel.image}
					alt={`${hotel.name} building`}
					fill
					sizes="(max-width: 640px) 100vw, 12rem"
					className="object-cover transition-transform duration-300"
					priority={index === 0}
				/>
			</div>

			{/* Info details */}
			<div className="flex-1 p-5 flex flex-col justify-between gap-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between gap-2">
						<h3 className="font-serif text-lg font-black text-ink leading-tight">
							{hotel.name}
						</h3>
						{isActive && (
							<span className="font-mono text-[9px] uppercase font-bold text-grove-600 border border-grove-600/30 px-2 py-0.5 bg-grove-600/10">
								Viewing Location
							</span>
						)}
					</div>

					<div className="space-y-1.5 text-xs font-sans text-ink-dim">
						<div className="flex items-start gap-2">
							<FaLocationDot className="w-3.5 h-3.5 text-ink-dim shrink-0 mt-0.5" />
							<span>{hotel.address}</span>
						</div>
						<div className="flex items-center gap-2">
							<FaPhone className="w-3.5 h-3.5 text-ink-dim shrink-0" />
							<a
								href={`tel:${hotel.phone}`}
								className="font-mono hover:underline hover:text-grove-600 transition-colors duration-150"
								onClick={(e) => e.stopPropagation()} // prevent switching tab map view on phone click
							>
								{hotel.phone}
							</a>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					{/* Show Map Indicator */}
					<button
						type="button"
						className={`flex items-center gap-1.5 px-3.5 py-1.5 border border-ink font-mono font-bold text-[10px] uppercase tracking-wider transition-colors duration-150 shadow-[1.5px_1.5px_0px_0px_var(--color-ink)] ${isActive
							? "bg-abyss-500 text-paper"
							: "bg-paper text-ink hover:bg-ink/5"
							} cursor-pointer`}
					>
						<FaMapLocationDot className="w-3.5 h-3.5" />
						<span>Map Location</span>
					</button>

					{/* Website CTA */}
					<a
						href={hotel.website}
						target="_blank"
						rel="noopener noreferrer"
						onClick={(e) => e.stopPropagation()} // prevent switching tab state
						className="group flex items-center gap-1.5 px-3.5 py-1.5 border border-ink bg-paper text-ink font-mono font-bold text-[10px] uppercase tracking-wider hover:bg-chrome-400 transition-colors duration-150 shadow-[1.5px_1.5px_0px_0px_var(--color-ink)] active:translate-y-0 active:shadow-none"
					>
						<FaGlobe className="w-3 h-3" />
						<span>Visit</span>
					</a>
				</div>
			</div>
		</div>
	)
}

export default HotelCard;