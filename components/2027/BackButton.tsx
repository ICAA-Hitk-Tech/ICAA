import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
	return (
		<div className="hidden md:block">
			<Link href="/2027">
				<button className="group flex items-center gap-2 px-4 py-3 border-2 border-ink bg-surface text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
					<FaArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-1" />
					<span className="text-xs">Back to Home</span>
				</button>
			</Link>
		</div>
	)
}

export default BackButton;