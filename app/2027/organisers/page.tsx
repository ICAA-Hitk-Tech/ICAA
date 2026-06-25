import type { Metadata } from "next";
import BackButton from "@/components/2027/BackButton";
import {
  ADVISORS,
  STEERING_COMMITTEE_CHAIRS,
  GENERAL_CHAIRS,
  ORGANISING_CHAIRS,
  PUBLICITY_CHAIRS,
  REGISTRATION_CHAIRS,
  PROGRAM_COMMITTEE_CO_CHAIRS,
  OrganiserMember,
} from "@/constants/2027/organisers";

export const metadata: Metadata = {
  title: "Organisers",
  description:
    "Advisors, steering committee, general chairs, organizing committee, and program committee co-chairs of ICAA 2027.",
};

const OrganiserCard = ({
  member,
  role,
}: {
  member: OrganiserMember;
  role?: string;
}) => (
  <article className="group p-5 border border-ink bg-surface shadow-[3px_3px_0px_0px_var(--color-ink)] hover:shadow-[5px_5px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
    <div className="flex flex-col gap-1.5">
      {role && (
        <span className="self-start inline-block font-serif text-[11px] font-bold tracking-widest bg-chrome-400 text-ink px-2.5 py-0.5 border border-ink shadow-[1px_1px_0px_0px_var(--color-ink)] -rotate-1 group-hover:rotate-1 transition-transform duration-200">
          {role}
        </span>
      )}
      <h3 className="font-serif text-lg font-bold text-ink leading-snug">
        {member.name}
      </h3>
      <p className="font-mono text-xs text-ink-dim tracking-wider leading-relaxed">
        {member.institution}
      </p>
    </div>
  </article>
);

const SectionHeading = ({
  title,
  colorClass,
}: {
  title: string;
  colorClass: string;
}) => (
  <h2 className="font-serif text-2xl font-black text-ink flex items-center gap-3 border-b-2 border-ink pb-3 mb-6">
    <span className={`h-6 w-1.5 ${colorClass}`} />
    {title}
  </h2>
);

export default function OrganisersPage() {
  return (
    <div className="min-h-screen bg-paper text-ink px-4 md:px-6 pt-24 pb-16 max-w-6xl mx-auto flex flex-col gap-12">
      {/* Header section */}
      <div className="flex justify-between items-center border-b-2 border-ink pb-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-ink">
          Organisers
        </h1>
        <BackButton />
      </div>

      {/* 1. Advisors */}
      <div className="space-y-4">
        <SectionHeading title="Advisors" colorClass="bg-ink-dim" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ADVISORS.map((member, idx) => (
            <OrganiserCard
              key={`advisor-${idx}`}
              member={member}
            />
          ))}
        </div>
      </div>

      {/* 2. Steering Committee Chairs */}
      <div className="space-y-4">
        <SectionHeading
          title="Steering Committee Chairs"
          colorClass="bg-grove-400"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STEERING_COMMITTEE_CHAIRS.map((member, idx) => (
            <OrganiserCard key={`steering-${idx}`} member={member} />
          ))}
        </div>
      </div>

      {/* 3 & 4. General & Organizing Chairs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <SectionHeading title="General Chair" colorClass="bg-chrome-400" />
          <div className="grid grid-cols-1 gap-4">
            {GENERAL_CHAIRS.map((member, idx) => (
              <OrganiserCard key={`general-${idx}`} member={member} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeading title="Organizing Chair" colorClass="bg-abyss-500" />
          <div className="grid grid-cols-1 gap-4">
            {ORGANISING_CHAIRS.map((member, idx) => (
              <OrganiserCard key={`organising-${idx}`} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* 5. Publicity & Registration Chairs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <SectionHeading title="Publicity Chairs" colorClass="bg-grove-600" />
          <div className="grid grid-cols-1 gap-4">
            {PUBLICITY_CHAIRS.map((member, idx) => (
              <OrganiserCard key={`publicity-${idx}`} member={member} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeading
            title="Registration Chairs"
            colorClass="bg-sea-300"
          />
          <div className="grid grid-cols-1 gap-4">
            {REGISTRATION_CHAIRS.map((member, idx) => (
              <OrganiserCard key={`registration-${idx}`} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* 6. Program Committee Co-Chairs */}
      <div className="space-y-4">
        <SectionHeading
          title="Program Committee Co-Chairs"
          colorClass="bg-gamboge"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PROGRAM_COMMITTEE_CO_CHAIRS.map((member, idx) => (
            <OrganiserCard key={`prog-cochair-${idx}`} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
