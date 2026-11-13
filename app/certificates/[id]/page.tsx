import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaDownload, FaClock, FaAward, FaCircleCheck } from "react-icons/fa6";
import { db, type UserDoc } from "@/lib/db";
import { ID_RE, parsePid } from "@/lib/ids";
import { certificatesReleased } from "@/lib/flags";
import { CATEGORIES } from "@/constants/2027/categories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Certificates | ICAA 2027",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ID_RE.test(id)) notFound();

  const d = await db();
  const user = await d.collection<UserDoc>("users").findOne({ _id: id });
  if (!user) notFound();

  const released = await certificatesReleased();

  const certs = user.PIDs.map((pid, idx) => {
    const p = parsePid(pid);
    if (!p) return null;
    return {
      index: idx,
      pid,
      label: CATEGORIES[p.cat].certificate,
      role: CATEGORIES[p.cat].role,
      ready: released && Boolean(user.certs?.[pid]),
    };
  }).filter((c): c is NonNullable<typeof c> => c !== null);

  const roles = [...new Set(certs.map((c) => c.role))].join(" · ");
  const readyCount = certs.filter((c) => c.ready).length;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* ── Participant Identity Card ── */}
      <div className="border-2 border-ink bg-surface shadow-[6px_6px_0px_0px_var(--color-ink)] overflow-hidden">
        {/* Top accent stripe */}
        <div className="h-1.5 w-full bg-grove-600" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-grove-600 font-mono text-[11px] uppercase tracking-widest font-bold">
            <FaAward className="w-3.5 h-3.5 shrink-0" />
            <span>ICAA 2027 Certificates</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight wrap-break-word">
            {user.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs uppercase tracking-wider bg-paper border-2 border-ink px-3 py-1 font-bold text-ink shadow-[2px_2px_0px_0px_var(--color-ink)]">
              {roles || "Participant"}
            </span>
            {released && readyCount > 0 && (
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-sea-700 font-semibold">
                <FaCircleCheck className="w-3.5 h-3.5" />
                {readyCount} certificate{readyCount > 1 ? "s" : ""} ready to
                download
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Certificate Release Notice ── */}
      {!released && (
        <div className="flex items-start gap-4 border-2 border-gamboge bg-chrome-200/20 p-5 sm:p-6 shadow-[4px_4px_0px_0px_var(--color-gamboge)] text-ink">
          <FaClock className="w-5 h-5 mt-0.5 shrink-0 text-gamboge" />
          <div className="flex flex-col gap-1 font-sans">
            <p className="font-bold text-sm sm:text-base">
              Certificates Under Preparation
            </p>
            <p className="text-xs sm:text-sm text-ink-dim leading-relaxed">
              Official conference certificates will be released after the
              conclusion of the event. Keep your printed ID card safe — scanning
              this QR code will unlock your direct downloads here once
              available.
            </p>
          </div>
        </div>
      )}

      {/* ── Certificate List ── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink-dim font-bold">
            Issued Certificates
            <span className="ml-2 px-1.5 py-0.5 bg-surface border border-ink/30 text-ink font-normal">
              {certs.length}
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {certs.map((c) => (
            <div
              key={c.index}
              className={`border-2 border-ink bg-surface shadow-[4px_4px_0px_0px_var(--color-ink)] flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-transform hover:translate-x-px hover:translate-y-px overflow-hidden`}
            >
              {/* Left colour accent */}
              <div className="flex flex-1 items-stretch">
                <div
                  className={`w-1 shrink-0 ${c.ready ? "bg-sea-500" : "bg-ink/20"}`}
                />
                <div className="p-5 sm:p-6 space-y-1.5 flex-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                    {c.label}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-paper border border-ink font-semibold text-ink">
                      {c.role}
                    </span>
                    <span className="font-mono text-[11px] text-ink-dim">
                      · ICAA 2027 Official Record
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 sm:py-6 sm:pr-6 sm:pl-0 shrink-0">
                {c.ready ? (
                  <a
                    href={`/api/certificates/${id}/${c.index}/download`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-ink bg-grove-600 text-paper font-mono font-bold text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-grove-800 active:translate-x-px active:translate-y-px active:shadow-none transition-all shrink-0 cursor-pointer"
                  >
                    <FaDownload className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                ) : (
                  <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-dashed border-ink/30 bg-paper font-mono text-xs text-ink-dim tracking-wider uppercase shrink-0">
                    <FaClock className="w-3 h-3" />
                    <span>Available after event</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer note ── */}
      <p className="font-mono text-[11px] text-ink/40 text-center leading-relaxed">
        This page is private to you. Do not share this URL with others.
        <br />
        ICAA 2027 · Heritage Institute of Technology
      </p>
    </div>
  );
}
