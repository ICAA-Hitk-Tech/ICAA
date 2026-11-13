import { db, type SettingsDoc } from "./db";

export async function certificatesReleased(): Promise<boolean> {
  const s = await (await db())
    .collection<SettingsDoc>("settings")
    .findOne({ _id: "flags" });
  return Boolean(s?.certificatesReleased);
}
