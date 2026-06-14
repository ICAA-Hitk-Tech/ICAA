interface TopicCardProps {
	topic: string;
}

const TopicCard = ({ topic }: TopicCardProps) => {
	return (
		<div
			className="flex items-center gap-3 border-2 border-ink bg-paper p-4 shadow-[2px_2px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-surface transition-all duration-150 cursor-default"
		>
			<span className="w-2 h-2 bg-grove-600 border border-ink rotate-45 shrink-0" />
			<span className="font-bold text-sm tracking-wide text-ink font-mono leading-tight">
				{topic}
			</span>
		</div>
	)
}

export default TopicCard;