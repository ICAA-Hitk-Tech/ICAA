import TagPill from "./TagPill";
import { InfoCardProps } from "@/lib/types";

const InfoCard = ({
  icon,
  headerLabel,
  accentClass,
  diamondClass,
  tags,
  bodyText,
  footer,
}: InfoCardProps) => (
  <div className="group flex flex-col border-2 border-ink bg-surface shadow-[2px_2px_0px_0px_var(--color-ink)] hover:shadow-[4px_4 	px_0px_0px_var(--color-ink)] hover:-translate-y-0.5 transition-all duration-200">
    {/* Header bar */}
    <div
      className={`flex items-center gap-3 border-b-2 border-ink ${accentClass} px-5 py-3`}
    >
      <span className="text-paper w-4 h-4 shrink-0">{icon}</span>
      <span className="font-mono text-xs font-bold tracking-widest uppercase text-paper">
        {headerLabel}
      </span>
    </div>

    {/* Body */}
    <div className="flex flex-col gap-4 p-5 flex-1">
      {/* Tag pills */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <div className={`w-1.5 h-1.5 ${diamondClass} rotate-45`} />
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Descriptive text */}
      <p className="font-sans text-sm text-ink-dim leading-relaxed text-justify">
        {bodyText}
      </p>

      {footer}
    </div>

    {/* Bottom accent strip */}
    <div className={`h-1 ${accentClass} mt-auto`} />
  </div>
);

export default InfoCard;
