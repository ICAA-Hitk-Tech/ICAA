import { ProgramCommitteeMember } from "@/lib/types";

interface ProgramCommitteeProps {
	member: ProgramCommitteeMember;
}

const ProgramCommitteeCard = ({ member }: ProgramCommitteeProps) => {
	return (
		<article
			className="group p-6 border border-ink bg-surface shadow-[4px_4px_0px_0px_var(--color-ink)] hover:shadow-[6px_6px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
		>
			<div className="flex flex-col gap-2">
				{member.role && (
					<span className="self-start inline-block font-serif text-sm font-bold tracking-widest bg-chrome-400 text-ink px-2.5 py-1 border border-ink shadow-[1px_1px_0px_0px_var(--color-ink)] -rotate-1 group-hover:rotate-[1.5deg] group-hover:-translate-x-1 group-hover:-translate-y-1 duration-300 ">
						{member.role}
					</span>
				)}
				<h3 className="font-serif text-xl font-bold text-ink mt-1">
					{member.name}
				</h3>
				<p className="font-mono text-sm text-ink-dim tracking-wider">
					{member.institution}
				</p>
			</div>
		</article>
	)
}

export default ProgramCommitteeCard;