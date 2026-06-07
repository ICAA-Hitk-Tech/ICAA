import { TagPillProps } from "@/lib/types";

const TagPill = ({ label }: TagPillProps) => (
    <span className="font-mono text-[10px] font-bold tracking-wider uppercase border border-ink bg-paper text-ink px-2 py-0.5 shadow-[2px_2px_0px_0px_var(--color-ink)]">
        {label}
    </span>
);

export default TagPill;