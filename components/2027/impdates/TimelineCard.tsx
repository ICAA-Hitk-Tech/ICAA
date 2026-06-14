import { ImportantDate } from "@/lib/types";
import { FaCalendarDays } from "react-icons/fa6";

interface TimelineCardProps {
	item: ImportantDate;
}

const TimelineCard = ({ item }: TimelineCardProps) => {
	return (
		<article className="p-6 border border-ink bg-surface/40 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-surface hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--color-ink)] transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
			<div className="min-w-0 flex-1">
				<h3 className="font-serif text-xl md:text-2xl font-semibold text-ink">
					{item.event}
				</h3>
				{item.note && (
					<span className="inline-block mt-2 font-mono text-[10px] font-bold uppercase tracking-wider bg-abyss-500 text-paper px-2 py-0.5 border border-ink shadow-[1px_1px_0px_0px_var(--color-ink)]">
						{item.note}
					</span>
				)}
			</div>

			<div className="shrink-0 flex items-center gap-2">
				<span className="inline-flex items-center gap-2 font-mono text-sm md:text-base font-bold text-ink bg-chrome-200 px-4 py-2 border border-ink shadow-[3px_3px_0px_0px_var(--color-ink)] -rotate-1 group-hover:rotate-[1.5deg] transition-transform duration-300">
					<FaCalendarDays className="w-3.5 h-3.5" />
					{item.date}
				</span>
			</div>
		</article>
	)
}

export default TimelineCard;