'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ACTIVE_YEAR, PREVIOUS_YEARS, YEAR_LINKS } from "@/lib/config";
import { navItems } from "@/constants/2027/navItems";
import type { NavItem, NavChild } from "@/lib/types";

// ── Dropdown for desktop ────────────────────────────────────────────
function DesktopDropdown({ item }: { item: NavItem & { children: NavChild[] } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative py-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="relative text-sm font-bold uppercase tracking-widest text-ink flex items-center gap-1 group focus:outline-none cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-grove-600 after:transition-all after:duration-200 group-hover:after:w-full">
          {item.label}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 text-ink-dim ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full min-w-48 z-50 pt-2">
          <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_0px_var(--color-ink)]">
            {item.children.map((child, i) => (
              <Link
                key={i}
                href={child.href}
                className="block px-4 py-2 text-sm font-medium text-ink hover:bg-ink hover:text-paper transition-colors duration-150 border-b border-border last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Year selector for desktop ────────────────────────────────────────
function YearSelector() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative py-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 border-2 border-ink bg-ink text-paper px-3 py-1 text-sm font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors duration-150 focus:outline-none shadow-[2px_2px_0px_0px_var(--color-grove-600)] cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {ACTIVE_YEAR}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 min-w-28 z-50 pt-2">
          <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_0px_var(--color-ink)]">
            {PREVIOUS_YEARS.map((y) => (
              <a
                key={y}
                href={YEAR_LINKS[y] || `/${y}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between px-4 py-2 text-sm font-bold tracking-wider border-b border-border last:border-b-0 transition-colors duration-150
                  ${y === ACTIVE_YEAR
                    ? "bg-ink text-paper cursor-default pointer-events-none"
                    : "text-ink hover:bg-ink hover:text-paper"
                  }`}
                onClick={() => setOpen(false)}
              >
                {y}
                {y !== ACTIVE_YEAR && (
                  <svg className="w-3 h-3 ml-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
                {y === ACTIVE_YEAR && <span className="text-xs ml-2 opacity-60 font-mono">NOW</span>}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mobile accordion item ────────────────────────────────────────────
function MobileAccordion({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <li className="border-b border-border">
        <Link
          href={item.href!}
          className="flex items-center px-4 py-3 text-sm font-bold uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition-colors duration-150"
          onClick={onClose}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-border">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-widest text-ink hover:bg-surface transition-colors duration-150 focus:outline-none cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <svg
          className={`w-3.5 h-3.5 text-ink-dim transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="bg-surface border-t border-border">
          {item.children.map((child, i) => (
            <li key={i} className="border-b border-border last:border-b-0">
              <Link
                href={child.href}
                className="block pl-8 pr-4 py-2.5 text-sm font-medium text-ink-dim hover:text-ink hover:bg-border/30 transition-colors duration-150"
                onClick={onClose}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ── Main Navbar ──────────────────────────────────────────────────────
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileYearsOpen, setMobileYearsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 top-0 w-full z-20">
      {/* Main bar */}
      <div className={`w-full text-ink flex items-center justify-between transition-all duration-300 border-b-2 ${
        isScrolled
          ? "py-2 px-6 glassmorphic border-ink-dim shadow-sm"
          : "py-4 px-6 bg-transparent border-transparent"
      }`}>
        {/* Logos */}
        <div className="flex items-center gap-3 lg:gap-6 shrink-0">
          <Image
            src="/2027/heritage.png"
            alt="Heritage logo"
            width={60}
            height={60}
            className="w-10 h-10 lg:w-15 lg:h-15 rounded-full object-cover"
          />
          <Image
            src="/2027/icaa.png"
            alt="ICAA logo"
            width={120}
            height={60}
            className="w-20 h-10 lg:w-30 lg:h-15 rounded-full object-contain"
          />
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 z-20">
          {navItems.map((item, idx) =>
            item.children ? (
              <DesktopDropdown key={idx} item={item as NavItem & { children: NavChild[] }} />
            ) : (
              <Link
                key={idx}
                href={item.href!}
                className="relative text-sm font-bold uppercase tracking-widest text-ink group focus:outline-none"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-grove-600 after:transition-all after:duration-200 group-hover:after:w-full">
                  {item.label}
                </span>
              </Link>
            )
          )}

          {/* Year selector */}
          <div className="ml-2 border-l-2 border-ink-dim pl-4">
            <YearSelector />
          </div>
        </div>

        {/* Mobile: hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            className="flex items-center text-ink focus:outline-none cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full lg:hidden bg-paper border-b-2 border-ink z-20 shadow-[0_4px_0px_0px_var(--color-ink)]">
          <ul className="flex flex-col">
            {navItems.map((item, idx) => (
              <MobileAccordion key={idx} item={item} onClose={() => setIsMenuOpen(false)} />
            ))}

            {/* Mobile year selector */}
            <li className="border-b border-border">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-widest text-ink hover:bg-surface transition-colors duration-150 focus:outline-none cursor-pointer"
                onClick={() => setMobileYearsOpen((v) => !v)}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-ink-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Year
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-ink-dim transition-transform duration-200 ${mobileYearsOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileYearsOpen && (
                <ul className="bg-surface border-t border-border">
                  {PREVIOUS_YEARS.map((y) => (
                    <li key={y} className="border-b border-border last:border-b-0">
                      {y === ACTIVE_YEAR ? (
                        <span className="flex items-center justify-between pl-8 pr-4 py-2.5 text-sm font-bold text-ink bg-ink/10">
                          {y} <span className="text-xs font-mono text-ink-dim">NOW</span>
                        </span>
                      ) : (
                        <a
                          href={YEAR_LINKS[y] || `/${y}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between pl-8 pr-4 py-2.5 text-sm font-medium text-ink-dim hover:text-ink hover:bg-border/30 transition-colors duration-150"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {y}
                          <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
