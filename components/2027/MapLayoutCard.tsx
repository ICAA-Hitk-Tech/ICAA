import { MapLayout } from "@/lib/types";

interface MapLayoutProps {
	location: MapLayout;
	className?: string;
}
const MapLayoutCard = ({ location, className = "h-full" }: MapLayoutProps) => {
	return (
		<div className={`border-2 border-ink bg-paper shadow-[6px_6px_0px_0px_var(--color-ink)] overflow-hidden flex flex-col ${className}`}>
			{/* Window control bar */}
			<div className="bg-surface border-b-2 border-ink px-4 py-2.5 flex items-center justify-between shrink-0">
				<div className="flex gap-1.5">
					<span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/10" />
					<span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/10" />
					<span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/10" />
				</div>
				<span className="text-ink font-bold text-[10px] uppercase tracking-widest font-mono truncate max-w-50">
					{location.name.toLowerCase().replace(/\s+/g, "_")}.map
				</span>
			</div>

			{/* Map body */}
			<div className="flex-1 bg-paper relative">
				<iframe
					src={location.mapEmbedUrl}
					width="100%"
					height="100%"
					style={{ border: 0 }}
					allowFullScreen={true}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title={`Google Map location of ${location.name}`}
					className="absolute inset-0"
				/>
			</div>
		</div>
	)
}

export default MapLayoutCard;