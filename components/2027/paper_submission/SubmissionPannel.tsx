import { FaPaperPlane } from "react-icons/fa6";

interface SubmissionPannelProps {
	handleSubButtonClick: () => void;
}

const SubmissionPannel = ({ handleSubButtonClick }: SubmissionPannelProps) => {
	return (
		<div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_0px_var(--color-ink)] flex flex-col overflow-hidden">
			{/* Retro Window Control Bar */}
			<div className="bg-surface border-b-2 border-ink px-4 py-2.5 flex items-center justify-between">
				<div className="flex gap-1.5">
					<span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
					<span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
					<span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
				</div>
				<span className="text-ink-dim text-[10px] font-bold uppercase tracking-widest font-mono">
					portal_status.log
				</span>
			</div>

			{/* Card Body */}
			<div className="p-6 bg-paper/30 flex flex-col gap-6">
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-gamboge animate-pulse border border-ink/20" />
						<h3 className="font-serif text-lg font-bold text-ink leading-tight">
							Opening Soon
						</h3>
					</div>
					<p className="text-xs text-ink-dim leading-relaxed font-mono">
						The submission portal is currently offline. Further
						information regarding the submission process and timeline will
						be announced in due course. Authors are advised to check this
						website periodically for updates.
					</p>
				</div>

				<button
					onClick={handleSubButtonClick}
					className="group w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-ink bg-abyss-500 text-paper font-bold uppercase tracking-wider text-xs -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-abyss-700 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
				>
					<span>Submit your Paper</span>
					<FaPaperPlane className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</button>
			</div>
		</div>
	)
}

export default SubmissionPannel;