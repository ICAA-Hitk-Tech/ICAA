// Domain & Database Models for ICAA 2027 QR & Meal Management System

export interface UserDoc {
  _id: string; // random 32-hex string = secret token inside the QR
  name: string;
  PIDs: string[]; // array of PIDs; first is primary
  foodSlots: string[]; // meal slots eligible to claim
  certs: Record<string, string>; // PID -> Google Drive file ID
  createdAt: Date;
}

export interface ClaimDoc {
  userId: string;
  slot: string;
  claimedAt: Date;
  claimedBy: string;
}

export interface VolunteerDoc {
  _id: string;
  name: string; // stored lowercase
  passwordHash?: string;
  pinHash?: string; // fallback/backwards-compatible
  role: "volunteer" | "admin";
  active: boolean;
  createdAt?: Date;
}

export interface SettingsDoc {
  _id: string; // "flags"
  certificatesReleased?: boolean;
  updatedAt?: Date;
}

export interface ScanLogDoc {
  _id?: unknown;
  at: Date;
  volunteer: string;
  slot: string;
  status: string;
  userId?: string;
  rawIdPrefix?: string;
}

export interface LoginAttemptDoc {
  key: string;
  windowStart: Date;
  count: number;
}

export type ScanStatus =
  | "OK"
  | "ALREADY_CLAIMED"
  | "NOT_ELIGIBLE"
  | "WRONG_TIME"
  | "INVALID"
  | "BAD_SLOT"
  | "NETWORK";

export interface ScanResult {
  status: ScanStatus;
  name?: string;
  at?: string;
  by?: string;
  slot?: string;
}

export interface SlotStats {
  slot: string;
  eligible: number;
  claimed: number;
  remaining: number;
}

export interface SearchUserResult {
  id: string;
  name: string;
  primaryPid: string;
  roles: string;
  foodSlots: string[];
  claimedSlots: string[];
}

export interface RosterEntry {
  userId: string;
  name: string;
  served: boolean;
  claimedAt?: string;
  claimedBy?: string;
}

export interface AdminStatsData {
  totalUsers: number;
  categoryCounts: Record<string, number>;
  slotCounts: Record<string, number>;
  eligiblePerSlot: Record<string, number>;
  certificatesReleased: boolean;
  recentLogs: Array<{
    _id: string;
    action: string;
    slot: string;
    volunteer: string;
    success: boolean;
    reason?: string;
    pid?: string;
    name?: string;
    ts: string;
  }>;
  volunteers: Array<{
    _id: string;
    name: string;
    role: string;
    createdAt?: string;
  }>;
  /** Per-slot roster: who is eligible, served, and remaining */
  roster: Record<string, RosterEntry[]>;
}
