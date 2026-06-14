"use client";

interface NavigationTabsProps {
  pageIndex: number;
  onPageChange: (index: number) => void;
}

const TABS = [
  { idx: 0, label: "Cover", mobileColor: "bg-ink text-white border-ink", desktopColor: "bg-ink text-white" },
  { idx: 1, label: "'26", mobileColor: "bg-grove-600 text-white border-grove-600", desktopColor: "bg-grove-600 text-white" },
  { idx: 2, label: "'25", mobileColor: "bg-abyss-500 text-white border-abyss-500", desktopColor: "bg-abyss-500 text-white" },
  { idx: 3, label: "'14", mobileColor: "bg-gamboge text-ink border-gamboge", desktopColor: "bg-gamboge text-ink" },
];

export default function NavigationTabs({ pageIndex, onPageChange }: NavigationTabsProps) {
  return (
    <>
      {/* Mobile Navigation Tags (Grid on top of the book) */}
      <div className="grid md:hidden grid-cols-4 gap-2 w-full z-20">
        {TABS.map((tab) => (
          <button
            key={`mob-${tab.idx}`}
            onClick={() => onPageChange(tab.idx)}
            className={`py-2 text-[10px] sm:text-xs font-mono font-bold border-2 rounded-md transition-all duration-200 shadow-[2px_2px_0px_0px_var(--color-ink)] ${
              pageIndex === tab.idx
                ? `${tab.mobileColor} translate-y-0.5 shadow-[0px_0px_0px_0px_var(--color-ink)]`
                : "bg-surface border-ink text-ink-dim hover:bg-border hover:shadow-[1px_1px_0px_0px_var(--color-ink)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Index Tabs sticking out of the right side (Tablet/Desktop Only) */}
      <div className="hidden md:flex absolute right-0 top-12 flex-col gap-2.5 z-20 translate-x-13">
        {TABS.map((tab) => (
          <button
            key={`desk-${tab.idx}`}
            onClick={() => onPageChange(tab.idx)}
            className={`px-3.5 py-2 text-xs font-mono font-bold border-2 border-l-0 border-ink rounded-r-md transition-all duration-200 cursor-pointer shadow-[1px_1px_0px_0px_var(--color-ink)] ${
              pageIndex === tab.idx
                ? `${tab.desktopColor} translate-x-2.5 shadow-[0px_3px_0px_0px_var(--color-ink)]`
                : "bg-surface hover:bg-border text-ink-dim"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}
