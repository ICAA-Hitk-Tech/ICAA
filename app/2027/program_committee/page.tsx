"use client";

import { useState, useRef, useEffect } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { PROGRAM_COMMITTEE } from "@/constants/2027/programComm";
import { ProgramCommitteeMember } from "@/lib/types";
import BackButton from "@/components/2027/BackButton";
import ProgramCommitteeCard from "@/components/2027/program_committee/ProgramCommitteeCard";

interface SearchControlProps {
  searchOpen: boolean;
  searchTerm: string;
  totalResults: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onToggle: () => void;
  onChange: (v: string) => void;
}

function SearchControl({
  searchOpen,
  searchTerm,
  totalResults,
  inputRef,
  onToggle,
  onChange,
}: SearchControlProps) {
  return (
    <>
      {/* ── Icon button (always visible) ── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Result count — desktop only, inline */}
        {searchOpen && searchTerm && (
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-ink-dim whitespace-nowrap">
            {totalResults} {totalResults === 1 ? "result" : "results"}
          </span>
        )}

        {/* Inline expanding input — desktop only */}
        <div className="hidden sm:flex items-center">
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              searchOpen ? "w-56 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Name or institution..."
              value={searchTerm}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border-2 border-r-0 border-ink bg-surface text-ink font-sans text-xs focus:outline-none focus:bg-paper transition-colors duration-150"
            />
          </div>
          <button
            onClick={onToggle}
            aria-label={searchOpen ? "Close search" : "Open search"}
            className={`flex items-center justify-center w-9 h-9 border-2 border-ink transition-colors duration-150 cursor-pointer shrink-0 ${
              searchOpen
                ? "bg-ink text-paper hover:bg-ink/80"
                : "bg-surface text-ink hover:bg-border"
            }`}
          >
            {searchOpen ? (
              <FaXmark className="w-3.5 h-3.5" />
            ) : (
              <FaMagnifyingGlass className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Mobile icon only */}
        <button
          onClick={onToggle}
          aria-label={searchOpen ? "Close search" : "Open search"}
          className={`sm:hidden flex items-center justify-center w-9 h-9 border-2 border-ink transition-colors duration-150 cursor-pointer shrink-0 ${
            searchOpen
              ? "bg-ink text-paper hover:bg-ink/80"
              : "bg-surface text-ink hover:bg-border"
          }`}
        >
          {searchOpen ? (
            <FaXmark className="w-3.5 h-3.5" />
          ) : (
            <FaMagnifyingGlass className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* ── Mobile expanded row — full width below heading ── */}
      {searchOpen && (
        <div className="sm:hidden w-full flex flex-col gap-1.5 mt-2">
          <input
            type="text"
            placeholder="Search by name or institution..."
            value={searchTerm}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
            className="w-full px-3 py-2.5 border-2 border-ink bg-surface text-ink font-sans text-sm focus:outline-none focus:bg-paper transition-colors duration-150"
          />
          {searchTerm && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              {totalResults} {totalResults === 1 ? "result" : "results"}
            </span>
          )}
        </div>
      )}
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

const ProgramCommitteePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchTerm("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearchToggle = () => {
    if (searchOpen) {
      setSearchTerm("");
      setSearchOpen(false);
    } else {
      setSearchOpen(true);
    }
  };

  const coChairs = PROGRAM_COMMITTEE.filter((m) => m.role === "Co-Chair");
  const regularMembers = PROGRAM_COMMITTEE.filter((m) => m.role !== "Co-Chair");

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
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-ink pb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3">
          Program Committee
        </h1>
        <BackButton />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      {totalResults > 0 ? (
        <div className="space-y-12">
          {/* Co-Chairs */}
          {filteredCoChairs.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-ink/10 pb-3">
                <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-3 shrink-0">
                  <span className="h-4 w-1.5 bg-chrome-400 border border-ink" />
                  Co-Chairs
                </h2>
                <SearchControl
                  searchOpen={searchOpen}
                  searchTerm={searchTerm}
                  totalResults={totalResults}
                  inputRef={inputRef}
                  onToggle={handleSearchToggle}
                  onChange={setSearchTerm}
                />
              </div>
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

          {/* Committee Members */}
          {filteredRegularMembers.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-ink/10 pb-3">
                <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-3 shrink-0">
                  <span className="h-4 w-1.5 bg-abyss-500 border border-ink" />
                  Committee Members
                </h2>
                {filteredCoChairs.length === 0 && (
                  <SearchControl
                    searchOpen={searchOpen}
                    searchTerm={searchTerm}
                    totalResults={totalResults}
                    inputRef={inputRef}
                    onToggle={handleSearchToggle}
                    onChange={setSearchTerm}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredRegularMembers.map((member, idx) => (
                  <ProgramCommitteeCard key={`member-${idx}`} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 border-b border-ink/10 pb-3">
            <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-3 shrink-0 opacity-0 select-none">
              Committee
            </h2>
            <SearchControl
              searchOpen={searchOpen}
              searchTerm={searchTerm}
              totalResults={totalResults}
              inputRef={inputRef}
              onToggle={handleSearchToggle}
              onChange={setSearchTerm}
            />
          </div>
          <div className="min-h-32 flex flex-col items-center justify-center gap-4 p-8 text-center border-2 border-ink bg-surface shadow-[4px_4px_0px_0px_var(--color-ink)]">
            <h3 className="text-2xl font-serif font-bold text-ink">
              No members found
            </h3>
            <p className="text-ink-dim max-w-sm text-sm">
              Try adjusting your search keywords to find the committee member.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramCommitteePage;
