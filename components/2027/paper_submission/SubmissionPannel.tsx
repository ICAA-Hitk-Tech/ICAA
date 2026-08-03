import { FaPaperPlane } from "react-icons/fa6";

type PortalState = "upcoming" | "live" | "closed";

type PanelConfigEntry = {
  dotColor: string;
  title: string;
  text: string;
};

type PanelConfig = Record<PortalState, PanelConfigEntry>;

interface SubmissionPannelProps {
  handleSubButtonClick: () => void;
  isLive?: boolean;
  isClosed?: boolean;
}

const PANEL_CONFIG: PanelConfig = {
  upcoming: {
    dotColor: "bg-gamboge animate-pulse border border-ink/20",
    title: "Opening Soon",
    text: "The submission portal is currently offline. Further information regarding the submission process and timeline will be announced in due course. Authors are advised to check this website periodically for updates.",
  },
  live: {
    dotColor: "bg-green-500 animate-pulse border border-ink/20",
    title: "Portal Active",
    text: "The paper submission portal is now online. Click the button below to submit your paper via Microsoft CMT.",
  },
  closed: {
    dotColor: "bg-red-500 border border-ink/20",
    title: "Portal Closed",
    text: "The paper submission portal is now closed and is no longer accepting submissions. Thank you to all authors who submitted.",
  },
};

const getPortalState = (isLive: boolean, isClosed: boolean): PortalState => {
  if (isClosed) return "closed";
  if (isLive) return "live";
  return "upcoming";
};

const SubmissionPannel = ({
  handleSubButtonClick,
  isLive = false,
  isClosed = false,
}: SubmissionPannelProps) => {
  const state = getPortalState(isLive, isClosed);
  const { dotColor, title, text } = PANEL_CONFIG[state];

  return (
    <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_0px_var(--color-ink)] flex flex-col overflow-hidden">
      {/* Retro Window Control Bar */}
      <div className="bg-surface border-b-2 border-ink px-4 py-2.5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
          <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
          <span className="w-2.5 h-2.5 rounded-full border border-ink bg-ink/15" />
        </div>
        <span className="text-ink-dim text-[10px] font-bold uppercase tracking-widest font-mono">
          portal_status.log
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 bg-paper/30 flex flex-col gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dotColor}`} />
            <h3 className="font-serif text-lg font-bold text-ink leading-tight">
              {title}
            </h3>
          </div>
          <p className="text-xs text-ink-dim leading-relaxed font-mono">
            {text}
          </p>
        </div>

        <button
          onClick={handleSubButtonClick}
          className="group w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-ink bg-abyss-500 text-paper font-bold uppercase tracking-wider text-xs -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-abyss-700 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer"
        >
          <span>Submit your Paper</span>
          <FaPaperPlane className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};

export default SubmissionPannel;
