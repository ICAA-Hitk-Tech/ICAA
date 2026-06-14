/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { CARD, ARROW_BASE } from "@/constants/2027/attractions";
import { CardTransform, CoverflowCardDimensions, DeviceType } from "@/lib/types";

export function getDeviceType(width: number): DeviceType {
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
}

export function getOffset(
    index: number,
    activeIndex: number,
    totalImages: number,
): number {
    let d = index - activeIndex;
    const h = Math.floor(totalImages / 2);
    while (d > h) d -= totalImages;
    while (d < -h) d += totalImages;
    return d;
}

export function getCardTransform(
    d: number,
    card: CoverflowCardDimensions,
    spread: number,
): CardTransform {
    const isCenter = d === 0;

    const xOffset = isCenter
        ? 0
        : d > 0
            ? (d - 1) * (card.w * 0.3) + spread
            : -((-d - 1) * (card.w * 0.3) + spread);

    const rotateY = isCenter ? 0 : d > 0 ? -42 : 42;
    const zOffset = isCenter ? 120 : -100 - Math.abs(d) * 40;
    const scale = isCenter ? 1.05 : Math.max(0.65, 0.8 - Math.abs(d) * 0.06);
    const opacity = isCenter ? 1 : Math.max(0.08, 0.6 - Math.abs(d) * 0.18);
    const cardBlur = isCenter
        ? "0px"
        : `${Math.min(Math.abs(d) * 1.5, 4)}px`;

    return { xOffset, rotateY, zOffset, scale, opacity, cardBlur };
}

export function getContainerHeight(bp: DeviceType): number {
    return CARD[bp].h + 60;
}

export function getArrowClasses(bp: DeviceType): {
    arrowCls: string;
    iconCls: string;
} {
    const arrowCls =
        bp === "mobile"
            ? `w-7 h-7 ${ARROW_BASE}`
            : `w-10 h-10 ${ARROW_BASE}`;

    const iconCls = bp === "mobile" ? "w-3 h-3" : "w-4 h-4";

    return { arrowCls, iconCls };
}

export function getGlowStyle(
    bp: DeviceType,
    imageUrl: string,
): React.CSSProperties {
    return {
        backgroundImage: `url(${imageUrl})`,
        width:
            bp === "desktop" ? "600px" : bp === "tablet" ? "320px" : "200px",
        height:
            bp === "desktop" ? "300px" : bp === "tablet" ? "220px" : "160px",
        opacity:
            bp === "desktop" ? 0.15 : bp === "tablet" ? 0.07 : 0.05,
    };
}

/**
 * Processes a wheel event with a cooldown guard so rapid scrolling
 * only advances one slide at a time.
 *
 * @param e           - The React wheel event
 * @param cooldownRef - A ref whose `.current` flag is toggled internally
 * @param onNext      - Callback to advance to the next slide
 * @param onPrev      - Callback to go back to the previous slide
 * @param threshold   - Minimum delta magnitude to trigger a slide change (default 20)
 * @param cooldownMs  - Milliseconds to lock further wheel events (default 700)
 */
export function handleWheelEvent(
    e: React.WheelEvent,
    cooldownRef: React.MutableRefObject<boolean>,
    onNext: () => void,
    onPrev: () => void,
    threshold = 20,
    cooldownMs = 700,
): void {
    if (cooldownRef.current) return;

    const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    if (Math.abs(delta) > threshold) {
        cooldownRef.current = true;
        delta > 0 ? onNext() : onPrev();
        setTimeout(() => {
            cooldownRef.current = false;
        }, cooldownMs);
    }
}

/**
 * Evaluates a mouse-move event against the recorded drag start position.
 * Fires `onPrev` or `onNext` once the pointer has moved beyond `threshold`
 * pixels, then resets the drag origin to the current position for continuous
 * dragging.
 *
 * @returns The updated dragStart value (pass back into state).
 */
export function handleMouseDrag(
    clientX: number,
    dragStart: number,
    onPrev: () => void,
    onNext: () => void,
    threshold = 100,
): number {
    const diff = clientX - dragStart;
    if (Math.abs(diff) > threshold) {
        diff > 0 ? onPrev() : onNext();
        return clientX; // reset drag origin
    }
    return dragStart; // no change
}
