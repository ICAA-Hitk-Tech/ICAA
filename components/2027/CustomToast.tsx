import { ToastProps } from "@/lib/types";
import { FaCircleInfo, FaXmark } from "react-icons/fa6";

const CustomToast = ({ toastMessage, setToastMessage }: ToastProps) => {
	return (
		<div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
			<div className="flex items-center gap-3 px-5 py-4 border-2 border-ink bg-chrome-200 text-ink font-bold shadow-[4px_4px_0px_0px_var(--color-ink)] max-w-sm">
				<FaCircleInfo className="w-5 h-5 text-ink shrink-0" />
				<span className="text-sm font-mono tracking-wide">
					{toastMessage}
				</span>
				<button
					onClick={() => setToastMessage(null)}
					className="ml-auto hover:text-destructive transition-colors focus:outline-none cursor-pointer"
					aria-label="Close notification"
				>
					<FaXmark className="w-4 h-4" />
				</button>
			</div>
		</div>
	)
}

export default CustomToast;