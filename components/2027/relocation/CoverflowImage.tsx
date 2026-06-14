import { CoverflowImageProps } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

const CoverflowImage = ({
	index,
	rotateY,
	xOffset,
	zOffset,
	scale,
	opacity,
	card,
	cardBlur,
	d,
	isCenter,
	setActiveIndex,
	img
}: CoverflowImageProps) => {
	return (
		<motion.div
			key={index}
			animate={{ rotateY, x: xOffset, z: zOffset, scale, opacity }}
			transition={{ type: "spring", stiffness: 240, damping: 26 }}
			style={{
				transformStyle: "preserve-3d",
				position: "absolute",
				width: card.w,
				height: card.h,
				zIndex: 20 - Math.abs(d),
				filter: `blur(${cardBlur})`,
				pointerEvents: "auto",
			}}
			onClick={(e) => {
				if (!isCenter) {
					e.stopPropagation();
					setActiveIndex(index);
				}
			}}
			className="group border-3 border-ink bg-surface overflow-hidden cursor-pointer shadow-[2px_2px_0px_0px_var(--color-ink)]"
		>
			<div className="relative w-full h-full">
				<Image
					src={img.url}
					alt={img.title}
					fill
					sizes={`${card.w}px`}
					className="object-cover transition-transform duration-500 group-hover:scale-102 pointer-events-none"
					priority={isCenter}
				/>
				{!isCenter && (
					<div className="absolute inset-0 bg-ink/40 transition-opacity duration-300" />
				)}
			</div>
		</motion.div>
	)
}

export default CoverflowImage;