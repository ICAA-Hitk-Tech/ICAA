import { images } from "@/constants/2027/cloudinary_images";
import Image from "next/image";

const HeritageBadge = () => {
	return (
		<div className="relative shrink-0">
			<div className="border-2 border-ink bg-surface p-4 shadow-[6px_6px_0px_0px_var(--color-ink)] hover:shadow-[8px_8px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200">
				<div className="relative w-20 h-20 md:w-28 md:h-28">
					<Image
						src={images.heritage}
						alt="Heritage logo"
						fill
						sizes="(max-width: 768px) 5rem, 7rem"
						className="object-contain"
						priority
					/>
				</div>
			</div>
			
			{/* Floating accent tag */}
			<div className="absolute -top-3.5 -right-3.5 bg-chrome-400 text-ink text-[10px] font-mono font-bold px-2 py-1 border border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] rotate-3 uppercase whitespace-nowrap">
				ESTD. 2001
			</div>
		</div>
	)
}

export default HeritageBadge;