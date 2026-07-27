"use client";

import { useState } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { PROGRAM_COMMITTEE } from "@/constants/2027/programComm";
import { ProgramCommitteeMember } from "@/lib/types";
import BackButton from "@/components/2027/BackButton";
import ProgramCommitteeCard from "@/components/2027/program_committee/ProgramCommitteeCard";

const ProgramCommitteePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Separate Co-Chairs from regular members
  const coChairs = PROGRAM_COMMITTEE.filter((m) => m.role === "Co-Chair");
  const regularMembers = PROGRAM_COMMITTEE.filter((m) => m.role !== "Co-Chair");

  // Apply search filtering
  const filterMember = (m: ProgramCommitteeMember) => {
    const term = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      m.institution.toLowerCase().includes(term)
    );
  };

  const filteredCoChairs = coChairs.filter(filterMember);
  const filteredRegularMembers = regularMembers.filter(filterMember);
  const totalResults = filteredCoChairs.length + filteredRegularMembers.length;

  return (
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3">
            Program Committee
          </h1>
        </div>

        <BackButton />
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="w-full sm:max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-dim">
            <FaMagnifyingGlass className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by name or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-ink bg-surface text-ink font-sans text-sm focus:outline-none focus:bg-paper shadow-[3px_3px_0px_0px_var(--color-ink)] transition-all duration-150"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-dim hover:text-ink transition-colors duration-150"
            >
              <FaXmark className="w-4 h-4" />
            </button>
          )}
        </div>

        {searchTerm && (
          <span className="font-mono text-xs uppercase tracking-widest text-ink-dim shrink-0">
            {totalResults} {totalResults === 1 ? "result" : "results"}
          </span>
        )}
      </div>

      {totalResults > 0 ? (
        <div className="space-y-12">
          {/* Co-Chairs Section */}
          {filteredCoChairs.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-3">
                <span className="h-4 w-1.5 bg-chrome-400 border border-ink" />
                Co-Chairs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCoChairs.map((member, idx) => (
                  <ProgramCommitteeCard
                    key={`co-chair-${idx}`}
                    member={member}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Committee Members Section */}
          {filteredRegularMembers.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-3">
                <span className="h-4 w-1.5 bg-abyss-500 border border-ink" />
                Committee Members
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredRegularMembers.map((member, idx) => (
                  <ProgramCommitteeCard key={`member-${idx}`} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-32 flex flex-col items-center justify-center gap-4 p-8 text-center border-2 border-ink bg-surface shadow-[4px_4px_0px_0px_var(--color-ink)]">
          <h3 className="text-2xl font-serif font-bold text-ink">
            No members found
          </h3>
          <p className="text-ink-dim max-w-sm text-sm">
            Try adjusting your search keywords to find the committee member.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgramCommitteePage;
