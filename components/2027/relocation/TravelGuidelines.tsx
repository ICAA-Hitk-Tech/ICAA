import { DISCLAIMER_ACCOMMODATION, TRAVEL_CLOSING_TEXT } from '@/constants/2027/relocation';
import { FaEnvelope } from 'react-icons/fa6';

const TravelGuidelines = () => {
	return (
		<section className="border border-ink bg-surface/30 p-8 shadow-[4px_4px_0px_0px_var(--color-ink)] space-y-8">
			<div>
				<span className="font-mono text-xs uppercase tracking-widest text-grove-600 font-bold">
					Travel Guidelines
				</span>
				<h2 className="font-serif text-2xl md:text-3xl font-black text-ink leading-tight mt-1">
					Important Information & Visa Assistance
				</h2>
				<div className="flex items-center gap-2 mt-3">
					<div className="h-0.75 w-16 bg-abyss-500" />
					<div className="h-0.75 w-3 bg-chrome-400" />
				</div>
			</div>

			<div className="space-y-5 text-sm md:text-base leading-relaxed text-ink/95">
				<div className="flex gap-3 items-start">
					<span className="w-2.5 h-2.5 bg-grove-600 border border-ink rotate-45 shrink-0 mt-1.5" />
					<p className="text-justify font-sans">
						<strong>Accommodation Info:</strong>{" "}
						{DISCLAIMER_ACCOMMODATION}
					</p>
				</div>

				<div className="flex gap-3 items-start p-4 bg-chrome-200/50 border border-ink shadow-[2.5px_2.5px_0px_0px_var(--color-ink)]">
					<span className="w-2.5 h-2.5 bg-abyss-500 border border-ink rotate-45 shrink-0 mt-1" />
					<p className="text-justify font-sans text-sm text-ink/90">
						<strong className="font-mono text-xs uppercase tracking-widest text-abyss-600 block mb-1">
							Visa & Travel Support
						</strong>
						International participants with accepted papers who require travel
						and visa assistance are encouraged to notify the organizers at the
						help desk as early as possible.
					</p>
				</div>

				<div className="flex gap-3 items-start">
					<span className="w-2.5 h-2.5 bg-chrome-400 border border-ink rotate-45 shrink-0 mt-1.5" />
					<p className="text-justify font-sans">
						{TRAVEL_CLOSING_TEXT} For any further assistance or travel
						planning queries, feel free to get in touch.
					</p>
				</div>
			</div>

			{/* Central Mail-to Option button */}
			<div className="pt-2 flex justify-center">
				<a
					href="mailto:icaa@heritageit.edu"
					className="group inline-flex items-center gap-2 px-6 py-3 border border-ink bg-chrome-400 text-ink font-mono font-bold text-xs uppercase tracking-widest hover:bg-paper transition-all duration-150 shadow-[3px_3px_0px_0px_var(--color-ink)] hover:shadow-[5px_5px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none text-center"
				>
					<FaEnvelope className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
					<span>Email Conference Help Desk</span>
				</a>
			</div>
		</section>
	)
}

export default TravelGuidelines;