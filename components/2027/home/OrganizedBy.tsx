import { FaUniversity, FaLaptopCode } from "react-icons/fa";
import {
	SECTION_HEADING,
	INSTITUTE_NAME,
	INSTITUTE_TAGLINE,
	DEPARTMENT_NAME,
	INSTITUTE_TEXT,
	DEPARTMENT_TEXT,
	DEPARTMENT_VISION_QUOTE,
	INSTITUTE_TAGS,
	DEPARTMENT_TAGS,
} from "../../../constants/2027/organizedBy";
import InfoCard from "./Infocard";
import HeritageBadge from "../HeritageBadge";

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
				<HeritageBadge />

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