"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import BackButton from "@/components/2027/BackButton";
import {
  ACCEPTED_PAPERS,
  FULL_PAPERS,
  SHORT_PAPERS,
  PAPER_TYPE_LABELS,
  type AcceptedPaper,
  type PaperType,
} from "@/constants/2027/acceptedPapers";

// ── Filter types ───────────────────────────────────────────────────────────────

type FilterMode = "all" | "id" | "title" | "author";

const ALL_FILTER_OPTIONS: { label: string; value: FilterMode }[] = [
  { label: "All", value: "all" },
  { label: "ID", value: "id" },
  { label: "Title", value: "title" },
  { label: "Author", value: "author" },
];

type TypeView = "all" | PaperType;

// Author filter is only offered once at least one paper has authors listed.
const HAS_AUTHORS = ACCEPTED_PAPERS.some((p) => (p.authors?.length ?? 0) > 0);

const FILTER_OPTIONS = ALL_FILTER_OPTIONS.filter(
  (o) => o.value !== "author" || HAS_AUTHORS,
);

// ── Paper section (ledger list for one paper type) ────────────────────────────

function PaperSection({
  type,
  papers,
}: {
  type: PaperType;
  papers: AcceptedPaper[];
}) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby={`${type}-papers`}>
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id={`${type}-papers`}
          className="font-serif text-2xl md:text-3xl font-black text-ink-soft"
        >
          {PAPER_TYPE_LABELS[type]}
        </h2>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-dim/60">
          {papers.length} {papers.length === 1 ? "paper" : "papers"}
        </span>
      </div>

      <div className="flex flex-col">
        {papers.map((paper, idx) => (
          <div
            key={`${paper.type}-${paper.pid}`}
            className={`flex gap-0 py-4 sm:py-5 ${
              idx === 0 ? "border-t-2 border-ink" : "border-t border-ink/15"
            } ${idx === papers.length - 1 ? "border-b-2 border-ink" : ""}`}
          >
            {/* Large faded index — hidden on mobile */}
            <div className="hidden sm:flex w-16 shrink-0 justify-end pr-5 pt-0.5 select-none">
              <span
                className="font-serif font-black text-[40px] leading-none"
                style={{ color: "rgba(26,26,26,0.08)" }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-2.5 min-w-0">
              {/* PID badge */}
              <span
                className={`self-start inline-flex items-center border font-mono text-[11px] font-bold tracking-[0.08em] leading-none px-2 py-1.5 ${
                  type === "full"
                    ? "border-sea-500 bg-sea-300/20 text-sea-700"
                    : "border-gamboge bg-chrome-200/30 text-ink-soft"
                }`}
              >
                PID {paper.pid}
              </span>
              <h3 className="font-serif text-[17px] sm:text-[18px] md:text-[20px] font-bold text-ink-soft leading-snug wrap-break-word hyphens-auto">
                {paper.title}
              </h3>
              {paper.authors && paper.authors.length > 0 && (
                <p className="font-mono text-[10px] text-ink-dim leading-relaxed">
                  {paper.authors.map((author, i) => (
                    <span key={i}>
                      {author}
                      {i < paper.authors!.length - 1 && (
                        <span className="mx-1.5 text-ink-dim/30">·</span>
                      )}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AcceptedPapersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [typeView, setTypeView] = useState<TypeView>("all");

  const hasPapers = ACCEPTED_PAPERS.length > 0;

  // React Compiler memoizes this automatically, so no useMemo is needed.
  const term = query.toLowerCase().trim().replace(/^#/, "");

  const matches = (p: AcceptedPaper) => {
    if (!term) return true;
    const inId = p.pid.toLowerCase().includes(term);
    const inTitle = p.title.toLowerCase().includes(term);
    const inAuthors = (p.authors ?? []).some((a) =>
      a.toLowerCase().includes(term),
    );
    if (filter === "id") return inId;
    if (filter === "title") return inTitle;
    if (filter === "author") return inAuthors;
    return inId || inTitle || inAuthors;
  };

  const filteredFull = FULL_PAPERS.filter(matches);
  const filteredShort = SHORT_PAPERS.filter(matches);
  const visibleFull = typeView === "short" ? [] : filteredFull;
  const visibleShort = typeView === "full" ? [] : filteredShort;
  const totalResults = visibleFull.length + visibleShort.length;

  const typeTabs: { label: string; value: TypeView; count: number }[] = [
    {
      label: "All",
      value: "all",
      count: filteredFull.length + filteredShort.length,
    },
    { label: "Full", value: "full", count: filteredFull.length },
    { label: "Short", value: "short", count: filteredShort.length },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink-soft px-4 md:px-6 pt-24 pb-20 max-w-4xl mx-auto flex flex-col gap-8">
      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <div className="border-b-2 border-ink pb-4 flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-ink-soft">
          Accepted Papers
        </h1>
        <BackButton />
      </div>

      {hasPapers ? (
        <>
          {/* ── Paper type tabs ───────────────────────────────────────────────── */}
          <div
            role="tablist"
            aria-label="Paper type"
            className="flex items-end gap-6 sm:gap-8 border-b border-ink/15 -mb-2"
          >
            {typeTabs.map((tab) => {
              const active = typeView === tab.value;
              const bar =
                tab.value === "full"
                  ? "bg-sea-500"
                  : tab.value === "short"
                    ? "bg-gamboge"
                    : "bg-ink-soft";
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTypeView(tab.value)}
                  className={`relative pb-3 flex items-baseline gap-1.5 cursor-pointer transition-colors duration-100 ${
                    active
                      ? "text-ink-soft"
                      : "text-ink-dim/60 hover:text-ink-soft"
                  }`}
                >
                  <span className="font-serif text-lg sm:text-xl font-bold leading-none">
                    {tab.label}
                  </span>
                  <span className="font-mono text-[10px] font-bold leading-none">
                    {tab.count}
                  </span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 -bottom-px h-0.75 ${bar}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Controls — single row ─────────────────────────────────────────── */}
          <div className="flex items-stretch gap-2">
            {/* Search input (hidden on mobile while the filter picker is open) */}
            <div
              className={`relative flex-1 ${filtersOpen ? "hidden sm:block" : ""}`}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  filter === "all" ? "Search papers…" : `Search by ${filter}…`
                }
                className="w-full h-full font-mono text-[11px] border-2 border-ink bg-surface text-ink-soft pl-3 pr-8 py-2 focus:outline-none focus:bg-paper transition-colors duration-100 placeholder:text-ink-dim/40"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-0 top-0 bottom-0 px-2.5 flex items-center text-ink-dim hover:text-ink-soft transition-colors duration-100 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile — segmented filter picker, replaces the search bar inline */}
            {filtersOpen && (
              <div
                role="radiogroup"
                aria-label="Search filter"
                className="sm:hidden flex flex-1 border-2 border-ink bg-paper"
              >
                {FILTER_OPTIONS.map((opt, i) => (
                  <button
                    key={opt.value}
                    role="radio"
                    aria-checked={filter === opt.value}
                    onClick={() => {
                      setFilter(opt.value);
                      setFiltersOpen(false);
                    }}
                    className={`flex-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] py-2 transition-colors duration-100 cursor-pointer border-ink ${
                      i > 0 ? "border-l-2" : ""
                    } ${
                      filter === opt.value
                        ? "bg-ink text-paper"
                        : "bg-paper text-ink-soft active:bg-border"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile — toggle button (hamburger ⇄ close) */}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              aria-label={
                filtersOpen ? "Close filters" : "Toggle search filters"
              }
              aria-expanded={filtersOpen}
              className={`sm:hidden shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.08em] border-2 border-ink px-2.5 transition-colors duration-100 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                filtersOpen ? "bg-ink text-paper" : "bg-paper text-ink-soft"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {filtersOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
              {!filtersOpen && (filter !== "all" ? filter : "Filter")}
            </button>

            {/* Desktop — pills inline */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`font-mono text-[10px] font-bold uppercase tracking-[0.08em] border-2 border-ink px-2.5 py-2 transition-colors duration-100 cursor-pointer whitespace-nowrap ${
                    filter === opt.value
                      ? "bg-ink text-paper"
                      : "bg-paper text-ink-soft hover:bg-border"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Paper sections ────────────────────────────────────────────────── */}
          {totalResults > 0 ? (
            <div className="flex flex-col gap-12">
              {visibleFull.length > 0 && (
                <PaperSection type="full" papers={visibleFull} />
              )}
              {visibleShort.length > 0 && (
                <PaperSection type="short" papers={visibleShort} />
              )}
            </div>
          ) : (
            /* ── No results ─────────────────────────────────────────────────── */
            <div className="border-t-2 border-b-2 border-ink py-14 flex flex-col items-center gap-3 text-center">
              <h3 className="font-serif text-2xl font-bold text-ink-soft">
                No papers found
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                Try a different search term or filter
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                  setTypeView("all");
                }}
                className="mt-2 font-mono text-[10px] uppercase tracking-widest border-2 border-ink px-4 py-2 bg-paper text-ink-soft hover:bg-border transition-colors duration-150 cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}

          {/* ── Note strip ────────────────────────────────────────────────────── */}
          {/* <div className="border-l-2 border-ink px-4 py-2">
            <p className="font-mono text-[10px] text-ink-dim/70 leading-relaxed uppercase tracking-wider">
              {ACCEPTED_PAPERS_NOTE}
            </p>
          </div> */}
        </>
      ) : (
        /* ── Empty state ──────────────────────────────────────────────────────── */
        <div className="border-t-2 border-b-2 border-ink py-16 flex flex-col items-center gap-4 text-center">
          <h3 className="font-serif text-2xl font-bold text-ink-soft">
            To be announced soon
          </h3>
          <p className="font-sans text-sm text-ink-dim max-w-sm leading-relaxed">
            The list of accepted papers for ICAA 2027 will be published
            following the completion of the review process. Please check back
            for updates.
          </p>
          <Link href="/2027/papersubmission">
            <button className="group mt-2 flex items-center gap-2 px-5 py-3 border-2 border-ink bg-surface text-ink-soft font-bold text-xs uppercase tracking-widest -translate-x-0.5 -translate-y-0.5 shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
              <span>Paper Submission</span>
              <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
