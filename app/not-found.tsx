import Link from "next/link";
import { ACTIVE_YEAR } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6">
      <p className="font-mono text-ink-ghost text-sm uppercase tracking-widest">404</p>
      <h1 className="text-5xl font-serif font-bold text-ink text-center">Page not found.</h1>
      <p className="text-ink-dim text-center max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href={`/${ACTIVE_YEAR}`}
        className="border-2 border-ink bg-ink text-paper px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors duration-150 shadow-[3px_3px_0px_0px_var(--color-grove-600)]"
      >
        Back to ICAA {ACTIVE_YEAR}
      </Link>
    </div>
  );
}
