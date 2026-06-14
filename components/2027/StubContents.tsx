import { StubProps } from "@/lib/types";
import BackButton from "./BackButton";

const StubContents = ({ page, heading, description }: StubProps) => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 gap-4">
			<span className="font-mono text-xs uppercase tracking-widest text-ink-ghost border border-border px-3 py-1">
				{page}
			</span>
			<h1 className="text-4xl font-serif font-bold text-ink text-center">
				{heading}
			</h1>
			<p className="text-ink-dim text-center max-w-md">
				{description}
			</p>

			<BackButton />
		</div>
	)
}

export default StubContents;