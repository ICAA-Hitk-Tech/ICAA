import { MongoClient, type Db } from "mongodb";
import type {
  UserDoc,
  ClaimDoc,
  VolunteerDoc,
  SettingsDoc,
  ScanLogDoc,
  LoginAttemptDoc,
} from "./storage/types";

// Re-export for any modules importing directly from lib/db
export type {
  UserDoc,
  ClaimDoc,
  VolunteerDoc,
  SettingsDoc,
  ScanLogDoc,
  LoginAttemptDoc,
};

export async function mongoClient(): Promise<MongoClient> {
  const g = globalThis as unknown as { _icaaMongo?: Promise<MongoClient> };
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in environment");
  }
  g._icaaMongo ??= new MongoClient(uri).connect();
  return g._icaaMongo;
}

export async function db(): Promise<Db> {
  const client = await mongoClient();
  const dbName = process.env.MONGODB_DB || "icaa";
  return client.db(dbName);
}

export const getDb = db;

export async function ensureIndexes(database: Db): Promise<void> {
  await database
    .collection<UserDoc>("users")
    .createIndex({ PIDs: 1 }, { unique: true });
  await database
    .collection<ClaimDoc>("meal_claims")
    .createIndex({ userId: 1, slot: 1 }, { unique: true });
  await database
    .collection<VolunteerDoc>("volunteers")
    .createIndex({ name: 1 }, { unique: true });
  await database.collection<ScanLogDoc>("scan_log").createIndex({ at: -1 });
  await database
    .collection<LoginAttemptDoc>("login_attempts")
    .createIndex({ windowStart: 1 }, { expireAfterSeconds: 3600 });
}
