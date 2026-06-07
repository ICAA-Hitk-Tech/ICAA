import Image from "next/image";
import { FaUniversity, FaLaptopCode } from "react-icons/fa";
import {
	SECTION_HEADING,
	INSTITUTE_NAME,
	INSTITUTE_TAGLINE,
	DEPARTMENT_NAME,
	INSTITUTE_LOGO_SRC,
	INSTITUTE_LOGO_ALT,
	INSTITUTE_EST_TAG,
	INSTITUTE_TEXT,
	DEPARTMENT_TEXT,
	DEPARTMENT_VISION_QUOTE,
	INSTITUTE_TAGS,
	DEPARTMENT_TAGS,
} from "../../../constants/2027/organizedBy";
import InfoCard from "./Infocard";

const OrganizedBy = () => {
	return (
		<section className="w-full px-10 py-8">
			{/* ── Section header ── */}
			<div className="flex flex-col items-center gap-3 mb-8">
				<h2 className="font-serif text-4xl md:text-5xl font-bold text-ink text-center leading-tight">
					{SECTION_HEADING}
				</h2>
				<div className="flex items-center gap-2 mt-1">
					<div className="h-0.75 w-16 bg-abyss-500" />
					<div className="h-0.75 w-3 bg-chrome-400" />
				</div>
			</div>

			{/* ── Logo + identity strip ── */}
			<div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-10 mb-8">
				<div className="relative inline-block">
					<div className="border-2 border-ink bg-surface p-4 shadow-[6px_6px_0px_0px_var(--color-ink)] hover:shadow-[8px_8px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200">
						<div className="relative w-16 h-16 md:w-28 md:h-28 lg:w-35 lg:h-35">
							<Image
								src={INSTITUTE_LOGO_SRC}
								alt={INSTITUTE_LOGO_ALT}
								fill
								sizes="(max-width: 768px) 6rem, (max-width: 1024px) 8rem, 10rem"
								className="object-contain"
								priority
							/>
						</div>
					</div>
					{/* Floating accent tag */}
					<div className="absolute -top-3.5 -right-3.5 bg-chrome-400 text-ink text-[10px] font-mono font-bold px-2 py-1 border border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] rotate-3 uppercase whitespace-nowrap">
						{INSTITUTE_EST_TAG}
					</div>
				</div>

				<div className="text-center mt-2">
					<p className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-ink">
						{INSTITUTE_NAME}
					</p>
					<p className="font-mono text-xs md:text-sm lg:text-base text-ink-dim mt-1 tracking-wide">
						{INSTITUTE_TAGLINE}
					</p>
					<p className="font-sans text-sm md:text-lg lg:text-xl font-semibold text-abyss-500 mt-0.5">
						{DEPARTMENT_NAME}
					</p>
				</div>
			</div>

			{/* ── Info cards ── */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
				<InfoCard
					icon={<FaLaptopCode />}
					headerLabel="About the Department"
					accentClass="bg-grove-600"
					diamondClass="bg-grove-600"
					tags={DEPARTMENT_TAGS}
					bodyText={DEPARTMENT_TEXT}
					footer={
						<blockquote className="border-l-4 border-grove-600 pl-4 mt-auto">
							<p className="font-serif text-sm italic text-ink-dim leading-snug">
								{DEPARTMENT_VISION_QUOTE}
							</p>
						</blockquote>
					}
				/>

				<InfoCard
					icon={<FaUniversity />}
					headerLabel="About the Institute"
					accentClass="bg-abyss-500"
					diamondClass="bg-abyss-500"
					tags={INSTITUTE_TAGS}
					bodyText={INSTITUTE_TEXT}
				/>
			</div>
		</section>
	);
};

export default OrganizedBy;