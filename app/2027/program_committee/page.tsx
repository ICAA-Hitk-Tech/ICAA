"use client";

import { useState } from "react";
import Link from "next/link";

import { FaArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import {
  PROGRAM_COMMITTEE,
  ProgramCommitteeMember,
} from "@/constants/2027/programComm";

export default function ProgramCommitteePage() {
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
    <div className="min-h-screen bg-paper text-ink px-6 pt-24 pb-24 max-w-6xl mx-auto flex flex-col gap-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3">
            Program Committee
          </h1>
        </div>

        <div className="hidden md:block shrink-0">
          <Link href="/2027">
            <button className="group flex items-center gap-2 px-6 py-3 border-2 border-ink bg-surface text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
              <FaArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-dim">
          <FaMagnifyingGlass className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search by name or institution..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-ink bg-surface text-ink font-sans text-sm focus:outline-none focus:bg-paper shadow-[3px_3px_0px_0px_var(--color-ink)] transition-all duration-150"
        />
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
                  <article
                    key={`cochair-${idx}`}
                    className="group p-6 border border-ink bg-surface shadow-[4px_4px_0px_0px_var(--color-ink)] hover:shadow-[6px_6px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="self-start inline-block font-serif text-sm font-bold tracking-widest bg-chrome-400 text-ink px-2.5 py-1 border border-ink shadow-[1px_1px_0px_0px_var(--color-ink)] -rotate-1 group-hover:rotate-[1.5deg] group-hover:-translate-x-1 group-hover:-translate-y-1 duration-300 ">
                        {member.role}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-ink mt-1">
                        {member.name}
                      </h3>
                      <p className="font-mono text-sm text-ink-dim tracking-wider">
                        {member.institution}
                      </p>
                    </div>
                  </article>
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
                  <article
                    key={`member-${idx}`}
                    className="group p-5 border border-ink bg-surface/50 shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-surface hover:shadow-[4px_4px_0px_0px_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <h3 className="font-serif text-lg font-bold text-ink">
                      {member.name}
                    </h3>
                    <p className="font-mono text-sm text-ink-dim tracking-wider mt-1.5">
                      {member.institution}
                    </p>
                  </article>
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
}
